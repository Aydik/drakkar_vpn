import { type FC, useState } from 'react';
import { Icon } from 'shared/ui/Icon/Icon.tsx';
import styles from './index.module.scss';
import type { Device } from 'features/Devices/model';
import { Modal } from 'shared/ui/Modal';
import { Button } from 'shared/ui/Button';
import { CopiableParam } from 'features/Devices/components/CopiableParam';

interface Props {
  device: Device;
}

export const OpenConfigButton: FC<Props> = ({ device }) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  return (
    <>
      <button className={styles.button} onClick={() => setIsModalOpened(true)}>
        <Icon name={'config'} />
      </button>
      <Modal isOpened={isModalOpened} onClose={() => setIsModalOpened(false)}>
        <div className={styles.modal}>
          <CopiableParam key={'assignedIp'} title={'IP адрес сети   '} param={device.assignedIp} />
          <CopiableParam
            key={'publicKey'}
            title={'Публичный ключ сервера'}
            param={device.serverConfig.publicKey}
          />
          <CopiableParam
            key={'endpoint'}
            title={'IP сервера'}
            param={device.serverConfig.endpoint}
          />
          <CopiableParam
            key={'allowedIPs'}
            title={'Доступные IP'}
            param={device.serverConfig.allowedIPs}
          />
          <Button onClick={() => setIsModalOpened(false)}>Закрыть</Button>
        </div>
      </Modal>
    </>
  );
};
