import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.jsx",
      name: "ReactCodeSnippetPlayer",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "framer-motion",
        "react-syntax-highlighter",
        "react-icons",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "framer-motion": "motion",
          "react-syntax-highlighter": "SyntaxHighlighter",
          "react-icons": "ReactIcons",
        },
      },
    },
  },
});
