import { type FC, type ReactNode, useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import type { Action } from 'features/Actions/model';
import { getActions } from 'features/Actions/services/device.service.ts';
import { formatISOString } from 'shared/utils/date.ts';
import { Table } from 'shared/ui/Table';
import { Pagination } from 'shared/ui/Pagination';
import { USER_ACTIONS_LIMIT } from 'shared/constants';
import type { PaginatedResponse } from 'shared/model';
import { getTotalPages } from 'shared/utils/pagination.ts';

export const Actions: FC = () => {
  const [actions, setActions] = useState<Action[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

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

  const fetchActions = useCallback(async () => {
    try {
      const data: PaginatedResponse = await getActions({
        limit: USER_ACTIONS_LIMIT,
        offset: USER_ACTIONS_LIMIT * page,
      });
      setActions(data.items as Action[]);
      setTotalPages(getTotalPages(USER_ACTIONS_LIMIT, data.totalCount));
    } catch (error) {
      console.error(error);
      setActions([]);
    }
  }, [page]);

  useEffect(() => {
    fetchActions();
    const interval = setInterval(fetchActions, 1000);
    return () => clearInterval(interval);
  }, [fetchActions]);

  useEffect(() => {
    fetchActions();
  }, [fetchActions, page]);

  return (
    <div className={styles.actions}>
      <div className={styles.caption}>
        <Typography variant={'h3'}>Мои действия</Typography>
        {totalPages > 1 && <Pagination page={page} totalPages={totalPages} setPage={setPage} />}
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
