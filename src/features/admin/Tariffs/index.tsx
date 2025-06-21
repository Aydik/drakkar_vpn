import { type FC, type ReactNode, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import { Table } from 'shared/ui/Table';
import type { Tariff as TariffType } from 'entities/Tarrif/model';
import type { ApiResponse } from 'shared/api/response.ts';
import { getTariffs } from 'entities/Tarrif/services/tariff.service.ts';
import { AddTariffButton } from 'features/admin/Tariffs/components/AddTariffButton';
import { deleteTariff } from 'features/admin/Tariffs/services/tariffs.service.ts';
import { DeleteButton } from 'shared/ui/DeleteButton';
import { UpdateTariffButton } from 'features/admin/Tariffs/components/UpdateTariffButton';

export const Tariffs: FC = () => {
  const [tariffs, setTariffs] = useState<TariffType[]>([]);

  const headers: Record<string, ReactNode> = {
    id: 'Id',
    name: 'Название',
    description: 'Описание',
    price: 'Стоимость',
    durationInDays: 'Длительность',
    maxDevices: 'Максимум устройств',
    manage: 'Управление',
  };

  const fetchTariffs = async () => {
    try {
      const res: ApiResponse = await getTariffs();
      if (res.result) setTariffs(res.result);
      else setTariffs([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTariff = async (id: string) => {
    try {
      await deleteTariff(id);
      fetchTariffs();
    } catch (error) {
      console.error(error);
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
      manage: (
        <div className={styles.manage}>
          <UpdateTariffButton updateTariffs={fetchTariffs} tariff={tariff} />
          <DeleteButton onClick={() => handleDeleteTariff(tariff.id)} />
        </div>
      ),
    }));
  };

  return (
    <div className={styles.tariffs}>
      <div className={styles.caption}>
        <Typography variant={'h3'}>Тарифы</Typography>
        <div className={styles.info}>
          <Typography className={styles.tariffsCount}>{tariffs.length} тарифов</Typography>
          <AddTariffButton updateTariffs={fetchTariffs} />
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
