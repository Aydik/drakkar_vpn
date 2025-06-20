import type { Dispatch, FC, SetStateAction } from 'react';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import { Icon } from 'shared/ui/Icon/Icon.tsx';
import clsx from 'clsx';

interface Props {
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const Pagination: FC<Props> = ({ page, totalPages, setPage }) => {
  const hasPrev = page > 0;
  const hasNext = page + 1 < totalPages;
  return (
    <div className={styles.pagination}>
      <button
        className={clsx(styles.button, !hasPrev && styles.button_disabled)}
        onClick={() => {
          if (hasPrev) {
            setPage((prev) => prev - 1);
          }
        }}
      >
        <Icon name={'arrow_slide'} size={{ width: 32, height: 32 }} />
      </button>
      <Typography className={styles.page}>
        {page + 1} / {totalPages}
      </Typography>
      <button
        className={clsx(styles.button, !hasNext && styles.button_disabled, styles.button_next)}
        onClick={() => {
          if (hasNext) {
            setPage((prev) => prev + 1);
          }
        }}
      >
        <Icon name={'arrow_slide'} size={{ width: 32, height: 32 }} />
      </button>
    </div>
  );
};
