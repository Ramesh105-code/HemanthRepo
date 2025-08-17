import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeDisplay from "./components/ThemeDisplay";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <ThemeProvider>
      <ThemeDisplay />
      <ThemeToggle />
    </ThemeProvider>
  );
}

export default App;
