import type { FC } from 'react';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import { CopyButton } from 'shared/ui/CopyButton';

interface Props {
  title: string;
  param: string;
}

export const CopiableParam: FC<Props> = ({ param, title }) => {
  return (
    <div className={styles.param}>
      <div className={styles.param__caption}>
        <Typography className={styles.param__title}>{title}</Typography>
        <CopyButton text={param} />
      </div>
      <Typography variant={'p'} className={styles.param__content}>
        {param}
      </Typography>
    </div>
  );
};
