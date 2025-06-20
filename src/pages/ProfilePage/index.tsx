import type { FC } from 'react';
import styles from './index.module.scss';
import { UserProfile } from 'entities/User/components/UserProfile';
import { MySubscription } from 'src/entities/Tarrif/components/MySubscription';
import { Devices } from 'features/Devices';
import { Actions } from 'features/Actions';

export const ProfilePage: FC = () => {
  return (
    <div className={styles.profilePage}>
      <div className={styles.accountGrid}>
        <UserProfile />
        <MySubscription />
      </div>
      <Devices />
      <Actions />
    </div>
  );
};
