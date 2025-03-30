import React from "react";
import TaskManager from "./components/TaskManager";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1>Advanced Task Manager with Prioritization</h1>
      <TaskManager />
    </div>
  );
};

export default App;
