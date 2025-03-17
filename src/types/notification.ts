export type NotificationStyle =
  | "none"
  | "success"
  | "error"
  | "warning"
  | "info";

export type NotificationOptions =
  | {
      style?: NotificationStyle;
      icon?: boolean;
    }
  | undefined;

export interface Notification {
  id: string;
  options: NotificationOptions;
  message: string;
}
