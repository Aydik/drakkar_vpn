import { type FC, type ReactNode, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import type { Action } from 'features/Actions/model';
import { getActions } from 'features/Actions/services/device.service.ts';
import { formatISOString } from 'shared/utils/date.ts';
import { Table } from 'shared/ui/Table';
import { Pagination } from 'shared/ui/Pagination';

export const Actions: FC = () => {
  const [actions, setActions] = useState<Action[]>([]);

  const headers: Record<string, ReactNode> = {
    performedAt: 'Дата',
    actionType: 'Тип действия',
    metadata: 'Метаданные',
  };

  const sanitizeActions = (actions: Action[]): Record<string, ReactNode>[] => {
    return actions.map((action: Action) => ({
      ...action,
      performedAt: formatISOString(action.performedAt),
    }));
  };

  const fetchActions = async () => {
    try {
      const data = await getActions();
      setActions(data);
    } catch (error) {
      console.error(error);
      setActions([]);
    }
  };

  useEffect(() => {
    fetchActions();
    const interval = setInterval(fetchActions, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.actions}>
      <div className={styles.caption}>
        <Typography variant={'h3'}>Мои действия</Typography>
        <Pagination page={0} totalPages={10} />
      </div>
      {actions.length ? (
        <div className={styles.tableWrapper}>
          <Table headers={headers} data={sanitizeActions(actions)} />
        </div>
      ) : (
        <Typography variant={'p'} className={styles.noData}>
          У вас нет совершенных действий
        </Typography>
      )}
    </div>
  );
};
