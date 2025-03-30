import React from "react";
import ShoppingList from "./components/ShoppingList";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1>Dynamic Shopping List with Quantities</h1>
      <ShoppingList />
    </div>
  );
};

export default App;
