import { type FC, useEffect } from 'react';
import { LoginForm } from 'features/Auth/components/LoginForm';
import { RegisterForm } from 'features/Auth/components/RegisterForm';
import { useSelector } from 'react-redux';
import type { RootState } from 'app/store';
import { useNavigate } from 'react-router-dom';

interface Props {
  authType: 'login' | 'register';
}

export const Auth: FC<Props> = ({ authType }) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    if (user) navigate('/');
  }, [navigate, user]);
  return authType === 'login' ? <LoginForm /> : <RegisterForm />;
};
