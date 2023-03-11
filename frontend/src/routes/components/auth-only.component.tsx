import { useNavigate } from '@tanstack/react-location';
import { memo, useEffect } from 'react';
import GenericFallback from '../../providers/generic-fallback.provider';

interface Props {
	children: JSX.Element;
}

const { VITE_LS_SESSION_KEY } = import.meta.env;

function AuthOnly({ children }: Props) {
	const user = localStorage.getItem(`${VITE_LS_SESSION_KEY}-jwt`);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) navigate({ to: '/auth/login' });
	}, [user, navigate]);

	if (!user) {
		return <GenericFallback title='' icon={<span />} />;
	}

	return children;
}

export default memo(AuthOnly);
