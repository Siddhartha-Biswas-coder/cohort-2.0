import { ExternalLink, Globe } from "lucide-react";
import React from "react";

const SourceCard = ({ source }) => {
  let domain = "";
  domain = new URL(source.url).hostname.replace("www.", "");
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100/50 dark:bg-white/2 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-500/20 dark:hover:border-indigo-500/20 hover:bg-zinc-200/55 dark:hover:bg-white/4 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-indigo-650 dark:text-indigo-400" />
          <span className="text-sm font-medium text-zinc-850 dark:text-white">{source.title}</span>
        </div>
        <ExternalLink
          size={14}
          className="text-zinc-400 dark:text-white/30 transition group-hover:text-zinc-750 dark:group-hover:text-white/70"
        />
      </div>
      <p className="mt-2 text-xs text-zinc-500 dark:text-white/50">{source.domain || domain}</p>
    </a>
  );
};

export default SourceCard;
