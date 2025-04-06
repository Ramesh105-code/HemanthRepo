import React from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import Nested from "./Nested";

const AppContent = () => {
  const { theme, toggleTheme } = useTheme();

  const appStyles = {
    backgroundColor: theme === "light" ? "#f9f9f9" : "#222",
    color: theme === "light" ? "#000" : "#fff",
    minHeight: "100vh",
    padding: "20px",
  };

  return (
    <div style={appStyles}>
      <h1>Context API Theme Example</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Nested />
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
