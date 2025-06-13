import { FC } from 'react';
import styles from './index.module.scss';
import { Icon } from 'shared/ui/Icon/Icon.tsx';
import { Typography } from 'shared/ui/Typography';

interface Props {
  title: string;
  icon: string;
}

export const ContactInfo: FC<Props> = ({ title, icon }) => {
  return (
    <div className={styles.contactInfo}>
      <Icon name={icon} className={styles.icon}/>
      <Typography className={styles.title}>{title}</Typography>
    </div>
  );
};
