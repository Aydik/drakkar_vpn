import { type FC, useState } from 'react';
import { Icon } from 'shared/ui/Icon/Icon.tsx';
import styles from './index.module.scss';
import type { ServerConfig } from 'features/Devices/model';
import { Modal } from 'shared/ui/Modal';
import { Button } from 'shared/ui/Button';
import QRCode from 'react-qr-code';

interface Props {
  config: ServerConfig;
}

export const CreateQrButton: FC<Props> = ({ config }) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  return (
    <>
      <button className={styles.button} onClick={() => setIsModalOpened(true)}>
        <Icon name={'qr'} />
      </button>
      <Modal isOpened={isModalOpened} onClose={() => setIsModalOpened(false)}>
        <div className={styles.modal}>
          <QRCode value={JSON.stringify(config)} size={300} />
          <Button onClick={() => setIsModalOpened(false)}>Закрыть</Button>
        </div>
      </Modal>
    </>
  );
};
