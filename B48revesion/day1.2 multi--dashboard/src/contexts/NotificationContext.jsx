import React, { createContext, useState, useCallback, useMemo, useContext } from "react";

const NotificationContext = createContext(null);
export const useNotifications = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  const push = useCallback((message) => {
    setNotifications((prev) => [{ id: crypto.randomUUID(), message, ts: new Date().toISOString() }, ...prev]);
    setUnread((c) => c + 1);
  }, []);

  const markAllRead = useCallback(() => setUnread(0), []);

  const value = useMemo(() => ({ notifications, unread, push, markAllRead }), [notifications, unread, push, markAllRead]);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}
