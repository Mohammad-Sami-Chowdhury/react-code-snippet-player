# ✨ React Code Snippet Player

A beautiful, animated React component to display code snippets with elegant tabs, typing effects, and syntax highlighting. Powered by [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) and [framer-motion](https://www.framer.com/motion/), with Tailwind CSS styling for a modern developer experience.

## 🌟 Features

- 🎨 **Animated tab switching** with smooth transitions using Framer Motion
- ⌨️ **Typing animation** to reveal code snippets gradually
- 🌈 **Syntax highlighting** with customizable themes
- 🏷️ **User-defined tabs** with icons and custom code snippets
- 📱 **Fully responsive** design with Tailwind CSS classes
- ⏱️ **Auto-switching tabs** option (configurable)
- 🎨 **Customizable** appearance to match your project's style

## 🚀 Installation

````bash
npm install react-code-snippet-player
# or
yarn add react-code-snippet-player

````

## Peer Dependencies

- **You need to install**

````bash
npm install react react-dom framer-motion react-syntax-highlighter react-icons tailwindcss

````

## 🧑‍💻 Basic Usage

````jsx

import React from "react";
import CodeSnippetPlayer from "react-code-snippet-player";
import { duotoneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { SiReact, SiJavascript } from "react-icons/si";

const tabs = [
  {
    id: "react",
    label: "React",
    icon: <SiReact className="text-blue-500" />,
    language: "jsx",
    code: `function Hello() {
  return <h1>Hello World</h1>;
}`,
  },
  {
    id: "js",
    label: "JavaScript",
    icon: <SiJavascript className="text-yellow-500" />,
    language: "javascript",
    code: `console.log("Hello World");`,
  },
];

export default function App() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <CodeSnippetPlayer
        tabs={tabs}
        theme={duotoneDark}
        autoSwitch={true}
        typingSpeed={50}
      />
    </div>
  );
}

````

## Props

Prop	       Type	         Default	    Description

tabs	       Array	     Required	    Array of tab objects
theme	       Object	     duotoneDark	Syntax highlighting theme
autoSwitch	   Boolean       false	        Enable automatic tab switching
typingSpeed	   Number	     30	            Typing animation speed (ms)
switchDelay	   Number	     10000	        Delay between auto-switches (ms)
className	   String	     ""	            Additional CSS classes

## 🎨 Customization

````jsx
import { atomDark, dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

<CodeSnippetPlayer 
  tabs={tabs} 
  theme={dracula} 
/>

````

## Custom Styling

````jsx
<div className="bg-gray-900 rounded-xl p-2 shadow-2xl">
  <CodeSnippetPlayer tabs={tabs} />
</div>

````

## 📄 License

MIT © Mohammad Sami Chowdhury


