import { useMemo } from "react";

export interface PaginationState {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  canPrev: boolean;
  canNext: boolean;
}

export function usePagination<T>(
  data: T[] | undefined,
  page: number,
  pageSize: number = 20
): { paginated: T[]; state: PaginationState } {
  return useMemo(() => {
    const items = data ?? [];
    const totalItems = items.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const startIndex = (safePage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    return {
      paginated: items.slice(startIndex, endIndex),
      state: {
        page: safePage,
        pageSize,
        totalItems,
        totalPages,
        startIndex,
        endIndex,
        canPrev: safePage > 1,
        canNext: safePage < totalPages,
      },
    };
  }, [data, page, pageSize]);
}
