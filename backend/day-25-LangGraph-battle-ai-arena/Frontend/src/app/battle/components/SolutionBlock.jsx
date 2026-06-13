import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';

const SolutionBlock = ({ title, solution, isWinner }) => {
  return (
    <div className={`flex flex-col bg-white dark:bg-[#030712] border ${isWinner ? 'border-gray-300 dark:border-gray-500 ring-1 ring-gray-100 dark:ring-gray-700' : 'border-gray-200 dark:border-gray-800'} rounded-xl overflow-hidden transition-all duration-300`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="flex items-center gap-2.5">
          <div className={`w-6 h-6 rounded-md flex items-center justify-center ${isWinner ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>
            <span className="material-symbols-outlined text-[14px]">psychology</span>
          </div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-[15px] tracking-tight">{title}</h4>
        </div>
        {isWinner && (
          <span className="px-2 py-0.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-code text-[10px] rounded uppercase tracking-wider font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">verified</span>
            Winner
          </span>
        )}
      </div>
      <div className="p-4 grow overflow-y-auto max-h-125">
        <MarkdownRenderer text={solution} />
      </div>
    </div>
  );
};

export default SolutionBlock;
