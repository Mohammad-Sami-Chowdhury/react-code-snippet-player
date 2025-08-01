import React from "react";
import { SiTypescript, SiReact, SiNextdotjs } from "react-icons/si";
import CodeSnippetPlayer from "./CodeSnippetsPlayer";
import { Themes } from "./Themes";

const tabs = [
  {
    id: "typescript",
    label: "TypeScript",
    icon: <SiTypescript />,
    language: "ts",
    code: `// TypeScript example
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
console.log(greet("Sami"));`,
  },
  {
    id: "react",
    label: "React",
    icon: <SiReact />,
    language: "jsx",
    code: `// React example
import React from "react";

export default function Hello() {
  return <h1>Hello React!</h1>;
}`,
  },
  {
    id: "nextjs",
    label: "Next.js",
    icon: <SiNextdotjs />,
    language: "tsx",
    code: `// Next.js example
export default function Home() {
  return <div>Welcome to Next.js!</div>;
}`,
  },
];

export default function App() {
  return (
    <div>
      <CodeSnippetPlayer tabs={tabs} switchDelay={3000} typingSpeed={10} />
    </div>
  );
}
