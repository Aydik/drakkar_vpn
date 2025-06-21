import { type FC, useState } from 'react';
import { Button } from 'shared/ui/Button';
import { Modal } from 'shared/ui/Modal';
import { TariffForm } from 'src/features/admin/Tariffs/components/TariffForm';

interface Props {
  updateTariffs: () => void;
}

export const AddTariffButton: FC<Props> = ({ updateTariffs }) => {
  const [isFormOpened, setIsFormOpened] = useState<boolean>(false);
  return (
    <>
      <Button
        size={'small'}
        onClick={() => {
          setIsFormOpened(true);
        }}
      >
        Добавить тариф
      </Button>
      <Modal isOpened={isFormOpened} onClose={() => setIsFormOpened(false)}>
        <TariffForm onClose={() => setIsFormOpened(false)} updateTariffs={updateTariffs} />
      </Modal>
    </>
  );
};
