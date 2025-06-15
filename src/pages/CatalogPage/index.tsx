import type { FC } from 'react';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import { Catalog } from 'features/Catalog';

export const CatalogPage: FC = () => {
  return (
    <div className={styles.catalogPage}>
      <Typography variant={'h1'} className={styles.title}>
        Каталог
      </Typography>
      <Catalog />
    </div>
  );
};
