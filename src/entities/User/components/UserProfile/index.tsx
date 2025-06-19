import type { FC } from 'react';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import { Button } from 'shared/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'app/store';
import { logout } from 'entities/User/slice';

export const UserProfile: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className={styles.userProfile}>
      <div>
        <Typography variant={'p'} className={styles.username}>
          {user?.fullName}
        </Typography>
        <Typography variant={'p'} className={styles.email}>
          {user?.email}
        </Typography>
      </div>
      <Button size={'small'} className={styles.logoutButton} onClick={handleLogout}>
        Выйти
      </Button>
      <Typography variant={'p'} className={styles.localization}>
        {user?.language}
      </Typography>
    </div>
  );
};
