import type { FC } from 'react';
import { Auth } from 'features/Auth';

export const LoginPage: FC = () => {
  return <Auth authType={'login'} />;
};
