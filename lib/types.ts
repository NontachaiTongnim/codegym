// Core data model for the question bank.
// Code, pseudo code and SQL inside questions always stay in English.
// Natural language (prompt / explanation / prose choices) can be bilingual.

export type Lang = "th" | "en";

/** Plain string = language neutral (numbers, code, values). Object = bilingual prose. */
export type Text = string | { th: string; en: string };

export type QuestionType =
  | "code-trace"
  | "pseudo-code"
  | "number-sequence"
  | "table-debug"
  | "sql-logic"
  | "brain-teaser"
  | "angular"
  | "react-nextjs";

export type Difficulty = "easy" | "medium" | "hard";

export type CodeLanguage =
  | "javascript"
  | "python"
  | "java"
  | "sql"
  | "pseudo";

/** How the user answers, and how the answer is validated. */
export type AnswerSpec =
  | { kind: "choice"; choices: Text[]; correctIndex: number }
  | { kind: "text"; accepted: string[]; placeholder?: Text }
  /** Pick the wrong cell in a table, then type the correct value. */
  | { kind: "cell"; cellId: string; correctValue: string };

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  difficulty: Difficulty;
  prompt: Text;
  explanation: Text;
  answer: AnswerSpec;
}

export interface CodeTraceQuestion extends BaseQuestion {
  type: "code-trace";
  language: CodeLanguage;
  code: string;
  /** Optional given input, shown above the code. */
  input?: string;
}

export interface PseudoCodeQuestion extends BaseQuestion {
  type: "pseudo-code";
  code: string;
  input?: string;
}

export interface NumberSequenceQuestion extends BaseQuestion {
  type: "number-sequence";
  /** Use null for the blank slots. */
  sequence: (number | null)[];
}

export interface QuestionTable {
  caption?: Text;
  headers: Text[];
  /** rows[r][c]; cell id used by the answer is `r{r}c{c}` (0-based). */
  rows: string[][];
}

export interface TableDebugQuestion extends BaseQuestion {
  type: "table-debug";
  /** Code or logic the table should agree with. */
  code: string;
  language: CodeLanguage;
  table: QuestionTable;
}

export interface SqlTable {
  name: string;
  columns: string[];
  rows: string[][];
}

export interface SqlLogicQuestion extends BaseQuestion {
  type: "sql-logic";
  schema: SqlTable[];
  query: string;
}

export interface BrainTeaserQuestion extends BaseQuestion {
  type: "brain-teaser";
  /** Optional snippet for "why does this loop forever" style questions. */
  code?: string;
  language?: CodeLanguage;
}

export interface AngularQuestion extends BaseQuestion {
  type: "angular";
  code?: string;
  language?: CodeLanguage;
}

export interface ReactNextjsQuestion extends BaseQuestion {
  type: "react-nextjs";
  code?: string;
  language?: CodeLanguage;
}

export type Question =
  | CodeTraceQuestion
  | PseudoCodeQuestion
  | NumberSequenceQuestion
  | TableDebugQuestion
  | SqlLogicQuestion
  | BrainTeaserQuestion
  | AngularQuestion
  | ReactNextjsQuestion;

/** A user answer while the exam is running. */
export type UserAnswer =
  | { kind: "choice"; index: number }
  | { kind: "text"; value: string }
  | { kind: "cell"; cellId: string | null; value: string };

export interface ExamSession {
  id: string;
  difficulty: Difficulty;
  questionIds: string[];
  answers: Record<string, UserAnswer>;
  startedAt: number;
  /** Seconds allowed for the whole set. */
  durationSec: number;
  submittedAt?: number;
  autoSubmitted?: boolean;
}

export interface QuestionResult {
  questionId: string;
  type: QuestionType;
  correct: boolean;
  answered: boolean;
}

export interface ExamResult {
  sessionId: string;
  difficulty: Difficulty;
  total: number;
  correct: number;
  wrong: number;
  skipped: number;
  timeUsedSec: number;
  autoSubmitted: boolean;
  finishedAt: number;
  perQuestion: QuestionResult[];
  /** Kept so the review screen can show what the user actually answered. */
  answers: Record<string, UserAnswer>;
}

export interface HistoryEntry {
  id: string;
  difficulty: Difficulty;
  total: number;
  correct: number;
  timeUsedSec: number;
  finishedAt: number;
  autoSubmitted: boolean;
}
