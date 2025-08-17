import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeDisplay = () => {
  const { theme } = useContext(ThemeContext);

  console.log("Current Theme:", theme);

  return (
    <div style={{
      padding: "20px",
      backgroundColor: theme === "light" ? "#f5f5f5" : "#333",
      color: theme === "light" ? "#000" : "#fff",
      textAlign: "center"
    }}>
      <h2>The current theme is: {theme}</h2>
    </div>
  );
};

export default ThemeDisplay;
