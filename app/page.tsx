"use client";

import Link from "next/link";
import { useClientSnapshot } from "@/lib/client-store";
import {
  DIFFICULTIES,
  QUESTIONS_PER_EXAM,
  QUESTION_TYPES,
  TIME_LIMIT_MINUTES,
} from "@/lib/config";
import { formatClock, remainingSec } from "@/lib/exam";
import { bankSize } from "@/lib/questions";
import { useSettings } from "@/lib/settings";
import {
  clearActiveSession,
  clearHistory,
  loadActiveSession,
  loadHistory,
  loadLastResult,
} from "@/lib/storage";
import type { ExamSession, HistoryEntry } from "@/lib/types";
import { Badge, Button, Card, ProgressBar, SectionLabel } from "@/components/ui";

const NO_HISTORY: HistoryEntry[] = [];

/** Only an unfinished set with time left can be resumed. */
function readResumableSession(): ExamSession | null {
  const session = loadActiveSession();
  if (!session || session.submittedAt || remainingSec(session) <= 0) return null;
  return session;
}

const readHasLastResult = () => Boolean(loadLastResult());

export default function HomePage() {
  const { lang, t } = useSettings();
  const history = useClientSnapshot(loadHistory, NO_HISTORY);
  const active = useClientSnapshot(readResumableSession, null);
  const hasLastResult = useClientSnapshot(readHasLastResult, false);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <section className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          {t.home.heading}
        </h1>
        <p className="mt-4 text-base leading-7 text-fg-muted">{t.home.intro}</p>
      </section>

      {active ? (
        <Card className="mt-8 flex flex-wrap items-center justify-between gap-4 border-brand/40 bg-brand-soft p-5">
          <div>
            <p className="font-semibold text-brand">{t.home.resumeNote}</p>
            <p className="mt-1 text-sm text-fg-muted">
              {t.difficulty[active.difficulty]} · {t.exam.timeLeft}{" "}
              {formatClock(remainingSec(active))}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => clearActiveSession()}>
              {t.home.discard}
            </Button>
            <Link href={`/exam?level=${active.difficulty}&resume=1`}>
              <Button>{t.home.resume}</Button>
            </Link>
          </div>
        </Card>
      ) : null}

      <section className="mt-8 grid gap-5 md:grid-cols-3">
        {DIFFICULTIES.map((difficulty) => (
          <Card key={difficulty} className="flex flex-col p-6">
            <h2 className="text-xl font-bold text-fg">
              {t.difficulty[difficulty]}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-fg-muted">
              {t.difficulty[`${difficulty}Desc`]}
            </p>

            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-fg-muted">{t.home.questionCount}</dt>
                <dd className="font-semibold text-fg">
                  {QUESTIONS_PER_EXAM} {t.common.items}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-fg-muted">{t.home.timeLimit}</dt>
                <dd className="font-semibold text-fg">
                  {TIME_LIMIT_MINUTES[difficulty]} {t.common.minutes}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-fg-muted">{t.home.bankSize}</dt>
                <dd className="font-semibold text-fg">
                  {bankSize(difficulty)} {t.common.items}
                </dd>
              </div>
            </dl>

            <Link href={`/exam?level=${difficulty}`} className="mt-6">
              <Button className="w-full" size="lg">
                {t.home.start}
              </Button>
            </Link>
          </Card>
        ))}
      </section>

      <section className="mt-10">
        <SectionLabel>{t.home.types}</SectionLabel>
        <div className="mt-3 flex flex-wrap gap-2">
          {QUESTION_TYPES.map((type) => (
            <Badge key={type} tone="neutral" className="px-3 py-1.5 text-sm">
              {t.types[type]}
            </Badge>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-fg">{t.home.history}</h2>
          <div className="flex gap-2">
            {hasLastResult ? (
              <Link href="/result">
                <Button variant="outline" size="sm">
                  {t.home.viewLastResult}
                </Button>
              </Link>
            ) : null}
            {history.length > 0 ? (
              <Button variant="ghost" size="sm" onClick={() => clearHistory()}>
                {t.home.clearHistory}
              </Button>
            ) : null}
          </div>
        </div>

        {history.length === 0 ? (
          <Card className="mt-4 p-6 text-sm text-fg-muted">
            {t.home.historyEmpty}
          </Card>
        ) : (
          <ul className="mt-4 space-y-3">
            {history.map((entry) => {
              const pct = Math.round((entry.correct / entry.total) * 100);
              return (
                <li key={entry.id}>
                  <Card className="p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <Badge tone="brand">
                          {t.difficulty[entry.difficulty]}
                        </Badge>
                        <span className="text-sm text-fg-muted">
                          {new Date(entry.finishedAt).toLocaleString(
                            lang === "th" ? "th-TH" : "en-GB"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-semibold text-fg">
                          {entry.correct} / {entry.total} ({pct}%)
                        </span>
                        <span className="text-fg-muted">
                          {t.result.timeUsed} {formatClock(entry.timeUsedSec)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <ProgressBar value={entry.correct} max={entry.total} />
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
