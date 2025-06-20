export function getTotalPages(limit: number, totalCount: number): number {
  return Math.ceil(totalCount / limit);
}
