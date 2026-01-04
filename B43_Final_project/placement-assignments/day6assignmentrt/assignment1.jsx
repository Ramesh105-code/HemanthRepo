import { useState } from "react";

function AlertContainer() {
  const [alerts, setAlerts] = useState([]);

  const showSampleAlerts = () => {
    setAlerts([
      { id: 1, type: "success", message: "Operation successful" },
      { id: 2, type: "error", message: "Something went wrong" },
      { id: 3, type: "warning", message: "Check your input" },
      { id: 4, type: "info", message: "New update available" },
    ]);
  };

  const removeAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  return (
    <div>
      <button onClick={showSampleAlerts}>Show Sample Alerts</button>

      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          onClose={() => removeAlert(alert.id)}
        >
          {alert.message}
        </Alert>
      ))}
    </div>
  );
}
