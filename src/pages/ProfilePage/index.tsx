import type { FC } from 'react';
import styles from './index.module.scss';
import { UserProfile } from 'entities/User/components/UserProfile';
import { CurrentTariff } from 'entities/Tarrif/components/CurrentTarrif';

export const ProfilePage: FC = () => {
  return (
    <div className={styles.profilePage}>
      <div className={styles.accountGrid}>
        <UserProfile />
        <CurrentTariff />
      </div>
    </div>
  );
};
