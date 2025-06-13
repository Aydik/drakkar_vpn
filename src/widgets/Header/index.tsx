import type { FC } from 'react';
import styles from './index.module.scss';
import { LoginButton } from 'widgets/Header/components/LoginButton';
import { NavigationDesktop } from 'widgets/Header/components/NavigationDesktop';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.links}>
        <NavigationDesktop />
      </div>
      <LoginButton />
    </header>
  );
};
