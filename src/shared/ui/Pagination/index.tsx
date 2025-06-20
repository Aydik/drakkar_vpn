import type { FC } from 'react';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import { Icon } from 'shared/ui/Icon/Icon.tsx';
import clsx from 'clsx';

interface Props {
  page: number;
  totalPages: number;
  handlePrevPage?: () => void;
  handleNextPage?: () => void;
}

export const Pagination: FC<Props> = ({ page, totalPages, handlePrevPage, handleNextPage }) => {
  return (
    <div className={styles.pagination}>
      <button
        className={clsx(styles.button, page === 0 && styles.button_disabled)}
        onClick={handlePrevPage}
      >
        <Icon name={'arrow_slide'} size={{ width: 32, height: 32 }} />
      </button>
      <Typography className={styles.page}>{page + 1}</Typography>
      <button
        className={clsx(
          styles.button,
          page >= totalPages && styles.button_disabled,
          styles.button_next,
        )}
        onClick={handleNextPage}
      >
        <Icon name={'arrow_slide'} size={{ width: 32, height: 32 }} />
      </button>
    </div>
  );
};
