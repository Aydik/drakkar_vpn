import type { FC } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'app/store';

export const SupportPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return <div>{JSON.stringify(user)}</div>;
};
