# ✨ React Code Snippet Player

A beautiful, animated React component to display code snippets with elegant tabs, typing effects, and syntax highlighting. Powered by [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) and [framer-motion](https://www.framer.com/motion/), with Tailwind CSS styling for a modern developer experience.

## Demo

[Demo](https://codesandbox.io/p/sandbox/9tj38q?file=%2Fpackage.json%3A54%2C2)

## 🌟 Features

- 🎨 **Animated tab switching** with smooth transitions using Framer Motion
- ⌨️ **Typing animation** to reveal code snippets gradually
- 🌈 **Syntax highlighting** with customizable themes
- 🏷️ **User-defined tabs** with icons and custom code snippets
- 📱 **Fully responsive** design with Tailwind CSS classes
- ⏱️ **Auto-switching tabs** option (configurable)
- 🎨 **Customizable** appearance to match your project's style

## 🚀 Installation

```bash
npm install react-code-snippet-player
# or
yarn add react-code-snippet-player

```

## Peer Dependencies

- **You need to install**

```bash
npm install react react-dom framer-motion react-syntax-highlighter react-icons

```

## 🧑‍💻 Basic Usage

```jsx
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
```

## Props

**tabs**
Type: Array
Default: Required
Description: Array of tab objects

**theme**
Type: Object
Default: duotoneDark
Description: Syntax highlighting theme

**autoSwitch**
Type: Boolean
Default: false
Description: Enable automatic tab switching

**typingSpeed**
Type: Number
Default: 30
Description: Typing animation speed in milliseconds

**switchDelay**
Type: Number
Default: 10000
Description: Delay between auto-switches in milliseconds

**className**
Type: String
Default: ""
Description: Additional CSS classes

## 🎨 Customization

```jsx
import {
  atomDark,
  dracula,
} from "react-syntax-highlighter/dist/esm/styles/prism";

<CodeSnippetPlayer tabs={tabs} theme={dracula} />;
```

## Custom Styling

```jsx
<div className="bg-gray-900 rounded-xl p-2 shadow-2xl">
  <CodeSnippetPlayer tabs={tabs} />
</div>
```

## 📄 License

MIT License

Copyright (c) 2025 Mohammad Sami Chowdhury

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in  
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN  
THE SOFTWARE.
