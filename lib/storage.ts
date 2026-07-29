import { notifyClientStore } from "./client-store";
import { STORAGE_KEYS } from "./config";
import type { ExamResult, ExamSession, HistoryEntry } from "./types";

function read<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or blocked, nothing else to do
  }
}

function remove(key: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export const loadActiveSession = () =>
  read<ExamSession>(STORAGE_KEYS.activeSession);

export function saveActiveSession(session: ExamSession) {
  write(STORAGE_KEYS.activeSession, session);
  notifyClientStore();
}

export function clearActiveSession() {
  remove(STORAGE_KEYS.activeSession);
  notifyClientStore();
}

export const loadLastResult = () => read<ExamResult>(STORAGE_KEYS.lastResult);

export function saveLastResult(result: ExamResult) {
  write(STORAGE_KEYS.lastResult, result);
  notifyClientStore();
}

export const loadHistory = (): HistoryEntry[] =>
  read<HistoryEntry[]>(STORAGE_KEYS.history) ?? [];

export function appendHistory(entry: HistoryEntry) {
  const next = [entry, ...loadHistory()].slice(0, 50);
  write(STORAGE_KEYS.history, next);
  notifyClientStore();
  return next;
}

export function clearHistory() {
  remove(STORAGE_KEYS.history);
  notifyClientStore();
}
