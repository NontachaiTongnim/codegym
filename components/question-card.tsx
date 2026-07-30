"use client";

import { tx } from "@/lib/i18n";
import { useSettings } from "@/lib/settings";
import type { Question, UserAnswer } from "@/lib/types";
import { CodeBlock } from "./code-block";
import { DataTable } from "./data-table";
import { Badge, Card, SectionLabel, cx } from "./ui";

/** Human readable form of a stored answer, used on the result page. */
export function describeAnswer(
  question: Question,
  answer: UserAnswer | undefined,
  lang: "th" | "en"
): string | null {
  if (!answer) return null;
  if (answer.kind === "choice" && question.answer.kind === "choice") {
    const choice = question.answer.choices[answer.index];
    return choice === undefined ? null : tx(choice, lang);
  }
  if (answer.kind === "text") {
    return answer.value.trim() || null;
  }
  if (answer.kind === "cell") {
    if (!answer.cellId) return null;
    const label = answer.cellId
      .replace("r", lang === "th" ? "แถว " : "row ")
      .replace("c", lang === "th" ? " คอลัมน์ " : " column ");
    return `${label} = ${answer.value.trim() || "-"}`;
  }
  return null;
}

export function describeCorrectAnswer(
  question: Question,
  lang: "th" | "en"
): string {
  const spec = question.answer;
  if (spec.kind === "choice") return tx(spec.choices[spec.correctIndex], lang);
  if (spec.kind === "text") return spec.accepted[0];
  const label = spec.cellId
    .replace("r", lang === "th" ? "แถว " : "row ")
    .replace("c", lang === "th" ? " คอลัมน์ " : " column ");
  return `${label} = ${spec.correctValue}`;
}

function Sequence({ values }: { values: (number | null)[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {values.map((value, i) => (
        <span
          key={i}
          className={cx(
            "inline-flex min-w-12 items-center justify-center rounded-lg border px-3 py-2 font-mono text-base",
            value === null
              ? "border-dashed border-brand bg-brand-soft text-brand"
              : "border-border-subtle bg-surface-muted text-fg"
          )}
        >
          {value === null ? "?" : value}
        </span>
      ))}
    </div>
  );
}

function QuestionBody({
  question,
  answer,
  onAnswer,
  review,
}: {
  question: Question;
  answer?: UserAnswer;
  onAnswer?: (next: UserAnswer) => void;
  review: boolean;
}) {
  const { t } = useSettings();

  switch (question.type) {
    case "code-trace":
      return (
        <div className="space-y-3">
          {question.input ? (
            <div className="space-y-1">
              <SectionLabel>{t.exam.given}</SectionLabel>
              <p className="font-mono text-[13px] text-fg">{question.input}</p>
            </div>
          ) : null}
          <CodeBlock code={question.code} language={question.language} />
        </div>
      );

    case "pseudo-code":
      return (
        <div className="space-y-3">
          {question.input ? (
            <div className="space-y-1">
              <SectionLabel>{t.exam.given}</SectionLabel>
              <p className="font-mono text-[13px] text-fg">{question.input}</p>
            </div>
          ) : null}
          <CodeBlock
            code={question.code}
            language="pseudo"
            label={t.exam.pseudo}
          />
        </div>
      );

    case "number-sequence":
      return <Sequence values={question.sequence} />;

    case "table-debug": {
      const spec = question.answer;
      const selected =
        answer && answer.kind === "cell" ? answer.cellId : null;
      return (
        <div className="space-y-4">
          <CodeBlock code={question.code} language={question.language} />
          <DataTable
            headers={question.table.headers}
            rows={question.table.rows}
            caption={question.table.caption}
            selectable={!review && spec.kind === "cell"}
            selectedCell={selected}
            correctCell={review && spec.kind === "cell" ? spec.cellId : null}
            onSelectCell={(id) =>
              onAnswer?.({
                kind: "cell",
                cellId: id,
                value:
                  answer && answer.kind === "cell" ? answer.value : "",
              })
            }
          />
          {!review ? (
            <p className="text-sm text-fg-muted">{t.exam.pickCell}</p>
          ) : null}
        </div>
      );
    }

    case "sql-logic":
      return (
        <div className="space-y-4">
          <div className="space-y-4">
            <SectionLabel>{t.exam.schema}</SectionLabel>
            {question.schema.map((table) => (
              <DataTable
                key={table.name}
                caption={table.name}
                headers={table.columns}
                rows={table.rows}
              />
            ))}
          </div>
          <CodeBlock
            code={question.query}
            language="sql"
            label={t.exam.query}
          />
        </div>
      );

    case "brain-teaser":
      return question.code ? (
        <CodeBlock
          code={question.code}
          language={question.language ?? "pseudo"}
        />
      ) : null;

    case "angular":
    case "react-nextjs":
      return question.code ? (
        <CodeBlock
          code={question.code}
          language={question.language ?? "javascript"}
        />
      ) : null;

    default:
      return null;
  }
}

function AnswerArea({
  question,
  answer,
  onAnswer,
}: {
  question: Question;
  answer?: UserAnswer;
  onAnswer: (next: UserAnswer) => void;
}) {
  const { lang, t } = useSettings();
  const spec = question.answer;

  if (spec.kind === "choice") {
    const selected = answer && answer.kind === "choice" ? answer.index : -1;
    return (
      <div className="space-y-2" role="radiogroup" aria-label={t.exam.typeAnswer}>
        {spec.choices.map((choice, index) => {
          const active = selected === index;
          return (
            <label
              key={index}
              className={cx(
                "flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition-colors",
                active
                  ? "border-brand bg-brand-soft"
                  : "border-border-subtle bg-surface hover:border-brand-hover"
              )}
            >
              <input
                type="radio"
                className="sr-only"
                name={`q-${question.id}`}
                checked={active}
                onChange={() => onAnswer({ kind: "choice", index })}
              />
              <span
                aria-hidden
                className={cx(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold",
                  active
                    ? "border-brand bg-brand text-fg-inverted"
                    : "border-border-strong text-fg-muted"
                )}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-sm leading-6 text-fg">
                {tx(choice, lang)}
              </span>
            </label>
          );
        })}
      </div>
    );
  }

  if (spec.kind === "text") {
    const value = answer && answer.kind === "text" ? answer.value : "";
    return (
      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-fg"
          htmlFor={`text-${question.id}`}
        >
          {t.exam.typeAnswer}
        </label>
        <input
          id={`text-${question.id}`}
          type="text"
          value={value}
          autoComplete="off"
          placeholder={spec.placeholder ? tx(spec.placeholder, lang) : undefined}
          onChange={(e) => onAnswer({ kind: "text", value: e.target.value })}
          className="w-full max-w-md rounded-lg border border-border-strong bg-surface px-3.5 py-2.5 font-mono text-sm text-fg placeholder:text-fg-muted/70"
        />
        {question.type === "number-sequence" ? (
          <p className="text-xs text-fg-muted">{t.exam.sequenceHint}</p>
        ) : null}
      </div>
    );
  }

  const current = answer && answer.kind === "cell" ? answer : null;
  return (
    <div className="space-y-2">
      <p className="text-sm text-fg">
        {t.exam.selectedCell}:{" "}
        <span className="font-mono">
          {current?.cellId ?? t.exam.noCellSelected}
        </span>
      </p>
      <label
        className="block text-sm font-medium text-fg"
        htmlFor={`cell-${question.id}`}
      >
        {t.exam.correctValue}
      </label>
      <input
        id={`cell-${question.id}`}
        type="text"
        autoComplete="off"
        value={current?.value ?? ""}
        onChange={(e) =>
          onAnswer({
            kind: "cell",
            cellId: current?.cellId ?? null,
            value: e.target.value,
          })
        }
        className="w-full max-w-xs rounded-lg border border-border-strong bg-surface px-3.5 py-2.5 font-mono text-sm text-fg"
      />
    </div>
  );
}

export function QuestionCard({
  question,
  number,
  total,
  answer,
  onAnswer,
  mode = "exam",
}: {
  question: Question;
  number: number;
  total?: number;
  answer?: UserAnswer;
  onAnswer?: (next: UserAnswer) => void;
  mode?: "exam" | "review";
}) {
  const { lang, t } = useSettings();
  const review = mode === "review";

  return (
    <Card className="p-5 sm:p-7">
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="text-sm font-semibold text-brand">
          {t.exam.question} {number}
          {total ? ` / ${total}` : ""}
        </span>
        <Badge tone="brand">{t.types[question.type]}</Badge>
        <Badge>{t.difficulty[question.difficulty]}</Badge>
      </div>

      <p className="mt-4 text-base leading-7 font-medium text-fg">
        {tx(question.prompt, lang)}
      </p>

      <div className="mt-5">
        <QuestionBody
          question={question}
          answer={answer}
          onAnswer={onAnswer}
          review={review}
        />
      </div>

      {!review && onAnswer ? (
        <div className="mt-6 border-t border-border-subtle pt-5">
          <AnswerArea
            question={question}
            answer={answer}
            onAnswer={onAnswer}
          />
        </div>
      ) : null}
    </Card>
  );
}
