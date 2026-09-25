import { createContext, type ReactNode, useContext, useState } from 'react';
import { Redacted } from './Redacted';

/**
 * "Request disclosure". Each request makes the document *more* redacted:
 * a `Redactable` with `from={n}` is legible until the nth request, then
 * joins the rest under the bar. The text never leaves the DOM, so screen
 * readers keep reading it throughout (the game's redaction rule).
 */

const DisclosureContext = createContext(0);

export function DisclosureProvider({
  children,
  responses,
}: {
  children: ReactNode;
  /** One message per request, in order. The last repeats. */
  responses: string[];
}) {
  const [requests, setRequests] = useState(0);
  const message = requests > 0 ? responses[Math.min(requests, responses.length) - 1] : null;

  return (
    <DisclosureContext.Provider value={requests}>
      {children}
      <div className="mt-8 flex flex-col gap-3 border-t border-rule pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p role="status" aria-live="polite" className="text-sm text-ink-muted">
          {message ?? 'Disclosure may be requested under PEFA’s transparency objective.'}
        </p>
        <button
          type="button"
          onClick={() => setRequests((n) => n + 1)}
          className="shrink-0 border border-navy px-4 py-2 text-sm font-semibold text-navy hover:bg-navy hover:text-parchment"
        >
          Request disclosure
        </button>
      </div>
    </DisclosureContext.Provider>
  );
}

/** Legible text that is redacted once `from` disclosure requests have been made. */
export function Redactable({ from, children }: { from: number; children: string }) {
  const requests = useContext(DisclosureContext);
  return requests >= from ? <Redacted>{children}</Redacted> : <>{children}</>;
}
