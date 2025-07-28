"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneSea } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeSnippetPlayer({ tabs, theme, autoSwitch = false }) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id || null);
  const [typedIndex, setTypedIndex] = useState(0);

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  useEffect(() => {
    setTypedIndex(0);
  }, [activeTab]);

  useEffect(() => {
    if (!activeTab) return;

    if (typedIndex < activeTab.code.length) {
      const timeout = setTimeout(() => setTypedIndex(typedIndex + 1), 30);
      return () => clearTimeout(timeout);
    }
  }, [typedIndex, activeTab]);

  // 🔁 Auto-switch tabs
  useEffect(() => {
    if (!autoSwitch || tabs.length <= 1) return;

    const interval = setInterval(() => {
      setActiveTabId((prevId) => {
        const currentIndex = tabs.findIndex((tab) => tab.id === prevId);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [autoSwitch, tabs]);

  if (!activeTab) return <div>No tabs provided</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Tabs */}
      <div className="flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-[#2f3f4e] scrollbar-track-[#1f1d2b] pb-3">
        {tabs.map(({ id, label, icon }) => (
          <motion.button
            key={id}
            onClick={() => setActiveTabId(id)}
            animate={{
              borderColor: activeTabId === id ? "#00FF99" : "transparent",
              boxShadow:
                activeTabId === id
                  ? "0 0 12px 3px rgba(0, 255, 153, 0.7)"
                  : "none",
              color: activeTabId === id ? "#00FF99" : "#bbb",
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md border-2 font-medium cursor-pointer select-none
              ${
                activeTabId === id
                  ? "bg-[#00221133] text-white"
                  : "bg-[#1f1d2b] hover:bg-[#003322] hover:text-white"
              }`}
          >
            <span className="text-xl">{icon}</span>
            <span className="hidden sm:inline">{label}</span>
          </motion.button>
        ))}
      </div>

      {/* Code Snippet */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTabId}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
          className="bg-[#13111c] rounded-xl p-5 shadow-lg border border-[#00FF99]"
          style={{ maxHeight: "600px", overflowY: "auto" }}
        >
          <SyntaxHighlighter
            language={activeTab.language || "jsx"}
            style={theme || duotoneSea}
            showLineNumbers
            wrapLines
            wrapLongLines
            customStyle={{
              fontSize: "1rem",
              lineHeight: "1.6",
              margin: 0,
              background: "transparent",
              minHeight: "500px",
            }}
          >
            {activeTab.code.slice(0, typedIndex)}
          </SyntaxHighlighter>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
