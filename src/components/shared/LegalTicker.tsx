import { useState } from 'react';
import { lore } from '~/canon';

/**
 * The game's INTRO_TICKER as a footer marquee. The text is rendered twice
 * back to back and scrolled by half, so it loops without a seam. Pauses on
 * hover, on focus, via its own button (moving content needs a stop control),
 * and is static under prefers-reduced-motion. Screen readers get one copy.
 */
export function LegalTicker() {
  const [paused, setPaused] = useState(false);
  const text = lore.intro.ticker;

  return (
    <div className="ticker flex items-center gap-3 border-y border-rule bg-surface text-xs text-ink-muted">
      <p className="sr-only">{text}</p>
      <div className="relative min-w-0 flex-1 overflow-hidden py-2" aria-hidden="true">
        <div
          className="ticker-track flex w-max whitespace-nowrap"
          style={paused ? { animationPlayState: 'paused' } : undefined}
        >
          <span className="pr-1">{text}</span>
          <span className="pr-1">{text}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="mr-3 shrink-0 rounded px-2 py-1 text-[11px] font-semibold uppercase tracking-wider hover:text-ink"
        aria-pressed={paused}
      >
        {paused ? 'Resume' : 'Pause'}
        <span className="sr-only"> legal ticker</span>
      </button>
    </div>
  );
}
