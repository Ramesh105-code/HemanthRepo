import React from "react";
import StatusIndicator from "./components/StatusIndicator";

function App() {
  return (
    <div>
      <StatusIndicator />
      <h1>Online/Offline Status Detector</h1>
      <p>Turn your internet connection on/off to see changes in real time.</p>
    </div>
  );
}

export default App;
