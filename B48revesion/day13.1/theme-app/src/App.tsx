import React from "react";
import { useTheme } from "./hooks/useTheme";

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme === "light" ? "#ffffff" : "#121212",
        color: theme === "light" ? "#000000" : "#ffffff",
        transition: "all 0.3s ease"
      }}
    >
      <h1>{theme === "light" ? "Light Mode 🌞" : "Dark Mode 🌙"}</h1>
      <button
        onClick={toggleTheme}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          backgroundColor: theme === "light" ? "#000" : "#fff",
          color: theme === "light" ? "#fff" : "#000"
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default App;
