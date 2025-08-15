import React, { createContext, useState, useCallback, useMemo, useContext } from "react";

const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <div className={theme === "dark" ? "min-h-screen bg-gray-900 text-gray-100" : "min-h-screen bg-gray-50 text-gray-900"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
