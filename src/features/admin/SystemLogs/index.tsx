import { type FC, type ReactNode, useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import { formatISOString } from 'shared/utils/date.ts';
import { Table } from 'shared/ui/Table';
import { Pagination } from 'shared/ui/Pagination';
import { ADMIN_LOGS_LIMIT } from 'shared/constants';
import type { PaginatedResponse } from 'shared/model';
import { getTotalPages } from 'shared/utils/pagination.ts';
import { getLogs } from 'features/admin/SystemLogs/services/logs.service';
import type { Log } from 'features/admin/SystemLogs/model';
import { OpenLogButton } from 'features/admin/SystemLogs/components/OpenLogButton';
// import { useNavigate } from 'react-router-dom';

export const Logs: FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // const navigate = useNavigate();

  const headers: Record<string, ReactNode> = {
    timestamp: 'Дата',
    source: 'Ресурс',
    errorCode: 'Код ошибки',
    message: 'Сообщение',
    stackTrace: 'Посмотреть StackTrace',
  };

  const sanitizeLogs = (logs: Log[]): Record<string, ReactNode>[] => {
    return logs.map((log: Log) => ({
      ...log,
      timestamp: formatISOString(log.timestamp),
      message: <OpenLogButton>{log.message}</OpenLogButton>,
      stackTrace: <OpenLogButton>{log.stackTrace}</OpenLogButton>,
    }));
  };

  const fetchLogs = useCallback(async () => {
    try {
      const data: PaginatedResponse = await getLogs({
        limit: ADMIN_LOGS_LIMIT,
        offset: ADMIN_LOGS_LIMIT * page,
      });
      setLogs(data.items as Log[]);
      setTotalPages(getTotalPages(ADMIN_LOGS_LIMIT, data.totalCount));
    } catch (error) {
      console.error(error);
      setLogs([]);
    }
  }, [page]);

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 1000);
    return () => clearInterval(interval);
  }, [fetchLogs]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs, page]);

  return (
    <div className={styles.logs}>
      <div className={styles.caption}>
        <Typography variant={'h3'}>Системны логи</Typography>
        {totalPages > 1 && <Pagination page={page} totalPages={totalPages} setPage={setPage} />}
      </div>
      {logs.length ? (
        <div className={styles.tableWrapper}>
          <Table headers={headers} data={sanitizeLogs(logs)} />
        </div>
      ) : (
        <Typography variant={'p'} className={styles.noData}>
          Логи пусты
        </Typography>
      )}
    </div>
  );
};
