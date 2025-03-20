export interface SingularData<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: () => void;
}

export interface Pagination {
  currentPage: number;
  perPage: number;
}

export interface PaginatedData<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  pagination: Pagination;
  fetchData: (page: number) => void;
}
