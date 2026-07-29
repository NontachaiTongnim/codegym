import type { ButtonHTMLAttributes, HTMLAttributes } from "react";

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

type ButtonVariant = "primary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-fg-inverted hover:bg-brand-hover border border-transparent",
  outline:
    "bg-surface text-brand border border-brand hover:bg-brand-soft",
  ghost:
    "bg-transparent text-fg-muted border border-transparent hover:bg-brand-soft hover:text-brand",
  danger:
    "bg-surface text-danger border border-danger hover:bg-danger-soft",
};

const sizes: Record<ButtonSize, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-6 py-3",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-border-subtle bg-surface shadow-[0_1px_3px_rgba(11,37,69,0.06),0_8px_24px_-16px_rgba(11,37,69,0.25)]",
        className
      )}
      {...props}
    />
  );
}

type Tone = "neutral" | "brand" | "success" | "danger" | "warning";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-muted text-fg-muted border-border-subtle",
  brand: "bg-brand-soft text-brand border-transparent",
  success: "bg-success-soft text-success border-transparent",
  danger: "bg-danger-soft text-danger border-transparent",
  warning: "bg-warning-soft text-warning border-transparent",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}

export function SectionLabel({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cx(
        "text-xs font-semibold uppercase tracking-wide text-fg-muted",
        className
      )}
      {...props}
    />
  );
}

export function ProgressBar({
  value,
  max,
  tone = "brand",
}: {
  value: number;
  max: number;
  tone?: "brand" | "warning" | "danger";
}) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  const fill =
    tone === "danger" ? "bg-danger" : tone === "warning" ? "bg-warning" : "bg-brand";
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-border-subtle"
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cx("h-full rounded-full transition-[width] duration-300", fill)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
