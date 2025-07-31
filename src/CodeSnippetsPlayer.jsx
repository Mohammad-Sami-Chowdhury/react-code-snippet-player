import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Themes } from "./Themes";
import { Resizable } from "re-resizable";

const TabBar = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  margin-bottom: 0.75rem;
  padding-bottom: 0.25rem;
  position: relative;

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
`;

const TabButton = styled.button`
  padding: 0.4rem 0.9rem;
  border: 1px solid #3f3f46;
  border-radius: 5px;
  background: #1f1d2b;
  color: #bbbbbbff;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s ease-in-out;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #00ff9948;
    color: #ffffff;
    border-color: #00ff99;
  }

  ${(props) =>
    props.active &&
    `
    color: #00FF99;
    border-color: #00FF99;
  `}
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const ToolbarBtns = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SelectContainer = styled.div`
  position: relative;
  width: 180px;
  user-select: none;
`;

const Selected = styled.div`
  background: #1f1d2b;
  color: #00ff99;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #00ff99;
  cursor: pointer;
  font-size: 0.875rem;
`;

const OptionsList = styled(motion.ul)`
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0.25rem 0;
  background: #1f1d2b;
  border: 1px solid #00ff99;
  border-radius: 6px;
  list-style: none;
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden
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
`;

const OptionItem = styled.li`
  padding: 0.5rem 1rem;
  color: #00ff99;
  cursor: pointer;

  &:hover {
    background: #00ff9948;
    color: #fff;
  }
`;

const ToolbarBtn = styled.button`
  background: #1f1d2b;
  color: #00ff99;
  padding: 0.45rem 1rem;
  border-radius: 6px;
  border: 1px solid #00ff99;
  font-size: 0.875rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background-color: #00ff9948;
    color: #ffffff;
    border-color: #00ff99;
  }
`;

const EditorResize = styled(Resizable)`
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
  font-family: "Inter", sans-serif;
  background-color: #13111c;
  border-radius: 5px;
  border: 1px solid #00ff99;
`;

const EditorBox = styled(motion.div)`
  position: relative;
  width: 100%;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #00ff99;
    border-radius: 3px;
  }

  scrollbar-width: thin;
  scrollbar-color: #00ff99 transparent;
`;

export default function CodeSnippetPlayer({
  tabs = [],
  autoSwitch: initialAutoSwitch = true,
  typingSpeed = 20,
  switchDelay = 2000,
  showLineNumbers = true,
}) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id || null);
  const [typedIndex, setTypedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [themeKey, setThemeKey] = useState("duotoneDark");
  const [theme, setTheme] = useState(duotoneDark);
  const [autoSwitch, setAutoSwitch] = useState(initialAutoSwitch);
  const [isOpen, setIsOpen] = useState(false);

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
  };

  if (!activeTab)
    return (
      <div style={{ textAlign: "center", color: "#999" }}>No tabs provided</div>
    );

  return (
    <EditorResize defaultSize={{ width: "100%", height: 400 }} minHeight={200}>
      <TabBar>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            active={activeTabId === tab.id}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </TabButton>
        ))}
      </TabBar>

      <Toolbar>
        <SelectContainer>
          <Selected onClick={() => setIsOpen(!isOpen)}>{themeKey}</Selected>
          <AnimatePresence>
            {isOpen && (
              <OptionsList
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {Object.keys(Themes).map((key) => (
                  <OptionItem key={key} onClick={() => handleThemeSelect(key)}>
                    {key}
                  </OptionItem>
                ))}
              </OptionsList>
            )}
          </AnimatePresence>
        </SelectContainer>

        <ToolbarBtns>
          <ToolbarBtn onClick={handleCopy}>Copy</ToolbarBtn>
          <ToolbarBtn onClick={() => setIsPlaying((p) => !p)}>
            {isPlaying ? "Pause" : "Play"}
          </ToolbarBtn>
          <ToolbarBtn onClick={() => setAutoSwitch((s) => !s)}>
            {autoSwitch ? "Auto-Switch: ON" : "Auto-Switch: OFF"}
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
              padding: "1.25rem",
              fontSize: "0.875rem",
              backgroundColor: "#09090b",
            }}
            lineNumberStyle={{ color: "#555" }}
          >
            {activeTab.code.slice(0, typedIndex)}
          </SyntaxHighlighter>
        </EditorBox>
      </AnimatePresence>
    </EditorResize>
  );
}
