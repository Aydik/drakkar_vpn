import { type FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'app/store';
import { updateUser } from 'entities/User/slice';

export const AuthorizedLayout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    dispatch(updateUser()).then(() => {
      if (!user) navigate('/login');
    });
  }, [dispatch, navigate, user]);
  return <Outlet />;
};
