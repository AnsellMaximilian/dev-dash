import { Pagination } from "./dev";

export interface SingularData<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: () => void;
}

export interface PaginatedData<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  pagination: Pagination;
  fetchData: (page: number, perPage: number) => void;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
}
