import { createContext } from "react";

interface DevDataContext {
  apiKey: string | null;
  submitApiKey: (key: string) => Promise<void>;
  deleteApiKey: () => Promise<void>;
  loading: boolean;
}

export const DevDataContext = createContext<DevDataContext | undefined>(
  undefined
);
