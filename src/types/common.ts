import { Dispatch, SetStateAction } from "react";

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray;
export interface JSONObject {
  [key: string]: JSONValue;
}
export type JSONArray = Array<JSONValue>;

export interface SingularData<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  setData: Dispatch<SetStateAction<T | null>>;
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
  fetchData: (page: number, params?: Record<string, JSONValue>) => void;
}

export interface MaxData<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  fetchData: () => void;
  customFetchData?: () => Promise<T[]>;
  setData: React.Dispatch<React.SetStateAction<T[]>>;
}
