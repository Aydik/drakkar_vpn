import styles from './index.module.scss';
import { PAGES } from 'widgets/Header/constants';
import { NavLink } from 'widgets/Header/components/NavLink';
import type { FC } from 'react';
import { useLocation } from 'react-router-dom';

export const NavigationDesktop: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isSelected = (path: string) => currentPath === path;
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {PAGES.map((page) => (
          <li key={page.url}>
            <NavLink url={page.url} text={page.text} isSelected={isSelected(page.url)} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
