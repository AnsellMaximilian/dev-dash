import { useCallback, useContext, useEffect, useState } from "react";
import { DevContext } from "../context/dev/DevContext";
import { SingularData } from "../types/common";
import { DevDataContext } from "../context/dev/DevDataContext";
import { getCatchErrorMessage } from "../lib/utils/error";
import { config, functions } from "../lib/appwrite";
import { ExecutionMethod } from "appwrite";

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

      console.log(response);

      if (response.status === "completed") {
        setData(JSON.parse(response.responseBody));
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
  };
};

export const useDevData = () => {
  const context = useContext(DevDataContext);
  if (!context) {
    throw new Error("useDevData must be used within a DevDataContextProvider");
  }
  return context;
};
