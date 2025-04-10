import React from "react";
import TodoList from "./components/TodoList";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1>Multi-Feature To-Do List</h1>
      <TodoList />
    </div>
  );
};

export default App;
