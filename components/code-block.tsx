"use client";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useSettings } from "@/lib/settings";
import type { CodeLanguage } from "@/lib/types";
import { SectionLabel } from "./ui";

SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("sql", sql);

const labels: Record<CodeLanguage, string> = {
  javascript: "JavaScript",
  python: "Python",
  java: "Java",
  sql: "SQL",
  pseudo: "Pseudo code",
};

export function CodeBlock({
  code,
  language = "pseudo",
  label,
}: {
  code: string;
  language?: CodeLanguage;
  label?: string;
}) {
  const { theme } = useSettings();
  const isPlain = language === "pseudo";

  return (
    <div className="overflow-hidden rounded-xl border border-border-subtle bg-surface-muted">
      <div className="flex items-center justify-between border-b border-border-subtle px-4 py-2">
        <SectionLabel>{label ?? labels[language]}</SectionLabel>
      </div>
      {isPlain ? (
        <pre className="overflow-x-auto px-4 py-3.5 text-[13px] leading-6 text-fg">
          {code}
        </pre>
      ) : (
        <SyntaxHighlighter
          language={language}
          style={theme === "dark" ? oneDark : oneLight}
          customStyle={{
            margin: 0,
            padding: "14px 16px",
            background: "transparent",
            fontSize: "13px",
            lineHeight: "1.6",
          }}
          codeTagProps={{ style: { fontFamily: "var(--font-mono)" } }}
        >
          {code}
        </SyntaxHighlighter>
      )}
    </div>
  );
}
