import { TbRoute } from 'react-icons/tb';
import { Outlet, ReactLocation, Router } from '@tanstack/react-location';
import GenericFallback from '../providers/generic-fallback.provider';
import useRoutes from './hook';
import AuthProvider from '../providers/auth-provider';

type Props = {
	location: ReactLocation;
};

export default function AppRoutes(props: Props) {
	const { location } = props;
	const routes = useRoutes();

	if (!routes) return <GenericFallback title='Routes' icon={<TbRoute />} />;

	return (
		<AuthProvider>
			<Router location={location} routes={routes}>
				<Outlet />
			</Router>
		</AuthProvider>
	);
}
