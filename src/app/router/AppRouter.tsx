import { useRoutes } from 'react-router-dom';
import type { FC } from 'react';
import type { RouteObject } from 'react-router-dom';

const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <IndexPage />,
  },
];

export const AppRouter: FC = () => useRoutes(routeConfig);
