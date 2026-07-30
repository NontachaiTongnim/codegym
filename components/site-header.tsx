"use client";

import Image from "next/image";
import Link from "next/link";
import { useSettings } from "@/lib/settings";
import { Button, cx } from "./ui";

export function SiteHeader() {
  const { lang, setLang, theme, toggleTheme, t } = useSettings();

  return (
    <header className="sticky top-0 z-20 border-b border-border-subtle bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="CodeGym logo"
            width={256}
            height={256}
            className="h-10 w-10 object-contain"
          />
          <span className="text-lg font-bold tracking-tight text-brand">
            {t.appName}
          </span>
          <span className="hidden text-sm text-fg-muted sm:inline">
            {t.appTagline}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <div
            className="flex rounded-lg border border-border-subtle p-0.5"
            role="group"
            aria-label={t.common.language}
          >
            {(["th", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={cx(
                  "rounded-md px-2.5 py-1 text-xs font-semibold uppercase transition-colors",
                  lang === code
                    ? "bg-brand text-fg-inverted"
                    : "text-fg-muted hover:text-brand"
                )}
              >
                {code}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label={`${t.common.theme}: ${
              theme === "dark" ? t.common.dark : t.common.light
            }`}
          >
            {theme === "dark" ? t.common.light : t.common.dark}
          </Button>
        </div>
      </div>
    </header>
  );
}
