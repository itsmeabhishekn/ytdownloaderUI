import { useEffect, useState } from "react";

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => {
    return (
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="flex justify-center items-center my-4">
      <button
        onClick={toggleTheme}
        className={`relative flex items-center w-16 h-8 bg-gray-600 dark:bg-gray-300 rounded-full p-1 transition-all`}
      >
        <div
          className={`w-6 h-6 bg-white rounded-full shadow-md transform ${
            theme === "dark" ? "translate-x-8" : "translate-x-0"
          } transition-all`}
        />
        <span
          className={`absolute left-2 text-sm ${
            theme === "light" ? "text-gray-900" : "text-gray-400"
          }`}
        >
          ☀️
        </span>
        <span
          className={`absolute right-2 text-sm ${
            theme === "dark" ? "text-gray-100" : "text-gray-600"
          }`}
        >
          🌙
        </span>
      </button>
    </div>
  );
};

export default ThemeSwitcher;
