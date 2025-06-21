import { type FC, useState } from 'react';
import { Modal } from 'shared/ui/Modal';
import { TariffForm } from 'src/features/admin/Tariffs/components/TariffForm';
import styles from 'features/admin/SystemLogs/components/OpenLogButton/index.module.scss';
import { Icon } from 'shared/ui/Icon/Icon.tsx';
import type { Tariff } from 'entities/Tarrif/model';

interface Props {
  updateTariffs: () => void;
  tariff: Tariff;
}

export const UpdateTariffButton: FC<Props> = ({ updateTariffs, tariff }) => {
  const [isFormOpened, setIsFormOpened] = useState<boolean>(false);
  return (
    <>
      <button className={styles.button} onClick={() => setIsFormOpened(true)}>
        <Icon name={'log'} />
      </button>
      <Modal isOpened={isFormOpened} onClose={() => setIsFormOpened(false)}>
        <TariffForm
          onClose={() => setIsFormOpened(false)}
          updateTariffs={updateTariffs}
          prevTariff={tariff}
        />
      </Modal>
    </>
  );
};
