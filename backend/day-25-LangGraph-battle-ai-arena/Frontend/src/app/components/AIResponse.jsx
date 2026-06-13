import React from 'react';
import SolutionBlock from './SolutionBlock';
import JudgePanel from './JudgePanel';

const AIResponse = ({ message }) => {
  if (!message || message.role !== 'ai') return null;

  const winner = message.judge?.solution_1_score >= message.judge?.solution_2_score ? 1 : 2;

  return (
    <div className="w-full mb-12 flex justify-start">
      <div className="w-full max-w-200">
        {/* Solutions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <SolutionBlock 
            title="Solution Alpha" 
            solution={message.solution_1} 
            isWinner={winner === 1} 
          />
          <SolutionBlock 
            title="Solution Beta" 
            solution={message.solution_2} 
            isWinner={winner === 2} 
          />
        </div>

        {/* Judge Recommendation */}
        <JudgePanel judge={message.judge} />
      </div>
    </div>
  );
};

export default AIResponse;
