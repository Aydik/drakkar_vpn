import styles from './index.module.scss';
import { PAGES } from 'widgets/Header/constants';
import { NavLink } from 'widgets/Header/components/NavLink';
import type { FC } from 'react';

export const NavigationDesktop: FC = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {PAGES.map((page) => (
          <li key={page.url}>
            <NavLink url={page.url} text={page.text} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
