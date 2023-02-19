import { Route } from '@tanstack/react-location';
import { useEffect, useState } from 'react';
import coreRoutes from './definitions/core';

const useRoutes = () => {
	const [routes, setRoutes] = useState<Route[]>();

	useEffect(() => {
		if (routes) return;
		(async () => {
			const routerList: Route[] = [];
			routerList.push(...coreRoutes);
			setRoutes(routerList);
		})();
	}, [routes]);

	return routes;
};

export default useRoutes;
