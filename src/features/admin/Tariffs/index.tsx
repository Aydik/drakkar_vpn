import { type FC, type ReactNode, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import { Table } from 'shared/ui/Table';
import type { Tariff as TariffType } from 'entities/Tarrif/model';
import type { ApiResponse } from 'shared/api/response.ts';
import { getTariffs } from 'entities/Tarrif/services/tariff.service.ts';

export const Tariffs: FC = () => {
  const [tariffs, setTariffs] = useState<TariffType[]>([]);

  const headers: Record<string, ReactNode> = {
    id: 'Id',
    name: 'Название',
    description: 'Описание',
    price: 'Стоимость',
    durationInDays: 'Длительность',
    maxDevices: 'Максимум устройств',
  };

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

  useEffect(() => {
    fetchTariffs();
  }, []);

  const sanitizeTariffs = (tariffs: TariffType[]): Record<string, ReactNode>[] => {
    return tariffs.map((tariff: TariffType) => ({
      ...tariff,
      price: tariff.price + ' ₽',
      durationInDays: tariff.durationInDays + ' дней',
    }));
  };

  return (
    <div className={styles.tariffs}>
      <div className={styles.caption}>
        <Typography variant={'h3'}>Тарифы</Typography>
        <div className={styles.info}>
          <Typography className={styles.tariffsCount}>{tariffs.length} тарифов</Typography>
          {/*<AddDeviceButton updateDevices={fetchDevices}/>*/}
        </div>
      </div>
      {tariffs.length ? (
        <div className={styles.tableWrapper}>
          <Table headers={headers} data={sanitizeTariffs(tariffs)} />
        </div>
      ) : (
        <Typography variant={'p'} className={styles.noData}>
          Добавьте тариф
        </Typography>
      )}
    </div>
  );
};
