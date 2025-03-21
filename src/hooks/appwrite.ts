import { useCallback, useEffect, useState } from "react";
import { SingularData } from "../types/common";
import { config, databases } from "../lib/appwrite";
import { getCatchErrorMessage } from "../lib/utils/error";

export const useSingleData = <T>(
  collectionId: string,
  documentId?: string
): SingularData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    if (!documentId) return;
    setLoading(true);
    setError(null);

    try {
      const response = (await databases.getDocument(
        config.dbId,
        collectionId,
        documentId
      )) as T;

      setData(response);
    } catch (error) {
      const msg = getCatchErrorMessage(error, "Error fetching data");
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [documentId, collectionId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return {
    data,
    loading,
    error,
    fetchData,
    setData,
  };
};
