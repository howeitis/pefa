/** An attributed quotation set apart from the body. */
export function PullQuote({ text, attribution }: { text: string; attribution: string }) {
  return (
    <figure className="my-8 border-l-4 border-accent pl-6">
      <blockquote className="font-display text-2xl italic leading-snug sm:text-3xl">
        “{text}”
      </blockquote>
      <figcaption className="mt-3 text-sm text-ink-muted">— {attribution}</figcaption>
    </figure>
  );
}
