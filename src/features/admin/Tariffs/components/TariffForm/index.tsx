import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'shared/ui/Button';
import { Typography } from 'shared/ui/Typography';
import styles from './index.module.scss';
import { InputWithFormatter } from 'shared/ui/InputWithFormatter';
import { Icon } from 'shared/ui/Icon/Icon.tsx';
import type { Tariff, TariffWithoutId } from 'entities/Tarrif/model';
import { createTariff, updateTariff } from 'features/admin/Tariffs/services/tariffs.service.ts';
import type { AxiosError } from 'axios';
import type { ApiResponse } from 'shared/api/response.ts';

interface Props {
  onClose: () => void;
  updateTariffs: () => void;
  prevTariff?: Tariff;
}

export const TariffForm: FC<Props> = ({ onClose, updateTariffs, prevTariff }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<TariffWithoutId>();

  const onSubmit = async (tariff: TariffWithoutId) => {
    try {
      if (prevTariff) await updateTariff(tariff, prevTariff.id);
      else await createTariff(tariff);
      updateTariffs();
      onClose();
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const message = axiosError?.response?.data?.errorMessages?.[0] || 'Что-то пошло не так';

      setError('maxDevices', {
        type: 'manual',
        message,
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.caption}>
        <Typography variant={'h4'} className={styles.title}>
          {prevTariff ? 'Обновить тариф' : 'Создать тариф'}
        </Typography>
        <button onClick={onClose} className={styles.closeButton}>
          <Icon name={'close'} size={{ width: 32, height: 32 }} />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGrid}>
          <InputWithFormatter<TariffWithoutId>
            name="name"
            label="Название"
            type="text"
            control={control}
            error={errors.name}
            defaultValue={prevTariff?.name}
            rules={{
              required: 'Введите название',
            }}
          />
          <InputWithFormatter<TariffWithoutId>
            name="description"
            label="Описание"
            type="text"
            control={control}
            error={errors.description}
            defaultValue={prevTariff?.description}
            rules={{
              required: 'Введите описание',
            }}
          />
          <InputWithFormatter<TariffWithoutId>
            name="price"
            label="Цена"
            type="number"
            control={control}
            error={errors.price}
            defaultValue={prevTariff?.price}
            rules={{
              required: 'Введите цену',
              min: {
                value: 1,
                message: 'Цена не может быть меньше 1',
              },
              max: {
                value: 10000,
                message: 'Цена не может превышать 10000',
              },
            }}
          />
          <InputWithFormatter<TariffWithoutId>
            name="durationInDays"
            label="Длительность"
            type="number"
            control={control}
            error={errors.durationInDays}
            defaultValue={prevTariff?.durationInDays}
            rules={{
              required: 'Введите цену',
              min: {
                value: 1,
                message: 'Длительность не может быть меньше 1',
              },
              max: {
                value: 730,
                message: 'Длительность не может превышать 2 года',
              },
            }}
          />
          <InputWithFormatter<TariffWithoutId>
            name="maxDevices"
            label="Количество устройств"
            type="number"
            control={control}
            error={errors.maxDevices}
            defaultValue={prevTariff?.maxDevices}
            rules={{
              required: 'Введите количество устройств',
              min: {
                value: 1,
                message: 'Количество устройств не может быть меньше 1',
              },
              max: {
                value: 20,
                message: 'Количество устройств не может превышать 20',
              },
            }}
          />
        </div>
        <Button className={styles.button} type="submit">
          {prevTariff ? 'Обновить тариф' : 'Создать тариф'}
        </Button>
      </form>
    </div>
  );
};
