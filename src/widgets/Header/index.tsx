import type { FC } from 'react';
import styles from './index.module.scss';
import { LoginButton } from 'widgets/Header/components/LoginButton';
import { NavigationDesktop } from 'widgets/Header/components/NavigationDesktop';
import { useSelector } from 'react-redux';
import type { RootState } from 'app/store';
import { ADMIN_PAGES, AUTHORIZED_PAGES, UNAUTHORIZED_PAGES } from 'widgets/Header/constants';

interface Props {
  isAdmin?: boolean;
}

export const Header: FC<Props> = ({ isAdmin = false }) => {
  const user = useSelector((state: RootState) => state.user.user);
  if (isAdmin) {
    return (
      <header className={styles.header}>
        <NavigationDesktop pages={ADMIN_PAGES} />
      </header>
    );
  }
  return (
    <header className={styles.header}>
      <div className={styles.links}>
        <NavigationDesktop pages={UNAUTHORIZED_PAGES} />
      </div>
      {user ? <NavigationDesktop pages={AUTHORIZED_PAGES} /> : <LoginButton />}
    </header>
  );
};
