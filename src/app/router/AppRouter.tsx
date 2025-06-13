import { useRoutes } from 'react-router-dom';
import type { FC } from 'react';
import type { RouteObject } from 'react-router-dom';
import { MainLayout } from 'app/layouts/MainLayout';
import { IndexPage } from 'pages/IndexPage';
import { CatalogPage } from 'pages/CatalogPage';

const routeConfig: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <IndexPage />,
      },
      {
        path: '/catalog',
        element: <CatalogPage />,
      },
    ],
  },
];

export const AppRouter: FC = () => useRoutes(routeConfig);
