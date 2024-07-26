import { TbUser } from 'react-icons/tb';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import LoadingScreen from 'src/components/LoadingScreen';
import { useAuth } from 'src/providers/AuthProvider';

export default function RequireAuth() {
	const { user, authIsLoading } = useAuth();
	const location = useLocation();
	// eslint-disable-next-line no-nested-ternary
	return authIsLoading ? (
		<LoadingScreen title='Authenticating' icon={<TbUser />} />
	) : user ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
}
