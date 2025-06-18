import type { FC } from 'react';
import styles from './index.module.scss';
import { Link, useLocation } from 'react-router-dom';
import type { NavLink as NavLinkType } from 'widgets/Header/types';
import { Typography } from 'shared/ui/Typography';
import clsx from 'clsx';

export const NavLink: FC<NavLinkType> = ({ url, text }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <Link
      to={url}
      className={clsx(styles.navLink, currentPath === url ? styles.navLink_selected : '')}
    >
      <Typography>{text}</Typography>
      <div className={styles.rectangleWrapper}>
        <div className={styles.rectangle} />
      </div>
    </Link>
  );
};
