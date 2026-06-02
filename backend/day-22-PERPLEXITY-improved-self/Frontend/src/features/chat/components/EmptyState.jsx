import React from "react";
import { SUGGESTIONS } from "../../../constants/suggestions";

const EmptyState = ({ onSuggestionClick }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <h1 className="mb-3 text-4xl font-bold">Ask Anything</h1>

      <p className="max-w-md text-white/60">
        Ask questions, research topics, and explore ideas with AI-powered
        answers.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {SUGGESTIONS.map((item) => (
          <button
            key={item}
            onClick={() => {
              onSuggestionClick(item);
            }}
            className="rounded-full border border-white/20 px-4 py-2 text-sm transition hover:bg-white/10"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;
