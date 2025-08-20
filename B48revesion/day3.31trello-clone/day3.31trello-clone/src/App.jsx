import React from "react";
import Board from "./components/Board";

export default function App() {
  return (
    <div className="app">
      <header className="appHeader">
        <h1>Task Board</h1>
        <p className="subtitle">A lightweight Trello/Notion style board</p>
      </header>
      <Board />
    </div>
  );
}
