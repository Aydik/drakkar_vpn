export interface Pagination {
  limit?: number;
  offset?: number;
}

export interface PaginatedResponse {
  totalCount: number;
  items: unknown[];
}
