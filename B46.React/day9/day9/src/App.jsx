import { ThemeContext } from "./context/ThemeContext";
import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={{ backgroundColor: theme === "dark" ? "#333" : "#fff", color: theme === "dark" ? "#fff" : "#000", minHeight: "100vh" }}>
        <Navbar />
        <h1>Welcome to ShopMate Pro</h1>
      </div>
    </ThemeContext.Provider>
  );
}
