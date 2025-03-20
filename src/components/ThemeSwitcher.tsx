import { useEffect, useState } from "react";

const themes = ["dark", "pastel", "cyberpunk"];

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") || "dark"; // Default to dark
  });

  useEffect(() => {
    document.body.className = theme; // Apply theme to <body>
    localStorage.setItem("theme", theme);
  }, [theme]);

  const nextTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <div className="flex justify-center items-center my-4">
      <button
        onClick={nextTheme}
        className={`relative flex items-center w-20 h-10 rounded-full p-1 transition-all 
          ${theme === "dark" ? "bg-gray-800" : ""}
          ${theme === "pastel" ? "bg-pink-200" : ""}
          ${
            theme === "cyberpunk"
              ? "bg-purple-900 border-2 border-neon-green"
              : ""
          }`}
      >
        <div
          className={`w-8 h-8 bg-white rounded-full shadow-md transform transition-all
          ${theme === "dark" ? "translate-x-0" : ""}
          ${theme === "pastel" ? "translate-x-6 bg-pink-400" : ""}
          ${theme === "cyberpunk" ? "translate-x-12 bg-neon-green" : ""}`}
        />
        <span className="absolute left-2 text-sm">
          {theme === "dark" ? "🌙" : theme === "pastel" ? "🎨" : "🌐"}
        </span>
      </button>
    </div>
  );
};

export default ThemeSwitcher;
