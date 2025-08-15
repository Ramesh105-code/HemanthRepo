import React, { useEffect } from "react";
import { AppHeader } from "./AppHeader";
import { useNotifications } from "../../contexts/NotificationContext";
import { sleep } from "../../utils";

export function AppShell({ children }) {
  const { push } = useNotifications();

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      let i = 1;
      while (mounted) {
        await sleep(25000);
        push(`System broadcast #${i++}: Keep up the great work!`);
      }
    };
    run();
    return () => { mounted = false; };
  }, [push]);

  return (
    <div>
      <AppHeader />
      <main className="max-w-6xl mx-auto p-4">{children}</main>
    </div>
  );
}
