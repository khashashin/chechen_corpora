import { useNavigate } from '@tanstack/react-location';
import { useEffect } from 'react';
import GenericFallback from '../../providers/generic-fallback.provider';

interface Props {
	children: JSX.Element;
}

function AuthOnly({ children }: Props) {
	const authenticated = true;
	const navigate = useNavigate();

	useEffect(() => {
		if (!authenticated) navigate({ to: '/auth/login' });
	}, [authenticated, navigate]);

	if (!authenticated) {
		return <GenericFallback title='' icon={<span />} />;
	}

	return children;
}

export default AuthOnly;
