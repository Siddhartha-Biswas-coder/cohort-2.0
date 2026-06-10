import { Brain, Search } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setMode } from "../../chat.slice";

const InputModes = () => {
  const mode = useSelector((state) => state.chat.mode);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center rounded-full border border-zinc-200 dark:border-white/5 bg-zinc-200/50 dark:bg-white/2 p-1">
      <button
        onClick={() => dispatch(setMode("search"))}
        type="button"
        className="relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium cursor-pointer"
      >
        {mode === "search" && (
          <motion.div
            layoutId="mode-indicator"
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35,
            }}
            whileTap={{ scale: 0.95 }}
            className="absolute inset-0 rounded-full border border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/10"
          />
        )}
        <Search
          size={15}
          className={`relative z-10 ${mode === "search" ? "text-indigo-600 dark:text-indigo-300" : "text-zinc-500 dark:text-white/60"}`}
        />
        <span
          className={`relative z-10 ${mode === "search" ? "text-indigo-600 dark:text-indigo-300" : "text-zinc-500 dark:text-white/60"}`}
        >
          Search
        </span>
      </button>

      <button
        onClick={() => dispatch(setMode("research"))}
        type="button"
        className="relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium cursor-pointer"
      >
        {mode === "research" && (
          <motion.div
            layoutId="mode-indicator"
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35,
            }}
            whileTap={{ scale: 0.95 }}
            className="absolute inset-0 rounded-full border border-violet-500/20 bg-violet-50 dark:bg-violet-500/10"
          />
        )}
        <Brain
          size={16}
          className={`relative z-10 ${mode === "research" ? "text-violet-600 dark:text-violet-300" : "text-zinc-500 dark:text-white/60"}`}
        />
        <span
          className={`relative z-10 ${mode === "research" ? "text-violet-600 dark:text-violet-300" : "text-zinc-500 dark:text-white/60"}`}
        >
          Research
        </span>
      </button>
    </div>
  );
};

export default InputModes;
