import { Brain, Search } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setMode } from "../../chat.slice";

const InputModes = () => {
  const mode = useSelector((state) => state.chat.mode);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center rounded-full border border-white/10 bg-white/2 p-1">
      <button
        onClick={() => dispatch(setMode("search"))}
        type="button"
        className="relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
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
            className="absolute inset-0 rounded-full border border-cyan-500/20 bg-cyan-500/10"
          />
        )}
        <Search
          size={15}
          className={`relative z-10 ${mode === "search" ? "text-cyan-300" : "text-white/60"}`}
        />
        <span
          className={`relative z-10 ${mode === "search" ? "text-cyan-300" : "text-white/60"}`}
        >
          Search
        </span>
      </button>

      <button
        onClick={() => dispatch(setMode("research"))}
        type="button"
        className="relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
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
            className="absolute inset-0 rounded-full border border-cyan-500/20 bg-cyan-500/10"
          />
        )}
        <Brain
          size={16}
          className={`relative z-10 ${mode === "research" ? "text-cyan-300" : "text-white/60"}`}
        />
        <span
          className={`relative z-10 ${mode === "research" ? "text-cyan-300" : "text-white/60"}`}
        >
          Research
        </span>
      </button>
    </div>
  );
};

export default InputModes;
