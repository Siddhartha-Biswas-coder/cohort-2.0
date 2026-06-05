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
      className="group flex flex-col rounded-2xl border border-white/10 bg-white/2 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-white/4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-cyan-400" />
          <span className="text-sm font-medium text-white">{source.title}</span>
        </div>
        <ExternalLink
          size={14}
          className="text-white/30 transition group-hover:text-white/70"
        />
      </div>
      <p className="mt-2 text-xs text-white/50">{domain}</p>
    </a>
  );
};

export default SourceCard;
