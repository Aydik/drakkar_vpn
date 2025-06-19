import type { FC } from 'react';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import type { Tariff } from 'entities/Tarrif/model';
import { Button } from 'shared/ui/Button';
import { purchaseTariff } from 'entities/Tarrif/services/tariff.service.ts';
import { AxiosError } from 'axios';
import type { ApiResponse } from 'shared/api/response.ts';
import { useNavigate } from 'react-router-dom';

interface Props {
  tariff: Tariff;
}

export const TariffCard: FC<Props> = ({ tariff }) => {
  const { id, name, durationInDays, price, description, maxDevices } = tariff;

  const navigate = useNavigate();

  const handlePurchaseTariff = async (tariffId: string) => {
    try {
      await purchaseTariff(tariffId);
      navigate('/profile');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      if (axiosError?.status === 401) {
        navigate('/login');
      } else {
        const message = axiosError?.response?.data?.errorMessages?.[0] || 'Ошибка покупки тарифа';
        alert(message);
      }
    }
  };

  return (
    <div className={styles.tariff}>
      <div className={styles.info}>
        <Typography className={styles.name}>{name}</Typography>
        <Typography className={styles.description}>{description}</Typography>
      </div>
      <div className={styles.info}>
        <Typography className={styles.priceAndDuration}>
          <span className={styles.price}>{price} ₽</span> / {durationInDays} дней
        </Typography>
        <Typography className={styles.limitations}>Макс. {maxDevices} устройств</Typography>
        <Button className={styles.button} size={'small'} onClick={() => handlePurchaseTariff(id)}>
          Купить
        </Button>
      </div>
    </div>
  );
};
