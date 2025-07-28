import React from "react";
import { SiTypescript, SiReact, SiNextdotjs } from "react-icons/si";
import CodeSnippetPlayer from "./CodeSnippetsPlayer";
import { duotoneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const tabs = [
  {
    id: "typescript",
    label: "TypeScript",
    icon: <SiTypescript size={24} />,
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
    icon: <SiReact size={24} />,
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
    icon: <SiNextdotjs size={24} />,
    language: "tsx",
    code: `// Next.js example
export default function Home() {
  return <div>Welcome to Next.js!</div>;
}`,
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0a12] text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Code Snippet Player with Framer Motion & Tailwind
      </h1>
      <CodeSnippetPlayer tabs={tabs} theme={duotoneDark} autoSwitch={true} />
    </div>
  );
}
