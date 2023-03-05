import { useNavigate } from '@tanstack/react-location';
import { useEffect } from 'react';
import GenericFallback from '../../providers/generic-fallback.provider';
import { useAuth } from '../../providers/auth-provider';

interface Props {
	children: JSX.Element;
}

function AuthOnly({ children }: Props) {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated()) navigate({ to: '/auth/login' });
	}, [isAuthenticated, navigate]);

	if (!isAuthenticated()) {
		return <GenericFallback title='' icon={<span />} />;
	}

	return children;
}

export default AuthOnly;
