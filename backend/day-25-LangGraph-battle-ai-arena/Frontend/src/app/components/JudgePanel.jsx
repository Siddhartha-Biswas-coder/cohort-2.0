import React from 'react';

const JudgePanel = ({ judge }) => {
  if (!judge) return null;

  const {
    solution_1_score,
    solution_2_score,
    solution_1_reasoning,
    solution_2_reasoning,
  } = judge;

  const parseReasoning = (text) => {
    return text
      .split('.')
      .map((s) => s.trim())
      .filter((s) => s.length > 5);
  };

  const reasoning1 = parseReasoning(solution_1_reasoning);
  const reasoning2 = parseReasoning(solution_2_reasoning);

  const ReasoningList = ({ points }) => (
    <ul className="flex flex-col gap-2.5 mt-2">
      {points.map((point, idx) => {
        const isNegative = /however|does not|doesn't|instead of|lacks|without|missing|limitation|fails/i.test(point);
        return (
          <li key={idx} className="flex items-start gap-2 text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">
            <span className={`material-symbols-outlined text-[16px] mt-0.5 shrink-0 ${isNegative ? 'text-red-500 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'}`}>
              {isNegative ? 'remove' : 'add'}
            </span>
            <span>{point}.</span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="w-full bg-gray-50 dark:bg-[#030712] border-t border-gray-200 dark:border-gray-800 mt-4 pt-4 px-6 pb-6 rounded-b-xl transition-colors">
      <div className="flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-gray-900 dark:text-gray-100 text-lg">gavel</span>
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 tracking-wide text-sm uppercase">Judge Verdict</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Solution 1 Reasoning */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-900 dark:text-gray-100 text-[14px]">Solution Alpha</span>
            <span className="font-code text-[14px] font-bold text-gray-900 dark:text-gray-100">{solution_1_score}/10</span>
          </div>
          <ReasoningList points={reasoning1} />
        </div>

        {/* Solution 2 Reasoning */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-900 dark:text-gray-100 text-[14px]">Solution Beta</span>
            <span className="font-code text-[14px] font-bold text-gray-900 dark:text-gray-100">{solution_2_score}/10</span>
          </div>
          <ReasoningList points={reasoning2} />
        </div>
      </div>
    </div>
  );
};

export default JudgePanel;
