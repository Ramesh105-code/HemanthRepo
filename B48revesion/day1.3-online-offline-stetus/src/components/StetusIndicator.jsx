import React, { useState, useEffect } from "react";

const StatusIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: isOnline ? "green" : "red",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)"
      }}
      title={isOnline ? "Online" : "Offline"}
    ></div>
  );
};

export default StatusIndicator;
