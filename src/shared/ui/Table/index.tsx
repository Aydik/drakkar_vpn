import React, { type ReactNode } from 'react';
import styles from './index.module.scss';

interface Props {
  headers: Record<string, ReactNode>;
  data: Record<string, ReactNode>[];
  emptyMessage?: string;
}

export const Table: React.FC<Props> = ({
  headers,
  data,
  emptyMessage = 'Нет данных для отображения',
}) => {
  const hasData = data && data.length > 0;

  return (
    <div className={styles.tableWrapper}>
      {!hasData ? (
        <div className={styles.noData}>{emptyMessage}</div>
      ) : (
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {Object.keys(headers).map((key) => (
                <th key={key} className={styles.th}>
                  {headers[key]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {data.map((row, idx) => (
              <tr key={idx} className={styles.tr}>
                {Object.keys(headers).map((key) => (
                  <td key={key} className={styles.td}>
                    {row[key] ?? ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
