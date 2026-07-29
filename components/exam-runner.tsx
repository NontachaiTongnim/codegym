"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useClientSnapshot } from "@/lib/client-store";
import {
  createSession,
  formatClock,
  gradeSession,
  isAnswered,
  remainingSec,
} from "@/lib/exam";
import { fill } from "@/lib/i18n";
import { questionById } from "@/lib/questions";
import { useSettings } from "@/lib/settings";
import {
  appendHistory,
  clearActiveSession,
  loadActiveSession,
  saveActiveSession,
  saveLastResult,
} from "@/lib/storage";
import type {
  Difficulty,
  ExamResult,
  ExamSession,
  UserAnswer,
} from "@/lib/types";
import { QuestionCard } from "./question-card";
import { ResultView } from "./result-view";
import { Badge, Button, Card, ProgressBar, SectionLabel, cx } from "./ui";

function parseLevel(value: string | null): Difficulty {
  return value === "medium" || value === "hard" ? value : "easy";
}

/**
 * The running set lives in localStorage, which keeps a reload or an accidental
 * navigation from losing answers. Components read it through the client store.
 */
function ensureSession(level: Difficulty, wantsResume: boolean) {
  const stored = loadActiveSession();
  const resumable =
    wantsResume &&
    stored &&
    !stored.submittedAt &&
    stored.difficulty === level &&
    remainingSec(stored) > 0;

  if (resumable) return;
  saveActiveSession(createSession(level));
}

export function ExamRunner() {
  const params = useSearchParams();
  const { t } = useSettings();

  const level = parseLevel(params.get("level"));
  const wantsResume = params.get("resume") === "1";

  const session = useClientSnapshot(loadActiveSession, undefined);
  const [current, setCurrent] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [result, setResult] = useState<ExamResult | null>(null);
  const [confirming, setConfirming] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    ensureSession(level, wantsResume);
  }, [level, wantsResume]);

  const submit = useCallback((auto: boolean) => {
    const live = loadActiveSession();
    if (!live || live.submittedAt) return;

    const submitted: ExamSession = {
      ...live,
      submittedAt: Date.now(),
      autoSubmitted: auto,
    };
    const graded = gradeSession(submitted);

    saveLastResult(graded);
    appendHistory({
      id: graded.sessionId,
      difficulty: graded.difficulty,
      total: graded.total,
      correct: graded.correct,
      timeUsedSec: graded.timeUsedSec,
      finishedAt: graded.finishedAt,
      autoSubmitted: graded.autoSubmitted,
    });
    clearActiveSession();

    setConfirming(false);
    setResult(graded);
    window.scrollTo({ top: 0 });
  }, []);

  // One ticker drives the countdown and the auto submit when time runs out.
  useEffect(() => {
    const id = window.setInterval(() => {
      const live = loadActiveSession();
      if (!live || live.submittedAt) return;
      if (remainingSec(live) <= 0) submit(true);
      else setNow(Date.now());
    }, 1000);
    return () => window.clearInterval(id);
  }, [submit]);

  const setAnswer = useCallback(
    (questionId: string, answer: UserAnswer) => {
      const live = loadActiveSession();
      if (!live || live.submittedAt) return;
      saveActiveSession({
        ...live,
        answers: { ...live.answers, [questionId]: answer },
      });
    },
    []
  );

  // Starting another set at the same level happens without a route change, so
  // the new session is created here rather than by navigating to /exam again.
  const restart = useCallback((difficulty: Difficulty) => {
    saveActiveSession(createSession(difficulty));
    setResult(null);
    setCurrent(0);
    setNow(Date.now());
    window.scrollTo({ top: 0 });
  }, []);

  const questions = useMemo(
    () =>
      (session?.questionIds ?? [])
        .map((id) => questionById(id))
        .filter((q): q is NonNullable<typeof q> => Boolean(q)),
    [session]
  );

  if (result) return <ResultView result={result} onRetry={restart} />;

  if (!session || questions.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16 text-center text-fg-muted">
        {t.exam.loading}
      </div>
    );
  }

  const total = questions.length;
  const left = remainingSec(session, now);
  const answeredCount = session.questionIds.filter((id) =>
    isAnswered(session.answers[id])
  ).length;
  const question = questions[Math.min(current, total - 1)];
  const timeTone = left <= 60 ? "danger" : left <= 300 ? "warning" : "brand";

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-5">
          <Card className="flex flex-wrap items-center justify-between gap-4 p-5">
            <div>
              <SectionLabel>{t.exam.timeLeft}</SectionLabel>
              <p
                className={cx(
                  "font-mono text-3xl font-semibold tabular-nums",
                  timeTone === "danger"
                    ? "text-danger"
                    : timeTone === "warning"
                      ? "text-warning"
                      : "text-brand"
                )}
              >
                {formatClock(left)}
              </p>
            </div>
            <div className="min-w-48 flex-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-fg-muted">{t.exam.progress}</span>
                <span className="font-semibold text-fg">
                  {answeredCount} / {total}
                </span>
              </div>
              <div className="mt-2">
                <ProgressBar value={answeredCount} max={total} />
              </div>
            </div>
            <Badge tone="brand">{t.difficulty[session.difficulty]}</Badge>
          </Card>

          <QuestionCard
            key={question.id}
            question={question}
            number={current + 1}
            total={total}
            answer={session.answers[question.id]}
            onAnswer={(answer) => setAnswer(question.id, answer)}
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrent((i) => Math.max(0, i - 1))}
                disabled={current === 0}
              >
                {t.exam.prev}
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrent((i) => Math.min(total - 1, i + 1))}
                disabled={current >= total - 1}
              >
                {t.exam.next}
              </Button>
            </div>
            <Button onClick={() => setConfirming(true)}>{t.exam.submit}</Button>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-5">
            <SectionLabel>{t.exam.navigator}</SectionLabel>
            <div className="mt-3 grid grid-cols-6 gap-1.5 sm:grid-cols-10 lg:grid-cols-6">
              {session.questionIds.map((id, index) => {
                const done = isAnswered(session.answers[id]);
                const active = index === current;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setCurrent(index)}
                    aria-current={active}
                    className={cx(
                      "flex h-9 items-center justify-center rounded-md border text-xs font-semibold transition-colors",
                      active
                        ? "border-brand bg-brand text-fg-inverted"
                        : done
                          ? "border-brand/40 bg-brand-soft text-brand"
                          : "border-border-subtle bg-surface text-fg-muted hover:border-brand-hover"
                    )}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-fg-muted">{t.exam.answered}</dt>
                <dd className="font-semibold text-fg">{answeredCount}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-fg-muted">{t.exam.unanswered}</dt>
                <dd className="font-semibold text-fg">
                  {total - answeredCount}
                </dd>
              </div>
            </dl>

            <p className="mt-4 text-xs leading-5 text-fg-muted">
              {t.exam.leaveWarning}
            </p>
          </Card>
        </aside>
      </div>

      {confirming ? (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 p-5"
          role="dialog"
          aria-modal="true"
        >
          <Card className="w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-fg">
              {t.exam.confirmSubmitTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              {fill(t.exam.confirmSubmitBody, {
                answered: answeredCount,
                total,
                left: total - answeredCount,
              })}
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setConfirming(false)}>
                {t.exam.cancel}
              </Button>
              <Button onClick={() => submit(false)}>
                {t.exam.confirmSubmit}
              </Button>
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
