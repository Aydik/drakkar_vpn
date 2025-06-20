import type { FC } from 'react';
import { Icon } from 'shared/ui/Icon/Icon.tsx';
import styles from './index.module.scss';

interface Props {
  onClick?: () => void;
}

export const DeleteDeviceButton: FC<Props> = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <Icon name={'delete'} />
    </button>
  );
};
