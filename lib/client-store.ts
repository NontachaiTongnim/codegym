"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

/**
 * Tiny external store around browser-only state (localStorage, matchMedia).
 * Components read it through `useClientSnapshot`, which returns the server
 * snapshot during SSR and hydration, then the real client value. Writers call
 * `notifyClientStore()` so every reader refreshes.
 */
let version = 0;
const listeners = new Set<() => void>();

export function notifyClientStore() {
  version += 1;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useClientSnapshot<T, S>(read: () => T, serverValue: S): T | S {
  const cache = useRef<{ version: number; value: T } | null>(null);

  const getSnapshot = useCallback(() => {
    if (!cache.current || cache.current.version !== version) {
      cache.current = { version, value: read() };
    }
    return cache.current.value;
  }, [read]);

  const getServerSnapshot = useCallback(() => serverValue, [serverValue]);

  return useSyncExternalStore<T | S>(subscribe, getSnapshot, getServerSnapshot);
}
