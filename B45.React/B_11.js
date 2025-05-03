import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [isBlue, setIsBlue] = useState(true);

  const toggleColor = () => {
    setIsBlue((prev) => !prev);
  };

  return (
    <div className="container">
      <button
        onClick={toggleColor}
        style={{
          backgroundColor: isBlue ? "blue" : "red",
          color: "white",
          border: "none",
          padding: "15px 30px",
          fontSize: "18px",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        Color: {isBlue ? "Blue" : "Red"}
      </button>
    </div>
  );
};

export default App;
