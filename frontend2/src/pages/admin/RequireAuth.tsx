import { IconUser } from '@tabler/icons-react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import LoadingScreen from 'src/components/LoadingScreen';
import useAuth from 'src/hooks/useAuth';

export default function RequireAuth() {
  const { user, authIsLoading } = useAuth();
  const location = useLocation();
  // eslint-disable-next-line no-nested-ternary
  return authIsLoading ? (
    <LoadingScreen title="Авторизация" icon={<IconUser />} />
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
}
