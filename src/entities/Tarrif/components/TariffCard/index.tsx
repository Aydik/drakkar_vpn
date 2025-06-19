import type { FC } from 'react';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import type { Tariff } from 'entities/Tarrif/model';
import { Button } from 'shared/ui/Button';

interface Props {
  tariff: Tariff;
}

export const TariffCard: FC<Props> = ({ tariff }) => {
  const { name, durationInDays, price, description, limitations } = tariff;
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
        <Typography className={styles.limitations}>Макс. {limitations} устройств</Typography>
        <Button className={styles.button} size={'small'}>
          Купить
        </Button>
      </div>
    </div>
  );
};
