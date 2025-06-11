"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import connected from "is-online";
import { usePathname } from "next/navigation";

type ConnectionType = "connected" | "not-connected";

const ConnectionContext = createContext<{ isOnline: ConnectionType }>({
  isOnline: "connected",
});

export default ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const [isOnline, setIsOnline] = useState<ConnectionType>("connected");

  useEffect(() => {
    const updateOnlineStatus = async () => {
      const isConnected = await connected();
      if (isConnected) {
        setIsOnline("connected");
      } else {
        setIsOnline("not-connected");
      }
    };

    updateOnlineStatus();

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, [pathname]);

  return (
    <ConnectionContext.Provider value={{ isOnline }}>
      {children}
    </ConnectionContext.Provider>
  );
};

// Custom hook to use the connection state
export const useConnection = () => {
  return useContext(ConnectionContext);
};
