import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Themes } from "./Themes";

// Import Fira Code font for buttons and theme selector only
import "@fontsource/fira-code/400.css";
import "@fontsource/fira-code/500.css";

const Wrapper = styled.div`
  width: 100%;
  max-width: 700px;
  height: auto;
  min-height: 400px;
  max-height: 500px;
  background-color: #09090b;
  border-radius: 5px;
  padding: 1rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 0.75rem;
    min-height: 350px;
  }

  @media (max-width: 480px) {
    min-height: 300px;
  }
`;

const TabBar = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  margin-bottom: 0.75rem;
  padding-bottom: 0.25rem;
  position: relative;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #1d262f;
    border-radius: 3px;
  }
  scrollbar-width: thin;
  scrollbar-color: #1d262f transparent;
`;

const TabButton = styled.button`
  padding: 0.4rem 0.9rem;
  border: 1px solid #3f3f46;
  border-radius: 5px;
  background: #1f1d2b;
  color: #bbbbbbff;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: "Fira Code", "JetBrains Mono", "Source Code Pro", "Monaco",
    "Consolas", monospace;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background-color: ${(props) => props.primaryColor || "#00ff99"}48;
    color: #ffffff;
    border-color: ${(props) => props.primaryColor || "#00ff99"};
  }

  ${(props) =>
    props.active &&
    `
    color: ${props.primaryColor || "#00ff99"};
    border-color: ${props.primaryColor || "#00ff99"};
  `}

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 0.3rem 0.7rem;
  }
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #3f3f46;
  min-height: 40px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const ToolbarBtns = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
  flex-wrap: wrap;
  justify-content: flex-end;
  flex-grow: 1;

  @media (max-width: 480px) {
    gap: 0.3rem;
  }
`;

const SelectContainer = styled.div`
  position: relative;
  width: 180px;
  user-select: none;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 150px;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
    margin-bottom: 0.5rem;
  }
`;

const Selected = styled.div`
  background: #1f1d2b;
  color: ${(props) => props.primaryColor || "#00ff99"};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid ${(props) => props.primaryColor || "#00ff99"};
  cursor: pointer;
  font-size: 0.875rem;
  font-family: "Fira Code", "JetBrains Mono", "Source Code Pro", "Monaco",
    "Consolas", monospace;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.4rem 0.8rem;
  }
`;

const OptionsList = styled(motion.ul)`
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0.25rem 0;
  background: #1f1d2b;
  border: 1px solid ${(props) => props.primaryColor || "#00ff99"};
  border-radius: 6px;
  list-style: none;
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #1d262f;
    border-radius: 3px;
  }
  scrollbar-width: thin;
  scrollbar-color: #1d262f transparent;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const OptionItem = styled.li`
  padding: 0.5rem 1rem;
  color: #bbbbbbff;
  cursor: pointer;
  font-family: "Fira Code", "JetBrains Mono", "Source Code Pro", "Monaco",
    "Consolas", monospace;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: ${(props) => props.primaryColor || "#00ff99"}48;
    color: #fff;
  }
`;

const ToolbarBtn = styled.button`
  background: #1f1d2b;
  color: ${(props) => props.primaryColor || "#00ff99"};
  padding: 0.45rem 0.8rem;
  border-radius: 6px;
  border: 1px solid ${(props) => props.primaryColor || "#00ff99"};
  font-size: 0.8rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
  font-family: "Fira Code", "JetBrains Mono", "Source Code Pro", "Monaco",
    "Consolas", monospace;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background-color: ${(props) => props.primaryColor || "#00ff99"}48;
    color: #ffffff;
    border-color: ${(props) => props.primaryColor || "#00ff99"};
  }

  @media (max-width: 768px) {
    padding: 0.35rem 0.7rem;
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
  }
`;

const EditorBox = styled(motion.div)`
  position: relative;
  width: 100%;
  flex-grow: 1;
  min-height: 300px;
  overflow: hidden;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.primaryColor || "#00ff99"};
    border-radius: 3px;
  width: 50%;
  margin: 0 auto;
  }

  scrollbar-width: thin;
  scrollbar-color: ${(props) => props.primaryColor || "#00ff99"} transparent;

  @media (max-width: 768px) {
    min-height: 250px;
  }

  @media (max-width: 480px) {
    min-height: 200px;
  }
`;

export default function CodeSnippetPlayer({
  tabs = [],
  autoSwitch: initialAutoSwitch = true,
  typingSpeed = 20,
  switchDelay = 2000,
  primaryColor = "#00ff99",
}) {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("codeSnippetTheme");
    return savedTheme || "duotoneDark";
  };

  const getInitialAutoSwitch = () => {
    const saved = localStorage.getItem("codeSnippetAutoSwitch");
    return saved ? saved === "true" : initialAutoSwitch;
  };

  const getInitialLineNumbers = () => {
    const saved = localStorage.getItem("codeSnippetShowLineNumbers");
    return saved ? saved === "true" : true;
  };

  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id || null);
  const [typedIndex, setTypedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [themeKey, setThemeKey] = useState(getInitialTheme());
  const [theme, setTheme] = useState(Themes[getInitialTheme()] || duotoneDark);
  const [autoSwitch, setAutoSwitch] = useState(getInitialAutoSwitch());
  const [isOpen, setIsOpen] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(
    getInitialLineNumbers()
  );

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  useEffect(() => setTypedIndex(0), [activeTab]);

  useEffect(() => {
    if (!activeTab || !isPlaying) return;
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
    isPlaying,
  ]);

  const detectLanguage = (tabId, language) => {
    if (language) return language;
    const map = {
      sql: ["sql", "postgresql", "dbms"],
      ts: ["typescript"],
      tsx: ["react", "next"],
      js: ["javascript", "express"],
      bash: ["cli"],
      json: ["json"],
    };
    const lowerId = tabId.toLowerCase();
    for (const [lang, keys] of Object.entries(map)) {
      if (keys.some((k) => lowerId.includes(k))) return lang;
    }
    return "javascript";
  };

  const handleCopy = () => {
    if (!activeTab) return;
    navigator.clipboard.writeText(activeTab.code);
  };

  const handleThemeSelect = (key) => {
    setThemeKey(key);
    setTheme(Themes[key] || duotoneDark);
    setIsOpen(false);
    localStorage.setItem("codeSnippetTheme", key);
  };

  const toggleAutoSwitch = () => {
    const newValue = !autoSwitch;
    setAutoSwitch(newValue);
    localStorage.setItem("codeSnippetAutoSwitch", newValue.toString());
  };

  const toggleLineNumbers = () => {
    const newValue = !showLineNumbers;
    setShowLineNumbers(newValue);
    localStorage.setItem("codeSnippetShowLineNumbers", newValue.toString());
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  if (!activeTab)
    return (
      <div style={{ textAlign: "center", color: "#999" }}>No tabs provided</div>
    );

  return (
    <Wrapper>
      <TabBar>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            active={activeTabId === tab.id}
            primaryColor={primaryColor}
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            {tab.label}
          </TabButton>
        ))}
      </TabBar>

      <Toolbar>
        <SelectContainer>
          <Selected
            onClick={() => setIsOpen(!isOpen)}
            primaryColor={primaryColor}
          >
            {themeKey}
          </Selected>
          <AnimatePresence>
            {isOpen && (
              <OptionsList
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                primaryColor={primaryColor}
              >
                {Object.keys(Themes).map((key) => (
                  <OptionItem
                    key={key}
                    onClick={() => handleThemeSelect(key)}
                    primaryColor={primaryColor}
                  >
                    {key}
                  </OptionItem>
                ))}
              </OptionsList>
            )}
          </AnimatePresence>
        </SelectContainer>

        <ToolbarBtns>
          <ToolbarBtn onClick={handleCopy} primaryColor={primaryColor}>
            Copy
          </ToolbarBtn>
          <ToolbarBtn onClick={togglePlayPause} primaryColor={primaryColor}>
            {isPlaying ? "Pause" : "Play"}
          </ToolbarBtn>
          <ToolbarBtn onClick={toggleAutoSwitch} primaryColor={primaryColor}>
            {autoSwitch ? "Auto: ON" : "Auto: OFF"}
          </ToolbarBtn>
          <ToolbarBtn onClick={toggleLineNumbers} primaryColor={primaryColor}>
            {showLineNumbers ? "Hide #" : "Show #"}
          </ToolbarBtn>
        </ToolbarBtns>
      </Toolbar>

      <AnimatePresence mode="wait">
        <EditorBox
          key={activeTabId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          primaryColor={primaryColor}
        >
          <SyntaxHighlighter
            language={detectLanguage(activeTab.id, activeTab.language)}
            style={theme}
            showLineNumbers={showLineNumbers}
            wrapLines={true}
            wrapLongLines={true}
            customStyle={{
              height: "100%",
              overflow: "auto",
              padding: "1rem",
              fontSize: "0.8rem",
              backgroundColor: "#09090b",
              margin: 0,
            }}
            lineNumberStyle={{ color: "#555", minWidth: "2.5em" }}
          >
            {activeTab.code.slice(0, typedIndex)}
          </SyntaxHighlighter>
        </EditorBox>
      </AnimatePresence>
    </Wrapper>
  );
}