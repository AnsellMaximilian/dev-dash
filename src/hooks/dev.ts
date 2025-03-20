import { useCallback, useContext, useEffect, useState } from "react";
import { DevContext } from "../context/dev/DevContext";
import { SingularData } from "../types/common";
import axiosInstance from "../lib/axios";

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
      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (error) {
      setError("Error fetching data");
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
