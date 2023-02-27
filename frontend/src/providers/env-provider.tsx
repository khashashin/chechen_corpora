import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

type Env = {
	API_ENDPOINT: string;
	AUTH_ENDPOINT: string;
	AUTH_PROJECT_ID: string;
	VITE_PROJECT_DOMAIN: string;
};

async function getEnv(): Promise<Env> {
	return {
		API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT,
		AUTH_ENDPOINT: import.meta.env.VITE_AUTH_ENDPOINT,
		AUTH_PROJECT_ID: import.meta.env.VITE_AUTH_PROJECT_ID,
		VITE_PROJECT_DOMAIN: import.meta.env.VITE_PROJECT_DOMAIN,
	};
}

const EnvContext = createContext<Env | null>(null);

export default function EnvProvider({ children }: { children: ReactNode }) {
	const [env, setEnv] = useState<Env | null>(null);

	useEffect(() => {
		const fetchEnv = async () => {
			const newEnv = await getEnv();
			setEnv(newEnv);
		};
		fetchEnv().catch((err) => {
			throw new Error(err);
		});
	}, []);

	const api = useMemo(() => {
		return env;
	}, [env]);

	return <EnvContext.Provider value={api}>{children}</EnvContext.Provider>;
}

export const useEnv = () => {
	const env = useContext(EnvContext);
	if (!env) {
		throw new Error('useEnv must be used within a EnvProvider');
	}
	return env;
};
