import React from "react";
import { SUGGESTIONS } from "../../../constants/suggestions";
import SuggestionCard from "./SuggestionCard";


const EmptyState = ({ onSuggestionClick }) => {
  return (
    <div className="mx-auto mt-20 flex max-w-4xl flex-col items-center text-center">
      <h1 className="mb-3 text-4xl font-bold">Ask Anything</h1>

      <p className="max-w-md text-white/60">
        Ask questions, research topics, and explore ideas with AI-powered
        answers.
      </p>

      <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
        {SUGGESTIONS.map((item) => (
          <SuggestionCard
            key={item.title}
            title={item.title}
            description={item.description}
            prompt={item.prompt}
            onClick={onSuggestionClick}
          />
        ))}
      </div>
    </div>
  );
};

export default EmptyState;
