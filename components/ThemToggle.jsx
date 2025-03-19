import React from 'react';
import { useTheme } from './ThemeProvider';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ isMobile }) => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors duration-200
        dark:bg-gray-800 bg-white
        dark:text-yellow-300 text-gray-800
        hover:bg-gray-100 dark:hover:bg-gray-700
        shadow-lg
        ${isMobile ? 'relative w-full flex justify-center items-center gap-2' : 'fixed top-4 right-4'}`}
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <>
          {isMobile && <span className="text-sm">Light Mode</span>}
          <FaSun size={20} />
        </>
      ) : (
        <>
          {isMobile && <span className="text-sm">Dark Mode</span>}
          <FaMoon size={20} />
        </>
      )}
    </button>
  );
};

export default ThemeToggle;