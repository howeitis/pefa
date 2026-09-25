/**
 * A redaction bar. Sighted readers see a black bar; the text is still in the
 * DOM, so screen readers hear what was redacted. That is the joke.
 */
export function Redacted({ children }: { children: string }) {
  return (
    <span className="redacted">
      <span className="sr-only">Redacted: </span>
      <span>{children}</span>
    </span>
  );
}
