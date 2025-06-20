import { type FC, type ReactNode, useState } from 'react';
import { Icon } from 'shared/ui/Icon/Icon.tsx';
import styles from './index.module.scss';
import { Modal } from 'shared/ui/Modal';
import { Button } from 'shared/ui/Button';
import { Typography } from 'shared/ui/Typography';

interface Props {
  children: ReactNode;
}

export const OpenLogButton: FC<Props> = ({ children }) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  return (
    <>
      <button className={styles.button} onClick={() => setIsModalOpened(true)}>
        <Icon name={'log'} />
      </button>
      <Modal isOpened={isModalOpened} onClose={() => setIsModalOpened(false)}>
        <div className={styles.modal}>
          <Typography className={styles.log}>{children}</Typography>
          <Button onClick={() => setIsModalOpened(false)}>Закрыть</Button>
        </div>
      </Modal>
    </>
  );
};
