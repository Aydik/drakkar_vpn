import type { FC } from 'react';
import { Header } from 'widgets/Header';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';

export const MainLayout: FC = () => {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
