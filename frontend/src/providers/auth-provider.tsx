import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { Account, Client, ID } from 'appwrite';
import { Models } from 'appwrite/src/models';
import { useEnv } from './env-provider';

const client = new Client();
const account = new Account(client);

type User = Models.Account<Models.Preferences>;

const AuthContext = createContext<{
	user: User | null;
	session: Models.Session | null;
	jwt: Models.Jwt | null;
	isAuthenticated: () => boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string, name?: string) => Promise<void>;
	logout: () => Promise<void>;
	createRecovery: (email: string) => Promise<void>;
	updateRecovery: (
		userId: unknown,
		secret: unknown,
		password: string,
		passwordRepeat: string
	) => Promise<void>;
} | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Models.Session | null>(null);
	const [jwt, setJWT] = useState<Models.Jwt | null>(null);
	const { AUTH_ENDPOINT, AUTH_PROJECT_ID, VITE_PROJECT_DOMAIN } = useEnv();

	const fetchUser = useCallback(async () => {
		try {
			return await account.get();
		} catch (err) {
			return null;
		}
	}, []);

	const fetchSession = useCallback(async () => {
		try {
			return await account.getSession('current');
		} catch (err) {
			return null;
		}
	}, []);

	const fetchJWT = useCallback(async () => {
		try {
			return await account.createJWT();
		} catch (err) {
			return null;
		}
	}, []);

	const isAuthenticated = useCallback(() => {
		if (!user) return false;

		const { email, status, emailVerification } = user;
		return !(!email || !status || !emailVerification);
	}, [user]);

	const login = useCallback(async (email: string, password: string) => {
		const emailSession = await account.createEmailSession(email, password);
		setSession(emailSession);

		const currentUser = await account.get();
		setUser(currentUser);

		const currentJWT = await account.createJWT();
		setJWT(currentJWT);
	}, []);

	const register = useCallback(async (email: string, password: string, name = '') => {
		const currentUser = await account.create(ID.unique(), email, password, name);
		setUser(currentUser);
	}, []);

	const logout = useCallback(async () => {
		if (!session) return;
		await account.deleteSession(session.$id);
		setSession(null);
		setUser(null);
		if (localStorage.getItem('remember')) {
			localStorage.removeItem('remember');
		}
	}, [session]);

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
		client.setEndpoint(AUTH_ENDPOINT).setProject(AUTH_PROJECT_ID);

		fetchUser().then((currentUser) => {
			setUser(currentUser);
		});
		fetchSession().then(async (currentSession) => {
			setSession(currentSession);
		});
		fetchJWT().then((currentJWT) => {
			setJWT(currentJWT);
		});
	}, [AUTH_ENDPOINT, AUTH_PROJECT_ID, fetchUser, fetchSession, fetchJWT]);

	useEffect(() => {
		if (!localStorage.getItem('remember')) {
			account.getSession('current').then(async (currentSession) => {
				if (currentSession) {
					await account.deleteSession(currentSession.$id);
					setSession(null);
					setUser(null);
				}
			});
		}
	}, []);

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
