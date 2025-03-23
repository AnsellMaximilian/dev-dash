import { ReactNode, useEffect } from "react";
import { DevDataContext } from "./DevDataContext";
import {
  useDev,
  useMaxData,
  usePaginatedData,
  useSingleData,
} from "../../hooks/dev";
import { Article, DevUser, ReadingListItem } from "../../types/dev";

export const DevDataContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { apiKey } = useDev();
  const devUserData = useSingleData<DevUser>(apiKey, "/users/me");
  const articles = usePaginatedData<Article>(apiKey, "/articles/me/all", 1000);
  const readingList = useMaxData<ReadingListItem>(apiKey, "/readinglist");

  const fetchArticles = articles.fetchData;

  useEffect(() => {
    if (devUserData.data) {
      fetchArticles(1);
    }
  }, [devUserData.data, fetchArticles]);

  return (
    <DevDataContext.Provider
      value={{ devUser: devUserData, articles, readingList }}
    >
      {children}
    </DevDataContext.Provider>
  );
};
