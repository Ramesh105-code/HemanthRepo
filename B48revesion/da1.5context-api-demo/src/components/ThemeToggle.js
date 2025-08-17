import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default ThemeToggle;
