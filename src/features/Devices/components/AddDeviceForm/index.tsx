import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'shared/ui/Button';
import { Typography } from 'shared/ui/Typography';
import styles from './index.module.scss';
import { InputWithFormatter } from 'shared/ui/InputWithFormatter';
import type { CreateDeviceDto } from 'features/Devices/model';
import { Icon } from 'shared/ui/Icon/Icon.tsx';
import type { AxiosError } from 'axios';
import type { ApiResponse } from 'shared/api/response.ts';
import { createDevice } from 'features/Devices/services/device.service.ts';

interface Props {
  onClose: () => void;
  updateDevices: () => void;
}

export const AddDeviceForm: FC<Props> = ({ onClose, updateDevices }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<CreateDeviceDto>();

  const onSubmit = async (data: CreateDeviceDto) => {
    try {
      await createDevice({
        deviceName: data.deviceName,
        publicKey: data.publicKey,
      });
      updateDevices();
      onClose();
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const message = axiosError?.response?.data?.errorMessages?.[0] || 'Что-то пошло не так';

      setError('publicKey', {
        type: 'manual',
        message,
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.caption}>
        <Typography variant={'h4'} className={styles.title}>
          Создать конфиг
        </Typography>
        <button onClick={onClose} className={styles.closeButton}>
          <Icon name={'close'} size={{ width: 32, height: 32 }} />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGrid}>
          <InputWithFormatter<CreateDeviceDto>
            name="deviceName"
            label="Название устройства"
            type="text"
            control={control}
            error={errors.deviceName}
            rules={{
              required: 'Введите название',
              minLength: {
                value: 4,
                message: 'Минимальная длина - 4 символа',
              },
              maxLength: {
                value: 50,
                message: 'Максимальная длина - 50 символов',
              },
            }}
          />
          <InputWithFormatter<CreateDeviceDto>
            name="publicKey"
            label="Публичный ключ"
            type="text"
            control={control}
            error={errors.publicKey}
            rules={{
              required: 'Введите публичный ключ из приложения WireGuard',
            }}
          />
        </div>
        <Button className={styles.button} type="submit">
          Создать конфиг
        </Button>
      </form>
    </div>
  );
};
