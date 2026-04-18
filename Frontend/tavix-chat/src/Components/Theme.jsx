import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("THEME");
  if (savedTheme) return savedTheme;
  return window.matchMedia("(prefers-color-scheme:dark)").matches
    ? "dark"
    : "light";
};

const Theme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("THEME", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      className="fixed bottom-5 right-5 p-2 rounded-full shadow-lg bg-background text-text-primary transition-colors duration-300 hover:cursor-pointer"
      onClick={handleToggleTheme}
    >
      <div className="relative w-6 h-6">
        <Moon
          className={`absolute inset-0 transition-all duration-500 ${theme === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}`}
        />
        <Sun
          className={`absolute inset-0 transition-all duration-500 ${theme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}`}
        />
      </div>
    </button>
  );
};

export default Theme;
