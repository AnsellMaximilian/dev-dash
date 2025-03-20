import { ReactNode } from "react";
import { DevDataContext } from "./DevDataContext";
import { useDev, useSingleData } from "../../hooks/dev";
import { DevUser } from "../../types/dev";

export const DevDataContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { apiKey } = useDev();
  const devUserData = useSingleData<DevUser>(apiKey, "/users/me");

  return (
    <DevDataContext.Provider value={{ devUser: devUserData }}>
      {children}
    </DevDataContext.Provider>
  );
};
