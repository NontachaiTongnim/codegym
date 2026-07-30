import type { Difficulty, Question, QuestionType } from "../types";
import { codeTraceQuestions } from "./code-trace";
import { pseudoCodeQuestions } from "./pseudo-code";
import { numberSequenceQuestions } from "./number-sequence";
import { tableDebugQuestions } from "./table-debug";
import { sqlLogicQuestions } from "./sql-logic";
import { brainTeaserQuestions } from "./brain-teaser";
import { angularQuestions } from "./angular";
import { reactNextjsQuestions } from "./react-nextjs";

export const allQuestions: Question[] = [
  ...codeTraceQuestions,
  ...pseudoCodeQuestions,
  ...numberSequenceQuestions,
  ...tableDebugQuestions,
  ...sqlLogicQuestions,
  ...brainTeaserQuestions,
  ...angularQuestions,
  ...reactNextjsQuestions,
];

const byId = new Map(allQuestions.map((q) => [q.id, q]));

export const questionById = (id: string) => byId.get(id);

export function getQuestions(
  difficulty: Difficulty,
  type?: QuestionType
): Question[] {
  return allQuestions.filter(
    (q) => q.difficulty === difficulty && (!type || q.type === type)
  );
}

export function bankSize(difficulty: Difficulty) {
  return getQuestions(difficulty).length;
}

export function bankBreakdown(difficulty: Difficulty) {
  const counts = new Map<QuestionType, number>();
  for (const q of getQuestions(difficulty)) {
    counts.set(q.type, (counts.get(q.type) ?? 0) + 1);
  }
  return counts;
}
