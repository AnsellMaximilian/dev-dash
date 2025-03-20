import { createContext } from "react";
import { SingularData } from "../../types/common";
import { DevUser } from "../../types/dev";

interface DevDataContext {
  devUser: SingularData<DevUser>;
}

export const DevDataContext = createContext<DevDataContext | undefined>(
  undefined
);
