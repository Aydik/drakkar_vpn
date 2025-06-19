import { type FC, useState } from 'react';
import { Button } from 'shared/ui/Button';
import { Modal } from 'shared/ui/Modal';
import { AddDeviceForm } from 'features/Devices/components/AddDeviceForm';

interface Props {
  updateDevices: () => void;
}

export const AddDeviceButton: FC<Props> = ({ updateDevices }) => {
  const [isFormOpened, setIsFormOpened] = useState<boolean>(false);
  const handleAddDevice = () => {
    setIsFormOpened(true);
  };
  return (
    <>
      <Button size={'small'} onClick={handleAddDevice}>
        Добавить устройство
      </Button>
      <Modal isOpened={isFormOpened} onClose={() => setIsFormOpened(false)}>
        <AddDeviceForm onClose={() => setIsFormOpened(false)} updateDevices={updateDevices} />
      </Modal>
    </>
  );
};
