import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  const [reactTitle, setReactTitle] = useState("React Title");
  const [reactUpdates, setReactUpdates] = useState(0);
  const [vanillaUpdates, setVanillaUpdates] = useState(0);

  
  let vanillaCount = 0;

  const handleVanillaClick = () => {
    vanillaCount++;
    document.getElementById("vanilla-title").textContent =
      "Vanilla Title " + vanillaCount;
    setVanillaUpdates(prev => prev + 1);
  };

  const handleReactClick = () => {
    setReactTitle("React Title " + (reactUpdates + 1));
    setReactUpdates(prev => prev + 1);
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h2 id="vanilla-title">Vanilla Title</h2>
      <h2>{reactTitle}</h2>

      <button onClick={handleVanillaClick}>Change Title (Vanilla JS)</button>
      <p>Vanilla DOM Updates: {vanillaUpdates}</p>

      <button onClick={handleReactClick}>Change Title (React)</button>
      <p>React DOM Updates: {reactUpdates}</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
