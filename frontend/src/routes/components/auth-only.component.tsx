import { useNavigate } from '@tanstack/react-location';
import { memo, useEffect } from 'react';
import GenericFallback from '../../providers/generic-fallback.provider';
import { useAuth } from '../../providers/auth-provider';

interface Props {
	children: JSX.Element;
}

function AuthOnly({ children }: Props) {
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user?.status !== false || user.email !== undefined || user.emailVerification !== false)
			return;
		navigate({ to: '/auth/login' });
	}, [navigate, user]);

	if (!user) {
		setTimeout(() => {
			navigate({ to: '/auth/login' });
		}, 5000);
		return <GenericFallback title='' icon={<span />} />;
	}

	return children;
}

export default memo(AuthOnly);
