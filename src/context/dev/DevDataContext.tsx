import { createContext } from "react";
import { PaginatedData, SingularData } from "../../types/common";
import { Article, DevUser } from "../../types/dev";

interface DevDataContext {
  devUser: SingularData<DevUser>;
  articles: PaginatedData<Article>;
}

export const DevDataContext = createContext<DevDataContext | undefined>(
  undefined
);
