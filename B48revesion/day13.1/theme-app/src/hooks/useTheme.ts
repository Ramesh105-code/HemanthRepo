import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");


  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.body.className = storedTheme;
    } else {
      setTheme("light");
      document.body.className = "light";
    }
  }, []);

  // Toggle theme and persist in localStorage
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      document.body.className = newTheme;
      return newTheme;
    });
  }, []);

  return { theme, toggleTheme };
}
