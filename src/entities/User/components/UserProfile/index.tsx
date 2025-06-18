import type { FC } from 'react';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';

export const UserProfile: FC = () => {
  return (
    <div className={styles.userProfile}>
      <Typography variant={'p'} className={styles.username}>
        Иван Иванов Иванович
      </Typography>
      <Typography variant={'p'} className={styles.email}>
        user@example.commmmmmmmmmmmm
      </Typography>
      <Typography variant={'p'} className={styles.localization}>
        ru
      </Typography>
    </div>
  );
};
