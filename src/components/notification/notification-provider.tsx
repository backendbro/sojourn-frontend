"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type NotificationType = "warning" | "message";

const ConnectionContext = createContext<{
  type: NotificationType;
  setNotificationType: Dispatch<SetStateAction<NotificationType>>;
}>({
  type: "warning",
  setNotificationType: () => undefined,
});

export default ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationType>("warning");

  useEffect(() => {}, []);

  return (
    <ConnectionContext.Provider
      value={{ type: notification, setNotificationType: setNotification }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(ConnectionContext);
};
