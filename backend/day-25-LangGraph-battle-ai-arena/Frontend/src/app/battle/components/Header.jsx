import React from 'react';

const Header = ({ toggleTheme, isDarkMode }) => {
  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50 transition-colors">
      <div className="max-w-200 mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900 dark:text-gray-100 tracking-tight text-lg">AetherChat</span>
          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md uppercase tracking-wider font-medium transition-colors">Battle Arena</span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
          <button 
            onClick={toggleTheme} 
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button className="hover:text-gray-900 dark:hover:text-white transition-colors">History</button>
          <button className="hover:text-gray-900 dark:hover:text-white transition-colors">Settings</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
