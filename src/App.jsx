import React from "react";
import { SiTypescript, SiReact, SiNextdotjs } from "react-icons/si";
import CodeSnippetPlayer from "./CodeSnippetsPlayer";
import { duotoneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Define styles as constants
const styles = {
  appContainer: {
    minHeight: "100vh",
    backgroundColor: "#0b0a12",
    color: "white",
    padding: "1.5rem",
  },
  heading: {
    fontSize: "2.25rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    textAlign: "center",
  },
  icon: {
    size: 24,
  },
};

const tabs = [
  {
    id: "typescript",
    label: "TypeScript",
    icon: <SiTypescript size={styles.icon.size} />,
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
    icon: <SiReact size={styles.icon.size} />,
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
    icon: <SiNextdotjs size={styles.icon.size} />,
    language: "tsx",
    code: `// Next.js example
export default function Home() {
  return <div>Welcome to Next.js!</div>;
}`,
  },
];

export default function App() {
  return (
    <div style={styles.appContainer}>
      <h1 style={styles.heading}>
        Code Snippet Player with Framer Motion & Tailwind
      </h1>
      <CodeSnippetPlayer tabs={tabs} theme={duotoneDark} autoSwitch={true} />
    </div>
  );
}
