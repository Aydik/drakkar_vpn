import type { FC } from 'react';
import type { Tariff as TariffType } from 'entities/Tarrif/model';
import styles from './index.module.scss';
import { TariffCard } from 'entities/Tarrif/components/TariffCard';

const TARIFFS: TariffType[] = [
  {
    name: 'VPN',
    description: 'Для всей семьи',
    price: 700,
    durationInDays: 30,
    limitations: 5,
  },
  {
    name: 'VPN',
    description: 'Для всей семьи и еще какой-то длинный текст',
    price: 700,
    durationInDays: 30,
    limitations: 5,
  },
  {
    name: 'VPN',
    description: 'Для всей семьи',
    price: 700,
    durationInDays: 30,
    limitations: 5,
  },
  {
    name: 'VPN',
    description: 'Для всей семьи',
    price: 700,
    durationInDays: 30,
    limitations: 5,
  },
  {
    name: 'VPN',
    description: 'Для всей семьи',
    price: 700,
    durationInDays: 30,
    limitations: 5,
  },
];

export const Catalog: FC = () => {
  return (
    <div className={styles.catalog}>
      {TARIFFS.map((tariff, index) => (
        <TariffCard key={index} tariff={tariff} />
      ))}
    </div>
  );
};
