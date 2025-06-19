import styles from './index.module.scss';
import type { NavLink as NavLinkType } from 'widgets/Header/types';
import type { FC } from 'react';
import { NavLink } from 'widgets/Header/components/NavLink';

interface Props {
  pages: NavLinkType[];
}

export const NavigationDesktop: FC<Props> = ({ pages }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {pages.map((page) => (
          <li key={page.url}>
            <NavLink url={page.url} text={page.text} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
