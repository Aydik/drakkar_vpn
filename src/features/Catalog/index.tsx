import { type FC, useEffect, useState } from 'react';
import type { Tariff as TariffType } from 'entities/Tarrif/model';
import styles from './index.module.scss';
import { TariffCard } from 'entities/Tarrif/components/TariffCard';
import { Typography } from 'shared/ui/Typography';
import { getTariffs } from 'entities/Tarrif/services/tariff.service.ts';
import type { ApiResponse } from 'shared/api/response.ts';

export const Catalog: FC = () => {
  const [tariffs, setTariffs] = useState<TariffType[]>([]);

  useEffect(() => {
    const fetchTariffs = async () => {
      try {
        const res: ApiResponse = await getTariffs();
        if (res.result) setTariffs(res.result);
        else setTariffs([]);
      } catch (error) {
        console.error(error);
        setTariffs([]);
      }
    };
    fetchTariffs();
  }, []);

  return (
    <div className={styles.catalog}>
      {tariffs ? (
        tariffs.map((tariff, index) => <TariffCard key={index} tariff={tariff} />)
      ) : (
        <Typography className={styles.error}>Нет доступных тарифов</Typography>
      )}
    </div>
  );
};
