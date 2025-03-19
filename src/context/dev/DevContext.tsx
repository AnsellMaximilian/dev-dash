import { createContext } from "react";

interface DevContextData {
  apiKey: string | null;
  submitApiKey: (key: string) => Promise<void>;
  deleteApiKey: () => Promise<void>;
  loading: boolean;
}

export const DevContext = createContext<DevContextData | undefined>(undefined);
