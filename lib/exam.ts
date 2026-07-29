import { QUESTIONS_PER_EXAM, QUESTION_TYPES, timeLimitSec } from "./config";
import { getQuestions, questionById } from "./questions";
import type {
  AnswerSpec,
  Difficulty,
  ExamResult,
  ExamSession,
  Question,
  QuestionResult,
  UserAnswer,
} from "./types";

function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Stratified sampling: take an even share from each of the 6 types, then shuffle
 * the order so types are interleaved. If a type runs short, the remaining slots
 * are back-filled from the other types so an exam always reaches its size.
 */
export function pickQuestions(
  difficulty: Difficulty,
  size = QUESTIONS_PER_EXAM
): Question[] {
  const perType = Math.floor(size / QUESTION_TYPES.length);
  const picked: Question[] = [];
  const leftovers: Question[] = [];

  for (const type of QUESTION_TYPES) {
    const pool = shuffle(getQuestions(difficulty, type));
    picked.push(...pool.slice(0, perType));
    leftovers.push(...pool.slice(perType));
  }

  const filler = shuffle(leftovers);
  while (picked.length < size && filler.length > 0) {
    picked.push(filler.pop()!);
  }

  return shuffle(picked);
}

export function createSession(difficulty: Difficulty): ExamSession {
  const questions = pickQuestions(difficulty);
  return {
    id: `${difficulty}-${Date.now()}`,
    difficulty,
    questionIds: questions.map((q) => q.id),
    answers: {},
    startedAt: Date.now(),
    durationSec: timeLimitSec(difficulty),
  };
}

export function remainingSec(session: ExamSession, now = Date.now()) {
  const elapsed = Math.floor((now - session.startedAt) / 1000);
  return Math.max(0, session.durationSec - elapsed);
}

export function isAnswered(answer: UserAnswer | undefined): boolean {
  if (!answer) return false;
  if (answer.kind === "choice") return answer.index >= 0;
  if (answer.kind === "text") return answer.value.trim().length > 0;
  return Boolean(answer.cellId) && answer.value.trim().length > 0;
}

/** Loose text comparison: case, spacing and trailing punctuation insensitive. */
function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.\u0e2f]+$/g, "")
    .trim();
}

/** Comma / space separated number lists compare element by element. */
function normalizeList(value: string) {
  return normalize(value)
    .split(/[,\s]+/)
    .filter(Boolean)
    .join(",");
}

export function isCorrect(
  spec: AnswerSpec,
  answer: UserAnswer | undefined
): boolean {
  if (!isAnswered(answer) || !answer) return false;
  switch (spec.kind) {
    case "choice":
      return answer.kind === "choice" && answer.index === spec.correctIndex;
    case "text": {
      if (answer.kind !== "text") return false;
      const given = normalize(answer.value);
      const givenList = normalizeList(answer.value);
      return spec.accepted.some(
        (a) => normalize(a) === given || normalizeList(a) === givenList
      );
    }
    case "cell":
      return (
        answer.kind === "cell" &&
        answer.cellId === spec.cellId &&
        normalize(answer.value) === normalize(spec.correctValue)
      );
  }
}

export function gradeSession(session: ExamSession): ExamResult {
  const perQuestion: QuestionResult[] = session.questionIds.map((id) => {
    const question = questionById(id);
    const answer = session.answers[id];
    const answered = isAnswered(answer);
    return {
      questionId: id,
      type: question?.type ?? "code-trace",
      answered,
      correct: question ? isCorrect(question.answer, answer) : false,
    };
  });

  const correct = perQuestion.filter((r) => r.correct).length;
  const skipped = perQuestion.filter((r) => !r.answered).length;
  const finishedAt = session.submittedAt ?? Date.now();

  return {
    sessionId: session.id,
    difficulty: session.difficulty,
    total: perQuestion.length,
    correct,
    wrong: perQuestion.length - correct - skipped,
    skipped,
    timeUsedSec: Math.min(
      session.durationSec,
      Math.max(0, Math.floor((finishedAt - session.startedAt) / 1000))
    ),
    autoSubmitted: Boolean(session.autoSubmitted),
    finishedAt,
    perQuestion,
    answers: session.answers,
  };
}

export function formatClock(totalSec: number) {
  const s = Math.max(0, Math.floor(totalSec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}
