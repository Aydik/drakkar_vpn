import type { Pagination } from 'shared/model';

export interface SystemLogDto extends Pagination {
  source?: string;
  errorCode?: string;
  metadata?: string;
  from?: string;
  to?: string;
}

export interface Log {
  timestamp: string;
  source: string;
  errorCode: string;
  message: string;
  stackTrace?: string | null;
}
