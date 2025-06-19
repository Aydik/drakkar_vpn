import type { FC } from 'react';
import { Auth } from 'features/Auth';

export const RegisterPage: FC = () => {
  return <Auth authType={'register'} />;
};
