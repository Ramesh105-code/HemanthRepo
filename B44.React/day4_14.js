import React from "react";
import TaskList from "./components/TaskList";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1>Firebase Task Manager</h1>
      <TaskList />
    </div>
  );
};

export default App;
