import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-react-notification";
import { ReactNode, useEffect, useState } from "react";
import {
  NotificationStyle,
  Notification as TNotification,
} from "../../types/notification";
import { v4 as uuidv4 } from "uuid";
import { NotificationContext } from "./NotificationContext";

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<TNotification[]>([]);

  const notify = (style: NotificationStyle, message: string) => {
    const notification: TNotification = {
      id: uuidv4(),
      options: {
        icon: true,
        style,
      },
      message,
    };

    setNotifications((prev) => [...prev, notification]);
  };

  useEffect(() => {
    let intervalId: number | null = null;

    if (notifications.length > 0) {
      intervalId = setInterval(() => {
        setNotifications((prev) => {
          if (prev.length === 0) return prev;
          return prev.slice(1);
        });
      }, 2500);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [notifications]);
  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <NotificationGroup
        style={{
          right: 8,
          bottom: 8,
          alignItems: "flex-start",
          flexWrap: "wrap-reverse",
        }}
      >
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            type={notification.options}
            closable={true}
            onClose={() => {
              setNotifications((prev) =>
                prev.filter(
                  (notificationToKeep) =>
                    notificationToKeep.id !== notification.id
                )
              );
            }}
          >
            <span>{notification.message}</span>
          </Notification>
        ))}
      </NotificationGroup>
    </NotificationContext.Provider>
  );
};
