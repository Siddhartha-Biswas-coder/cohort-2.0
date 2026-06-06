import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const SidebarLogo = ({ collapsed }) => {
  return (
    <div className="mb-6 ">
      <AnimatePresence mode="wait">
        {collapsed ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center"
          >
            <div className="text-2xl font-bold  text-white">P</div>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Perplexity
            </h1>
            <p className="mt-1 text-xs text-white/40">AI Search Engine</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarLogo;
