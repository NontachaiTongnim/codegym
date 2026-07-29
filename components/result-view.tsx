"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { QUESTION_TYPES } from "@/lib/config";
import { formatClock } from "@/lib/exam";
import { tx } from "@/lib/i18n";
import { questionById } from "@/lib/questions";
import { useSettings } from "@/lib/settings";
import type { Difficulty, ExamResult } from "@/lib/types";
import {
  describeAnswer,
  describeCorrectAnswer,
  QuestionCard,
} from "./question-card";
import { Badge, Button, Card, ProgressBar, SectionLabel, cx } from "./ui";

type Filter = "all" | "wrong" | "skipped";

/**
 * `onRetry` is passed when the result is shown in place on `/exam`. There a link
 * to `/exam?level=...` would point at the current URL and never remount, so the
 * runner starts the new set itself instead.
 */
export function ResultView({
  result,
  onRetry,
}: {
  result: ExamResult;
  onRetry?: (difficulty: Difficulty) => void;
}) {
  const { lang, t } = useSettings();
  const [filter, setFilter] = useState<Filter>("all");

  const percent = Math.round((result.correct / result.total) * 100);

  const byType = useMemo(
    () =>
      QUESTION_TYPES.map((type) => {
        const rows = result.perQuestion.filter((r) => r.type === type);
        return {
          type,
          total: rows.length,
          correct: rows.filter((r) => r.correct).length,
        };
      }).filter((row) => row.total > 0),
    [result]
  );

  const visible = result.perQuestion.filter((row) =>
    filter === "all"
      ? true
      : filter === "wrong"
        ? row.answered && !row.correct
        : !row.answered
  );

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t.result.filterAll },
    { key: "wrong", label: t.result.filterWrong },
    { key: "skipped", label: t.result.filterSkipped },
  ];

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-fg">
        {t.result.heading}
      </h1>

      <Card className="mt-6 p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>{t.result.score}</SectionLabel>
            <p className="mt-1 text-4xl font-bold text-brand">
              {result.correct}
              <span className="text-xl font-semibold text-fg-muted">
                {" "}
                / {result.total}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="brand">{t.difficulty[result.difficulty]}</Badge>
            <Badge>
              {t.result.timeUsed} {formatClock(result.timeUsedSec)}
            </Badge>
            {result.autoSubmitted ? (
              <Badge tone="warning">{t.result.autoSubmitted}</Badge>
            ) : null}
          </div>
        </div>

        <div className="mt-5">
          <ProgressBar value={result.correct} max={result.total} />
          <p className="mt-2 text-sm text-fg-muted">{percent}%</p>
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            { label: t.result.correct, value: result.correct, tone: "success" },
            { label: t.result.wrong, value: result.wrong, tone: "danger" },
            { label: t.result.skipped, value: result.skipped, tone: "neutral" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border-subtle bg-surface-muted px-3 py-4"
            >
              <dt className="text-xs font-medium text-fg-muted">
                {item.label}
              </dt>
              <dd
                className={cx(
                  "mt-1 text-2xl font-bold",
                  item.tone === "success" && "text-success",
                  item.tone === "danger" && "text-danger",
                  item.tone === "neutral" && "text-fg"
                )}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 flex flex-wrap gap-3">
          {onRetry ? (
            <Button onClick={() => onRetry(result.difficulty)}>
              {t.result.retry}
            </Button>
          ) : (
            <Link href={`/exam?level=${result.difficulty}`}>
              <Button>{t.result.retry}</Button>
            </Link>
          )}
          <Link href="/">
            <Button variant="outline">{t.result.backHome}</Button>
          </Link>
        </div>
      </Card>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-fg">{t.result.byType}</h2>
        <div className="mt-4 space-y-3">
          {byType.map((row) => (
            <div key={row.type} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-fg">{t.types[row.type]}</span>
                <span className="font-semibold text-fg-muted">
                  {row.correct} / {row.total}
                </span>
              </div>
              <ProgressBar value={row.correct} max={row.total} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-fg">{t.result.review}</h2>
          <div
            className="flex rounded-lg border border-border-subtle p-0.5"
            role="group"
          >
            {filters.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setFilter(item.key)}
                aria-pressed={filter === item.key}
                className={cx(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  filter === item.key
                    ? "bg-brand text-fg-inverted"
                    : "text-fg-muted hover:text-brand"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <Card className="mt-4 p-6 text-sm text-fg-muted">
            {t.result.empty}
          </Card>
        ) : (
          <ol className="mt-4 space-y-6">
            {visible.map((row) => {
              const question = questionById(row.questionId);
              if (!question) return null;
              const number =
                result.perQuestion.findIndex(
                  (r) => r.questionId === row.questionId
                ) + 1;
              const given = describeAnswer(
                question,
                result.answers[row.questionId],
                lang
              );

              return (
                <li key={row.questionId}>
                  <div className="space-y-3">
                    <QuestionCard
                      question={question}
                      number={number}
                      total={result.total}
                      answer={result.answers[row.questionId]}
                      mode="review"
                    />
                    <Card
                      className={cx(
                        "p-5",
                        row.correct
                          ? "border-success/40 bg-success-soft"
                          : "border-danger/40 bg-danger-soft"
                      )}
                    >
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <SectionLabel>{t.result.yourAnswer}</SectionLabel>
                          <p
                            className={cx(
                              "mt-1 text-sm font-medium",
                              row.correct ? "text-success" : "text-danger"
                            )}
                          >
                            {given ?? t.result.noAnswer}
                          </p>
                        </div>
                        <div>
                          <SectionLabel>{t.result.correctAnswer}</SectionLabel>
                          <p className="mt-1 text-sm font-medium text-fg">
                            {describeCorrectAnswer(question, lang)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 border-t border-border-subtle pt-4">
                        <SectionLabel>{t.result.explanation}</SectionLabel>
                        <p className="mt-1 text-sm leading-6 text-fg">
                          {tx(question.explanation, lang)}
                        </p>
                      </div>
                    </Card>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </div>
  );
}
