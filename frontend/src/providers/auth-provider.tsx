import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import Tracker from '@openreplay/tracker';
import * as Sentry from '@sentry/react';
import { Account, Client, ID } from 'appwrite';
import { Models } from 'appwrite/src/models';

const {
	VITE_AUTH_ENDPOINT,
	VITE_AUTH_PROJECT_ID,
	VITE_OPEN_R_KEY,
	VITE_OPEN_R_ENDPOINT,
	VITE_OPEN_R_SECURE_MODE,
	VITE_PROJECT_DOMAIN,
	VITE_LS_SESSION_KEY,
} = import.meta.env;

const client = new Client();
client.setEndpoint(VITE_AUTH_ENDPOINT).setProject(VITE_AUTH_PROJECT_ID);
const account = new Account(client);

const tracker = new Tracker({
	projectKey: VITE_OPEN_R_KEY,
	ingestPoint: VITE_OPEN_R_ENDPOINT,
	capturePerformance: true,
	__DISABLE_SECURE_MODE: VITE_OPEN_R_SECURE_MODE === 'false',
	network: {
		failuresOnly: true,
		sessionTokenHeader: false,
		ignoreHeaders: ['Authorization'],
		capturePayload: false,
	},
});

type User = Models.Account<Models.Preferences>;
type AuthContextTypes = {
	user: User | null;
	session: Models.Session | null;
	jwt: Models.Jwt | null;
	isAuthenticated: boolean;
	login: (email: string, password: string, remember: boolean) => Promise<void>;
	register: (email: string, password: string, name?: string) => Promise<void>;
	logout: () => Promise<void>;
	createRecovery: (email: string) => Promise<void>;
	updateRecovery: (
		userId: unknown,
		secret: unknown,
		password: string,
		passwordRepeat: string
	) => Promise<void>;
	updateVerification: (userId: unknown, secret: unknown) => Promise<void>;
};

const AuthContext = createContext<AuthContextTypes | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Models.Session | null>(null);
	const [jwt, setJWT] = useState<Models.Jwt | null>(null);

	const fetchUser = useCallback(async () => {
		try {
			return await account.get();
		} catch (err) {
			console.error('Unable to fetch user.', err);
			return null;
		}
	}, []);

	const fetchSession = useCallback(async () => {
		try {
			return await account.getSession('current');
		} catch (err) {
			console.error('Unable to fetch session.', err);
			return null;
		}
	}, []);

	const fetchJWT = useCallback(async () => {
		try {
			return await account.createJWT();
		} catch (err) {
			console.error('Unable to fetch JWT.', err);
			return null;
		}
	}, []);

	const isAuthenticated = useMemo(() => {
		const status = {
			isLoggedIn: true,
		};

		if (!user?.status) {
			status.isLoggedIn = false;
		}

		if (!user?.emailVerification) {
			status.isLoggedIn = false;
		}

		if (!user?.email) {
			status.isLoggedIn = false;
		}

		return status.isLoggedIn;
	}, [user]);

	// Checks if there is a valid session in local storage.
	const isSessionValid = useMemo(() => {
		// Check if a session exists in local storage
		const localSession = localStorage.getItem(VITE_LS_SESSION_KEY);
		if (!localSession) return false;

		// Get the expiration date from the session
		const { expire } = JSON.parse(localSession);

		// Check if the expiration date is after the current date/time
		return new Date(expire).getTime() > Date.now();
	}, []);

	// Logs the user in with the provided email and password,
	// and optionally remembers the session in local storage.
	const login = useCallback(async (email: string, password: string, remember: boolean) => {
		// Attempt to create an email session with the provided credentials
		account
			.createEmailSession(email, password)
			.then(async (emailSession) => {
				// If successful, set the session state in the component
				setSession(emailSession);

				// Get the current user and JWT token in parallel, and update the component state
				const [currentUser, currentJWT] = await Promise.all([
					account.get(),
					account.createJWT(),
				]).catch((err) => Promise.reject(new Error('Unable to login user. [ERROR]: ', err)));

				setUser(currentUser);
				setJWT(currentJWT);

				// If the user requested to remember the session, store the session details in local storage
				if (remember) {
					localStorage.setItem(
						`${VITE_LS_SESSION_KEY}`,
						JSON.stringify({ expire: emailSession.expire })
					);
					localStorage.setItem(`${VITE_LS_SESSION_KEY}-jwt`, currentJWT.jwt);
					localStorage.setItem(`${VITE_LS_SESSION_KEY}-user-id`, currentUser.$id);
				}
			})
			// If there was an error during login, reject the Promise with an Error
			.catch((err) => Promise.reject(new Error('Unable to login user. [ERROR]: ', err)));
	}, []);

	// Registers a new user with the given email, password, and optional name.
	const register = useCallback(async (email: string, password: string, name = '') => {
		account
			.create(ID.unique(), email, password, name)
			.then(async (currentUser) => {
				// Create an email session and send verification email in parallel
				await Promise.all([
					account.createEmailSession(email, password),
					account.createVerification(`${VITE_PROJECT_DOMAIN}/auth/verify`),
				]).catch((err) => Promise.reject(new Error('Unable to register user. [ERROR]: ', err)));

				// Set the current user as the registered user
				setUser(currentUser);
			})
			.catch((err) => Promise.reject(new Error('Unable to register user. [ERROR]: ', err)));
	}, []);

	const logout = useCallback(async () => {
		fetchSession()
			.then(async (currentSession: Models.Session | null) => {
				if (currentSession) await account.deleteSession(currentSession.$id);
				setSession(null);
				setUser(null);
				setJWT(null);
				localStorage.removeItem(VITE_LS_SESSION_KEY);
				localStorage.removeItem(`${VITE_LS_SESSION_KEY}-user-id`);
				localStorage.removeItem(`${VITE_LS_SESSION_KEY}-jwt`);
			})
			.catch((err) => Promise.reject(new Error('Unable to logout user. [ERROR]: ', err)));
	}, [fetchSession]);

	const createRecovery = useCallback(async (email: string) => {
		account.createRecovery(email, `${VITE_PROJECT_DOMAIN}/auth/recovery`).catch((err) => {
			Promise.reject(new Error('Unable to create recovery. [ERROR]: ', err));
		});
	}, []);

	const updateRecovery = useCallback(
		async (userId: unknown, secret: unknown, password: string, passwordRepeat: string) => {
			const idString = userId as string;
			const secretString = secret as string;
			account.updateRecovery(idString, secretString, password, passwordRepeat).catch((err) => {
				Promise.reject(new Error('Unable to update recovery. [ERROR]: ', err));
			});
		},
		[]
	);

	const updateVerification = useCallback(async (userId: unknown, secret: unknown) => {
		const idString = userId as string;
		const secretString = secret as string;
		account.updateVerification(idString, secretString).catch((err) => {
			Promise.reject(new Error('Unable to update verification. [ERROR]: ', err));
		});
	}, []);

	useEffect(() => {
		fetchUser().then((currentUser) => {
			setUser(currentUser);
		});
		fetchSession().then(async (currentSession) => {
			setSession(currentSession);
		});
		fetchJWT().then((currentJWT) => {
			setJWT(currentJWT);
		});
	}, [fetchUser, fetchSession, fetchJWT]);

	useEffect(() => {
		if (!isSessionValid) {
			logout();
		}
	}, [isSessionValid, logout]);

	useEffect(() => {
		tracker.start();
		const configureTracker = async () => {
			const isLoggedIn = await isAuthenticated;
			if (isLoggedIn && isSessionValid && user) {
				tracker.setUserID(user?.email);
				Sentry.setUser({ email: user?.email });
			} else {
				Sentry.setUser(null);
			}
		};

		configureTracker();
	}, [user, isAuthenticated, isSessionValid]);

	const api = useMemo(() => {
		return {
			user,
			isAuthenticated,
			login,
			register,
			logout,
			session,
			jwt,
			createRecovery,
			updateRecovery,
			updateVerification,
		};
	}, [
		user,
		isAuthenticated,
		login,
		register,
		logout,
		session,
		jwt,
		createRecovery,
		updateRecovery,
		updateVerification,
	]);

	return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
	const auth = useContext(AuthContext);
	if (!auth) {
		throw new Error('useAuth must be used within a AuthProvider');
	}
	return auth;
};
