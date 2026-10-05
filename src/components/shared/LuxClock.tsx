import { useSyncExternalStore } from 'react';

const format = (d: Date) =>
  d.toLocaleTimeString('en-GB', {
    timeZone: 'Europe/Luxembourg',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

// One shared one-second tick for every clock on the page.
let current = '';
const listeners = new Set<() => void>();
let timer = 0;
function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!timer) {
    current = format(new Date());
    timer = window.setInterval(() => {
      current = format(new Date());
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(cb);
    if (!listeners.size) {
      window.clearInterval(timer);
      timer = 0;
    }
  };
}

/** Registered-office time, ticking. Prerendered as dashes; the browser fills it in. */
export function LuxClock({ className = '' }: { className?: string }) {
  const now = useSyncExternalStore(
    subscribe,
    () => current || format(new Date()),
    () => null,
  );
  return (
    <span className={`figures font-mono ${className}`}>
      LUX <time>{now ?? '--:--:--'}</time>
    </span>
  );
}
