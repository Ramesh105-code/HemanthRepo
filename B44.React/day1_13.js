import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  
  const [reactTitle, setReactTitle] = useState("React Title");
  const [reactUpdates, setReactUpdates] = useState(0);

 
  let vanillaUpdates = 0;

  
  const updateVanillaTitle = () => {
    const titleElement = document.getElementById("vanilla-title");
    if (titleElement) {
      titleElement.textContent = `Vanilla Title Updated: ${++vanillaUpdates}`;
    }
    document.getElementById("vanilla-count").textContent = `DOM Updates: ${vanillaUpdates}`;
  };

  const updateReactTitle = () => {
    setReactTitle(`React Title Updated: ${reactUpdates + 1}`);
    setReactUpdates((prev) => prev + 1);
  };

  return (
    <div className="container">
      <h1>Virtual DOM vs Traditional DOM</h1>

      <div className="section">
        <h2 id="vanilla-title">Vanilla Title</h2>
        <p id="vanilla-count">DOM Updates: 0</p>
        <button onClick={updateVanillaTitle}>Change Title (Vanilla JS)</button>
      </div>

      <div className="section">
        <h2>{reactTitle}</h2>
        <p>DOM Updates: {reactUpdates}</p>
        <button onClick={updateReactTitle}>Change Title (React)</button>
      </div>
    </div>
  );
};

export default App;
