import { useNavigate } from '@tanstack/react-location';
import { memo, useEffect } from 'react';
import GenericFallback from '../../providers/generic-fallback.provider';
import { useAuth } from '../../providers/auth-provider';

interface Props {
	children: JSX.Element;
}

function AuthOnly({ children }: Props) {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const handleChildrenRender = async () => {
			const isLoggedIn = await isAuthenticated;
			if (!isLoggedIn) navigate({ to: '/auth/login' });
		};

		handleChildrenRender();
	}, [isAuthenticated, navigate]);

	if (!isAuthenticated) {
		return <GenericFallback title='' icon={<span />} />;
	}

	return children;
}

export default memo(AuthOnly);
