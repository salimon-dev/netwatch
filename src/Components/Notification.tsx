import { notification } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const NotificationContext = createContext<{ api: NotificationInstance }>({ api: {} as never });
interface Props {
  children: React.ReactNode;
}
export default function NotificationProvider({ children }: Props) {
  const [api, contextHolder] = notification.useNotification();
  return (
    <NotificationContext.Provider value={{ api }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}
