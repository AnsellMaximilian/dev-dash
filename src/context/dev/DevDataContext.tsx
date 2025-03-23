import { createContext } from "react";
import { MaxData, PaginatedData, SingularData } from "../../types/common";
import { Article, DevUser, ReadingListItem } from "../../types/dev";

interface DevDataContext {
  devUser: SingularData<DevUser>;
  articles: PaginatedData<Article>;
  readingList: MaxData<ReadingListItem>;
}

export const DevDataContext = createContext<DevDataContext | undefined>(
  undefined
);
