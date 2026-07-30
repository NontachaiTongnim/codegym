import type { Difficulty, QuestionType } from "./types";

/** Time limit per difficulty, in minutes. Tune these freely. */
export const TIME_LIMIT_MINUTES: Record<Difficulty, number> = {
  easy: 45,
  medium: 60,
  hard: 90,
};

/** Questions per exam set. Must stay a multiple of QUESTION_TYPES.length for an even split. */
export const QUESTIONS_PER_EXAM = 60;

/** Framework-specific exams: 30 questions, 30 minutes, medium difficulty only. */
export const FRAMEWORK_EXAM_SIZE = 30;
export const FRAMEWORK_TIME_MINUTES = 30;

export const QUESTION_TYPES: QuestionType[] = [
  "code-trace",
  "pseudo-code",
  "number-sequence",
  "table-debug",
  "sql-logic",
  "brain-teaser",
];

/** Framework categories available as standalone exams. */
export const FRAMEWORK_TYPES: QuestionType[] = ["angular", "react-nextjs"];

export const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export const STORAGE_KEYS = {
  theme: "codegym.theme",
  lang: "codegym.lang",
  history: "codegym.history",
  activeSession: "codegym.activeSession",
  lastResult: "codegym.lastResult",
} as const;

export const timeLimitSec = (difficulty: Difficulty) =>
  TIME_LIMIT_MINUTES[difficulty] * 60;
