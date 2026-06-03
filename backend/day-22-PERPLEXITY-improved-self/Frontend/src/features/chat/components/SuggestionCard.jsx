import React from "react";

const SuggestionCard = ({ title, description, prompt, onClick }) => {
  return (
    <button
      onClick={() => onClick(prompt)}
      className="group flex flex-col rounded-2xl border border-white/10 bg-white/2 p-4 text-left transition-all duration-200 hover:border-white/20 hover:bg-white/5 hover:-translate-y-1"
    >
      <h3 className="font-medium text-white">{title}</h3>

      <p className="mt-2 text-sm text-white/55">{description}</p>
    </button>
  );
};

export default SuggestionCard;
