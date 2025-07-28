import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const styles = {
  mainContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
    backgroundColor: "#0a0a0a",
    fontFamily: "'Fira Code', monospace, sans-serif",
  },
  wrapper: {
    width: "100%",
    maxWidth: "900px",
  },
  codeEditorContainer: {
    backgroundColor: "#111",
    borderRadius: "12px",
    width: "100%",
    padding: "0",
    margin: "0 auto",
    border: "1px solid #333",
    boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.5)",
    overflow: "hidden",
  },
  innerContainer: {
    width: "100%",
    padding: "0",
    backgroundColor: "#1a1a1a",
  },
  tabsWrapper: {
    padding: "0.5rem 1rem",
    backgroundColor: "#111",
    borderBottom: "1px solid #222",
    position: "relative",
    overflow: "hidden",
  },
  tabsContainer: {
    display: "flex",
    gap: "0.5rem",
    overflowX: "auto",
    whiteSpace: "nowrap",
    scrollbarWidth: "thin",
    scrollbarColor: "#444 transparent",
    paddingBottom: "4px",
  },
  tabButton: {
    padding: "0.5rem 1rem",
    fontSize: "0.85rem",
    borderRadius: "6px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    userSelect: "none",
    backgroundColor: "#252525",
    border: "none",
    color: "#aaa",
    transition: "all 0.2s ease",
    minWidth: "fit-content",
    flexShrink: 0,
  },
  tabButtonActive: {
    backgroundColor: "#3a3a3a",
    color: "#00ffaa",
  },
  tabIcon: {
    fontSize: "1rem",
  },
  tabLabel: {
    display: "inline",
  },
  codeDisplayContainer: {
    position: "relative",
  },
  scrollShadow: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "30px",
    background: "linear-gradient(90deg, transparent, #111)",
    pointerEvents: "none",
  },
};

const detectLanguage = (tabId, language) => {
  if (language) return language;

  const languageMap = {
    sql: ["sql", "postgresql", "dbms", "database"],
    typescript: ["typescript", "ts"],
    tsx: ["nextjs", "next.js", "react"],
    javascript: ["javascript", "js", "express", "redux"],
    dockerfile: ["docker"],
    bash: ["aws", "cli"],
    json: ["json"],
  };

  const lowerId = tabId.toLowerCase();
  for (const [lang, keywords] of Object.entries(languageMap)) {
    if (keywords.some((keyword) => lowerId.includes(keyword))) {
      return lang === "typescript" ? "ts" : lang === "tsx" ? "tsx" : lang;
    }
  }

  return "javascript";
};

export default function CodeSnippetPlayer({
  tabs = [],
  theme = duotoneDark,
  autoSwitch = true,
  typingSpeed = 20,
  switchDelay = 2000,
  showLineNumbers = true,
}) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id || null);
  const [typedIndex, setTypedIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1024);
  const [showScrollShadow, setShowScrollShadow] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  useEffect(() => {
    setTypedIndex(0);
  }, [activeTab]);

  useEffect(() => {
    if (!activeTab) return;

    if (typedIndex < activeTab.code.length) {
      const timeout = setTimeout(
        () => setTypedIndex(typedIndex + 1),
        typingSpeed
      );
      return () => clearTimeout(timeout);
    } else if (autoSwitch && tabs.length > 1) {
      const timeout = setTimeout(() => {
        const currentIndex = tabs.findIndex((tab) => tab.id === activeTabId);
        const nextIndex = (currentIndex + 1) % tabs.length;
        setActiveTabId(tabs[nextIndex].id);
      }, switchDelay);
      return () => clearTimeout(timeout);
    }
  }, [
    typedIndex,
    activeTab,
    autoSwitch,
    tabs,
    activeTabId,
    switchDelay,
    typingSpeed,
  ]);

  const getResponsiveStyle = () => {
    const isMobile = windowWidth < 640;
    const isTablet = windowWidth < 1024;

    return {
      padding: isMobile ? "1rem" : "1.5rem",
      fontSize: isMobile ? "0.8rem" : "0.9rem",
      height: isMobile ? "300px" : "400px",
      margin: 0,
      overflow: "auto",
      backgroundColor: "#1a1a1a",
    };
  };

  const getResponsiveStyles = () => {
    const isMobile = windowWidth < 640;

    return {
      tabButton: {
        ...styles.tabButton,
        padding: isMobile ? "0.4rem 0.8rem" : "0.5rem 1rem",
        fontSize: isMobile ? "0.75rem" : "0.85rem",
      },
      tabIcon: {
        ...styles.tabIcon,
        fontSize: isMobile ? "0.9rem" : "1rem",
      },
    };
  };

  const responsiveStyles = getResponsiveStyles();

  if (!activeTab) return <div>No tabs provided</div>;

  return (
    <div style={styles.mainContainer}>
      <div style={styles.wrapper}>
        <motion.div
          style={styles.codeEditorContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={styles.innerContainer}>
            <div style={styles.tabsWrapper}>
              <div
                style={styles.tabsContainer}
                ref={(el) => {
                  if (el) {
                    setShowScrollShadow(el.scrollWidth > el.clientWidth);
                  }
                }}
              >
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    style={{
                      ...styles.tabButton,
                      ...responsiveStyles.tabButton,
                      ...(activeTabId === tab.id && styles.tabButtonActive),
                    }}
                    whileHover={{
                      backgroundColor: "#333",
                      color: "#00ffaa",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span style={responsiveStyles.tabIcon}>{tab.icon}</span>
                    <span style={styles.tabLabel}>{tab.label}</span>
                  </motion.button>
                ))}
              </div>
              {showScrollShadow && <div style={styles.scrollShadow} />}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTabId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={styles.codeDisplayContainer}
              >
                <SyntaxHighlighter
                  language={detectLanguage(activeTab.id, activeTab.language)}
                  style={theme}
                  customStyle={getResponsiveStyle()}
                  showLineNumbers={showLineNumbers}
                  wrapLines={true}
                  wrapLongLines={true}
                  lineNumberStyle={{ color: "#555", minWidth: "2.5em" }}
                >
                  {activeTab.code.slice(0, typedIndex)}
                </SyntaxHighlighter>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
