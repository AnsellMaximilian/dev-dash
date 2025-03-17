import { createContext } from "react";
import { NotificationStyle } from "../../types/notification";

interface NotificationContextType {
  notify: (style: NotificationStyle, message: string) => void;
}
export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
