"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { notifyClientStore, useClientSnapshot } from "./client-store";
import { STORAGE_KEYS } from "./config";
import { DEFAULT_LANG, dict, type Dict } from "./i18n";
import type { Lang } from "./types";

export type Theme = "light" | "dark";

interface Settings {
  lang: Lang;
  theme: Theme;
  t: Dict;
  setLang: (lang: Lang) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const SettingsContext = createContext<Settings | null>(null);

function readLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEYS.lang);
    if (stored === "th" || stored === "en") return stored;
  } catch {
    // storage blocked
  }
  return DEFAULT_LANG;
}

function readTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEYS.theme);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // storage blocked
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches === true
    ? "dark"
    : "light";
}

/**
 * Theme and language live in localStorage. The inline script in the root layout
 * applies them to <html> before the first paint, so React only mirrors them.
 */
export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const lang = useClientSnapshot(readLang, DEFAULT_LANG);
  const theme = useClientSnapshot<Theme, Theme>(readTheme, "light");

  const setLang = useCallback((next: Lang) => {
    document.documentElement.lang = next;
    try {
      window.localStorage.setItem(STORAGE_KEYS.lang, next);
    } catch {
      // ignore
    }
    notifyClientStore();
  }, []);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(STORAGE_KEYS.theme, next);
    } catch {
      // ignore
    }
    notifyClientStore();
  }, []);

  const value = useMemo<Settings>(
    () => ({
      lang,
      theme,
      t: dict[lang],
      setLang,
      setTheme,
      toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
    }),
    [lang, theme, setLang, setTheme]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): Settings {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}

/** Inline script that applies the stored theme and language before first paint. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEYS.theme}");if(t!=="light"&&t!=="dark"){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t;var l=localStorage.getItem("${STORAGE_KEYS.lang}");if(l==="en"||l==="th")document.documentElement.lang=l}catch(e){}})()`;
