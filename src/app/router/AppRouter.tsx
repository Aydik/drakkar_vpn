import { useRoutes } from 'react-router-dom';
import type { FC } from 'react';
import type { RouteObject } from 'react-router-dom';
import { MainLayout } from 'app/layouts/MainLayout';
import { IndexPage } from 'pages/IndexPage';
import { CatalogPage } from 'pages/CatalogPage';
import { AuthLayout } from 'app/layouts/AuthLayout';
import { RegisterPage } from 'pages/RegisterPage';
import { LoginPage } from 'pages/LoginPage';

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
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/register',
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
];

export const AppRouter: FC = () => useRoutes(routeConfig);
