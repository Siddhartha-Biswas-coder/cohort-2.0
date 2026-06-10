import React from "react";

const SuggestionCard = ({ title, description, prompt, onClick }) => {
  return (
    <button
      onClick={() => onClick(prompt)}
      className="group flex flex-col rounded-2xl border border-zinc-200 dark:border-white/5 bg-zinc-100/50 dark:bg-white/2 p-4 text-left transition-all duration-200 hover:border-indigo-500/25 dark:hover:border-indigo-500/20 hover:bg-indigo-55/70 dark:hover:bg-indigo-500/5 hover:-translate-y-1 cursor-pointer"
    >
      <h3 className="font-semibold text-zinc-800 dark:text-white">{title}</h3>

      <p className="mt-2 text-sm text-zinc-500 dark:text-white/55">{description}</p>
    </button>
  );
};

export default SuggestionCard;
