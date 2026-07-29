"use client";

import { tx } from "@/lib/i18n";
import { useSettings } from "@/lib/settings";
import type { Text } from "@/lib/types";
import { cx, SectionLabel } from "./ui";

export const cellId = (row: number, col: number) => `r${row}c${col}`;

export function DataTable({
  headers,
  rows,
  caption,
  selectable = false,
  selectedCell,
  onSelectCell,
  correctCell,
}: {
  headers: Text[];
  rows: string[][];
  caption?: Text;
  selectable?: boolean;
  selectedCell?: string | null;
  onSelectCell?: (id: string) => void;
  /** Review mode: marks the cell that was actually wrong. */
  correctCell?: string | null;
}) {
  const { lang } = useSettings();

  return (
    <div className="space-y-2">
      {caption ? <SectionLabel>{tx(caption, lang)}</SectionLabel> : null}
      <div className="overflow-x-auto rounded-xl border border-border-subtle">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-surface-muted">
              {headers.map((header, c) => (
                <th
                  key={c}
                  scope="col"
                  className="border-b border-border-subtle px-3 py-2 text-left font-semibold text-fg"
                >
                  {tx(header, lang)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} className="even:bg-surface-muted/60">
                {row.map((value, c) => {
                  const id = cellId(r, c);
                  const isSelected = selectedCell === id;
                  const isTarget = correctCell === id;
                  const content = (
                    <span className="font-mono text-[13px]">{value}</span>
                  );
                  return (
                    <td
                      key={c}
                      className={cx(
                        "border-b border-border-subtle px-0 py-0",
                        isTarget && "bg-success-soft",
                        isSelected && !isTarget && correctCell && "bg-danger-soft"
                      )}
                    >
                      {selectable && onSelectCell ? (
                        <button
                          type="button"
                          onClick={() => onSelectCell(id)}
                          aria-pressed={isSelected}
                          className={cx(
                            "w-full px-3 py-2 text-left transition-colors",
                            isSelected
                              ? "bg-brand text-fg-inverted"
                              : "hover:bg-brand-soft"
                          )}
                        >
                          {content}
                        </button>
                      ) : (
                        <div className="px-3 py-2">{content}</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
