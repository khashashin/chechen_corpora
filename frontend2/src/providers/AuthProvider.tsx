import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Tracker from '@openreplay/tracker';
import * as Sentry from '@sentry/react';
import { Account, Client, ID, Models } from 'appwrite';
import logger from 'src/utils/logger';

const log = logger('AuthProvider');

const {
  VITE_AUTH_ENDPOINT,
  VITE_AUTH_PROJECT_ID,
  VITE_OPEN_R_KEY,
  VITE_OPEN_R_ENDPOINT,
  VITE_OPEN_R_SECURE_MODE,
  VITE_OPEN_R_DONT_TRACK,
  VITE_PROJECT_DOMAIN,
} = import.meta.env;

const client = new Client();
client.setEndpoint(VITE_AUTH_ENDPOINT).setProject(VITE_AUTH_PROJECT_ID);
const account = new Account(client);

const tracker = new Tracker({
  projectKey: VITE_OPEN_R_KEY,
  ingestPoint: VITE_OPEN_R_ENDPOINT,
  capturePerformance: true,
  __DISABLE_SECURE_MODE: Boolean(VITE_OPEN_R_SECURE_MODE),
  respectDoNotTrack: Boolean(VITE_OPEN_R_DONT_TRACK),
  defaultInputMode: 1,
});

type User = Models.User<Models.Preferences>;
type AuthContextTypes = {
  authIsLoading: boolean;
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
  ) => Promise<void>;
  updateVerification: (userId: unknown, secret: unknown) => Promise<void>;
};

export const AuthContext = createContext<AuthContextTypes | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Models.Session | null>(null);
  const [jwt, setJWT] = useState<Models.Jwt | null>(null);

  const isAuthenticated = useMemo(() => {
    return !!user?.status && !!user?.emailVerification && !!user?.email;
  }, [user]);

  // Logs the user in with the provided email and password,
  // and optionally remembers the session in local storage.
  const login = useCallback(
    async (email: string, password: string, remember: boolean) => {
      log.debug('remember', remember);
      // Attempt to create an email session with the provided credentials
      account
        .createEmailPasswordSession(email, password)
        .then(async (emailSession) => {
          // If successful, set the session state in the component
          setSession(emailSession);

          const currentUser = await account.get();
          const currentJWT = await account.createJWT();

          setUser(currentUser);
          setJWT(currentJWT);

          // If the user wants to remember the session, store the session ID in local storage
          if (remember) {
            localStorage.setItem('rememberSession', emailSession.$id);
          }
        })
        // If there was an error during login, reject the Promise with an Error
        .catch((err) =>
          Promise.reject(new Error(`Unable to login user. [ERROR]: ${err}`)),
        );
    },
    [],
  );

  // Registers a new user with the given email, password, and optional name.
  const register = useCallback(
    async (email: string, password: string, name = '') => {
      try {
        const newUser = await account.create(
          ID.unique(),
          email,
          password,
          name,
        );
        await account.createEmailPasswordSession(email, password);
        await account.createVerification(
          `${VITE_PROJECT_DOMAIN}/auth/account-confirm`,
        );

        setUser(newUser);
      } catch (err) {
        log.error('Unable to register user. [ERROR]: ', err);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      const currentSession = await account.getSession('current');
      if (currentSession) await account.deleteSession(currentSession.$id);
      setSession(null);
      setUser(null);
      setJWT(null);
    } catch (err) {
      log.error('Unable to logout user. [ERROR]: ', err);
    }
  }, []);

  const createRecovery = useCallback(async (email: string) => {
    account
      .createRecovery(email, `${VITE_PROJECT_DOMAIN}/auth/recovery`)
      .catch((err) => {
        Promise.reject(new Error(`Unable to create recovery. [ERROR]: ${err}`));
      });
  }, []);

  const updateRecovery = useCallback(
    async (userId: unknown, secret: unknown, password: string) => {
      const idString = userId as string;
      const secretString = secret as string;
      account.updateRecovery(idString, secretString, password).catch((err) => {
        Promise.reject(new Error(`Unable to update recovery. [ERROR]: ${err}`));
      });
    },
    [],
  );

  const updateVerification = useCallback(
    async (userId: unknown, secret: unknown) => {
      const idString = userId as string;
      const secretString = secret as string;
      account.updateVerification(idString, secretString).catch((err) => {
        Promise.reject(
          new Error(`Unable to update verification. [ERROR]: ${err}`),
        );
      });
    },
    [],
  );

  useEffect(() => {
    (async () => {
      try {
        const currentSession = await account
          .getSession('current')
          .then(async (newSession) => {
            const currentJWT = await account.createJWT();
            const currentAccount = await account.get();
            setJWT(currentJWT);
            setUser(currentAccount);

            return newSession;
          });

        // if no remember key in local storage, logout and return
        if (currentSession && !localStorage.getItem('rememberSession')) {
          await account.deleteSession(currentSession.$id);
          return;
        }

        setSession(currentSession);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        log.error('Unable to fetch User.', err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        tracker.start();

        if (user) {
          tracker.setUserID(user?.email);
          Sentry.setUser({ email: user?.email });
        }
      } catch (err) {
        log.error('Unable to start tracker. [ERROR]: ', err);
      }
    })();
  }, [user]);

  const api = useMemo(() => {
    return {
      user,
      authIsLoading: isLoading,
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
    isLoading,
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
