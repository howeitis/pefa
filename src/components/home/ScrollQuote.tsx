import { useRef } from 'react';
import { useReducedMotion, useScrollProgress } from '~/components/motion/hooks';

/**
 * A quotation that lights up word by word as it scrolls through the view.
 * Unlit words use --ink-faint, which still clears 3:1 for display sizes, so
 * the quote is legible at every point. Fully lit without script or motion.
 */
export function ScrollQuote({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLQuoteElement>(null);
  const progress = useScrollProgress(ref, 'pass');
  const reduced = useReducedMotion();
  const words = text.split(' ');
  // Light the whole quote by the time it reaches the middle of the screen.
  const lit = reduced ? words.length : Math.floor(Math.min(1, progress * 1.25) * words.length);
  return (
    <blockquote ref={ref} className={className}>
      <span className="text-ink-faint">“</span>
      {words.map((w, i) => (
        <span
          key={i}
          className={`quote-word transition-colors duration-300 ${i < lit ? 'text-ink' : 'text-ink-faint'}`}
        >
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
      <span className={lit >= words.length ? 'text-ink' : 'text-ink-faint'}>”</span>
      <style>{`html:not([data-js]) .quote-word { color: var(--ink); }`}</style>
    </blockquote>
  );
}
