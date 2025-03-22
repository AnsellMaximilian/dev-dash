import { useCallback, useContext, useEffect, useState } from "react";
import { DevContext } from "../context/dev/DevContext";
import {
  JSONValue,
  MaxData,
  PaginatedData,
  SingularData,
} from "../types/common";
import { DevDataContext } from "../context/dev/DevDataContext";
import { getCatchErrorMessage } from "../lib/utils/error";
import { config, functions } from "../lib/appwrite";
import { ExecutionMethod } from "appwrite";
import { AppwriteFuncResponse } from "../types/appwrite";

export const useDev = () => {
  const context = useContext(DevContext);
  if (!context) {
    throw new Error("useDev must be used within an DevProvider");
  }
  return context;
};

export const useSingleData = <T>(
  apiKey: string | null,
  url: string
): SingularData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    if (!apiKey) return;
    setLoading(true);
    setError(null);

    try {
      const response = await functions.createExecution(
        config.devProxyFuncId,
        JSON.stringify({
          pathname: url,
          queryParams: {},
        }),
        undefined,
        undefined,
        ExecutionMethod.GET
      );

      if (response.status === "completed") {
        const result: AppwriteFuncResponse<T> = JSON.parse(
          response.responseBody
        );

        if (result.success) {
          setData(result.data);
        } else {
          setError("Error fetching data in proxy.");
        }
      } else {
        setError("Error fetching data");
      }
    } catch (error) {
      const msg = getCatchErrorMessage(error, "Error fetching data");
      setError(msg);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [apiKey, url]);

  useEffect(() => {
    fetchData();
  }, [apiKey, fetchData]);
  return {
    data,
    loading,
    error,
    fetchData,
    setData,
  };
};

export const usePaginatedData = <T>(
  apiKey: string | null,
  url: string,
  perPage: number = 10,
  publicApi: boolean = false
): PaginatedData<T> => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchData = useCallback(
    async (page: number, params?: Record<string, JSONValue>) => {
      if (!apiKey && !publicApi) return;
      setLoading(true);
      setError(null);

      console.log({
        pathname: url,
        queryParams: {
          page,
          per_page: perPage,
          ...(params || {}),
        },
      });

      try {
        const response = await functions.createExecution(
          config.devProxyFuncId,
          JSON.stringify({
            pathname: url,
            queryParams: {
              page,
              per_page: perPage,
              ...(params || {}),
            },
          }),
          undefined,
          undefined,
          ExecutionMethod.GET
        );

        if (response.status === "completed") {
          const result: AppwriteFuncResponse<T[]> = JSON.parse(
            response.responseBody
          );

          if (result.success) {
            setData(result.data);
            setCurrentPage(page);
          } else {
            setError("Error fetching data in proxy.");
          }
        } else {
          setError("Error fetching data");
        }
      } catch (error) {
        const msg = getCatchErrorMessage(error, "Error fetching data");
        setError(msg);
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [apiKey, url, perPage, publicApi]
  );

  return {
    data,
    error,
    loading,
    pagination: {
      currentPage,
      perPage,
    },
    fetchData,
  };
};

export const useMaxData = <T>(
  apiKey: string | null,
  url: string,
  customFetchData?: () => Promise<T[]>,
  publicApi: boolean = false
): MaxData<T> => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    if (!apiKey && !publicApi) return;
    setLoading(true);
    setError(null);

    try {
      const response = await functions.createExecution(
        config.devProxyFuncId,
        JSON.stringify({
          pathname: url,
          queryParams: {
            page: 1,
            per_page: 1000,
          },
        }),
        undefined,
        undefined,
        ExecutionMethod.GET
      );

      if (response.status === "completed") {
        const result: AppwriteFuncResponse<T[]> = JSON.parse(
          response.responseBody
        );

        if (result.success) {
          setData(result.data);
        } else {
          setError("Error fetching data in proxy.");
        }
      } else {
        setError("Error fetching data");
      }
    } catch (error) {
      const msg = getCatchErrorMessage(error, "Error fetching data");
      setError(msg);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [apiKey, url, publicApi]);

  return {
    data,
    error,
    loading,
    fetchData,
    setData,
    customFetchData,
  };
};

export const useDevData = () => {
  const context = useContext(DevDataContext);
  if (!context) {
    throw new Error("useDevData must be used within a DevDataContextProvider");
  }
  return context;
};
