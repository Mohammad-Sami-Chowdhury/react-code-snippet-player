import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneSea } from "react-syntax-highlighter/dist/esm/styles/prism";

// CSS styles organized as constants
const styles = {
  container: {
    maxWidth: "84rem",
    margin: "0 auto",
    padding: "1rem",
  },
  tabsContainer: {
    display: "flex",
    gap: "0.75rem",
    overflowX: "auto",
    whiteSpace: "nowrap",
    paddingBottom: "0.75rem",
    scrollbarWidth: "thin",
    scrollbarColor: "#2f3f4e #1f1d2b",
  },
  tabButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    borderWidth: "2px",
    borderStyle: "solid",
    fontWeight: "500",
    cursor: "pointer",
    userSelect: "none",
  },
  activeTab: {
    backgroundColor: "rgba(0, 34, 17, 0.2)",
    color: "white",
  },
  inactiveTab: {
    backgroundColor: "#1f1d2b",
    color: "#bbb",
  },
  hoverTab: {
    backgroundColor: "#003322",
    color: "white",
  },
  codeContainer: {
    backgroundColor: "#13111c",
    borderRadius: "0.75rem",
    padding: "1.25rem",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: "1px solid #00FF99",
    maxHeight: "600px",
    overflowY: "auto",
  },
};

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

  // Auto-switch tabs
  useEffect(() => {
    if (!autoSwitch || tabs.length <= 1) return;

    const interval = setInterval(() => {
      setActiveTabId((prevId) => {
        const currentIndex = tabs.findIndex((tab) => tab.id === prevId);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [autoSwitch, tabs]);

  if (!activeTab) return <div>No tabs provided</div>;

  return (
    <div style={styles.container}>
      {/* Tabs */}
      <div style={styles.tabsContainer}>
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
            style={{
              ...styles.tabButton,
              ...(activeTabId === id ? styles.activeTab : styles.inactiveTab),
            }}
            whileHover={
              activeTabId !== id
                ? {
                    backgroundColor: styles.hoverTab.backgroundColor,
                    color: styles.hoverTab.color,
                  }
                : {}
            }
          >
            <span style={{ fontSize: "1.25rem" }}>{icon}</span>
            <span style={{ display: ["none", "inline"] }}>{label}</span>
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
          style={styles.codeContainer}
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
