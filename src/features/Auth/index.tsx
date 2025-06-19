import { type FC } from 'react';
import { LoginForm } from 'features/Auth/components/LoginForm';
import { RegisterForm } from 'features/Auth/components/RegisterForm';

interface Props {
  authType: 'login' | 'register';
}

export const Auth: FC<Props> = ({ authType }) => {
  return authType === 'login' ? <LoginForm /> : <RegisterForm />;
};
