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
import { Account, Client, ID } from 'appwrite';
import { Models } from 'appwrite/src/models';
import { useEnv } from './env-provider';

const client = new Client();
client
	.setEndpoint(import.meta.env.VITE_AUTH_ENDPOINT)
	.setProject(import.meta.env.VITE_AUTH_PROJECT_ID);
const account = new Account(client);

const tracker = new Tracker({
	projectKey: import.meta.env.VITE_OPEN_R_KEY,
	ingestPoint: import.meta.env.VITE_OPEN_R_ENDPOINT,
	capturePerformance: true,
	__DISABLE_SECURE_MODE: import.meta.env.VITE_OPEN_R_SECURE_MODE === 'false',
});

type User = Models.Account<Models.Preferences>;
type AuthContextTypes = {
	user: User | null;
	session: Models.Session | null;
	jwt: Models.Jwt | null;
	isAuthenticated: () => boolean;
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
};

const AuthContext = createContext<AuthContextTypes | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Models.Session | null>(null);
	const [jwt, setJWT] = useState<Models.Jwt | null>(null);
	const { VITE_PROJECT_DOMAIN, LS_SESSION_KEY } = useEnv();

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

	const isAuthenticated = useCallback(() => {
		if (!user) return false;

		const { email, status, emailVerification } = user;
		return !(!email || !status || !emailVerification);
	}, [user]);

	const isSessionValid = useCallback(() => {
		const localSession = localStorage.getItem(LS_SESSION_KEY);
		if (!localSession) return false;

		const { expire } = JSON.parse(localSession);
		return new Date(expire).getTime() > Date.now();
	}, [LS_SESSION_KEY]);

	const login = useCallback(
		async (email: string, password: string, remember: boolean) => {
			const emailSession = await account.createEmailSession(email, password);
			setSession(emailSession);

			const currentUser = await account.get();
			setUser(currentUser);

			const currentJWT = await account.createJWT();
			setJWT(currentJWT);

			if (remember) {
				localStorage.setItem(LS_SESSION_KEY, JSON.stringify(emailSession));
			}
		},
		[LS_SESSION_KEY]
	);

	const register = useCallback(async (email: string, password: string, name = '') => {
		const currentUser = await account.create(ID.unique(), email, password, name);
		setUser(currentUser);
	}, []);

	const logout = useCallback(async () => {
		fetchSession().then(async (currentSession: Models.Session | null) => {
			if (currentSession) await account.deleteSession(currentSession.$id);
			setSession(null);
			setUser(null);
			setJWT(null);
			localStorage.removeItem(LS_SESSION_KEY);
		});
	}, [LS_SESSION_KEY, fetchSession]);

	const createRecovery = useCallback(
		async (email: string) => {
			await account.createRecovery(email, `${VITE_PROJECT_DOMAIN}/auth/recovery`);
		},
		[VITE_PROJECT_DOMAIN]
	);

	const updateRecovery = useCallback(
		async (userId: unknown, secret: unknown, password: string, passwordRepeat: string) => {
			const idString = userId as string;
			const secretString = secret as string;
			await account.updateRecovery(idString, secretString, password, passwordRepeat);
		},
		[]
	);

	useEffect(() => {
		if (!isSessionValid()) {
			logout().catch((err) => console.log(err));
			return;
		}

		fetchUser().then((currentUser) => {
			setUser(currentUser);
		});
		fetchSession().then(async (currentSession) => {
			setSession(currentSession);
		});
		fetchJWT().then((currentJWT) => {
			setJWT(currentJWT);
		});
	}, [fetchUser, fetchSession, fetchJWT, LS_SESSION_KEY, isSessionValid, logout]);

	useEffect(() => {
		tracker.start().catch((err) => console.log(err));
		if (isAuthenticated() && isSessionValid() && user) {
			tracker.setUserID(user?.email);
		}
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
