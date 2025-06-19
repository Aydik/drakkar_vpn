import { type FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from 'app/store';

export const AuthorizedLayout: FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    if (!user) navigate('/login');
  }, [navigate, user]);
  return <Outlet />;
};
