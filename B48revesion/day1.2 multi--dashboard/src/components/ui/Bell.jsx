import React, { useState, useEffect } from "react";
import { useNotifications } from "../../contexts/NotificationContext";

export const Bell = React.memo(function Bell() {
  const { unread, notifications, markAllRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);

  useEffect(() => {
    if (open) markAllRead();
  }, [open, markAllRead]);

  return (
    <div className="relative">
      <button onClick={toggle} className="relative p-2 rounded-2xl shadow bg-white/70 hover:bg-white">
        <span className="material-icons">notifications</span>
        {unread > 0 && <span className="absolute -top-1 -right-1 text-xs px-1.5 py-0.5 rounded-full bg-red-600 text-white">{unread}</span>}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 max-h-80 overflow-auto rounded-2xl border bg-white shadow-lg p-2 text-sm">
          {notifications.length === 0
            ? <div className="p-4 text-gray-500">No notifications</div>
            : notifications.map((n) => (
                <div key={n.id} className="p-2 hover:bg-gray-50">
                  <div className="font-medium">{n.message}</div>
                  <div className="text-xs text-gray-500">{new Date(n.ts).toLocaleString()}</div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
});
