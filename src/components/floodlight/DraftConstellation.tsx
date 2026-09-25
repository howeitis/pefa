import { useEffect, useRef, useState } from 'react';
import { type Club } from '~/canon';
import { CrestGrid } from './CrestGrid';

const STEP_MS = 650;

/**
 * The draft pool, as in the game's intro reel: thirteen crests, five of which
 * light up. The five are the reel's fixed promo picks, never a draw result,
 * and the caption says so. Rendered fully lit, so it reads the same without
 * JavaScript; "Replay" lights them one at a time, or all at once under
 * reduced motion.
 */
export function DraftConstellation({ clubs, drawn }: { clubs: Club[]; drawn: string[] }) {
  const [step, setStep] = useState(drawn.length);
  const [playing, setPlaying] = useState(false);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clear, []);

  function replay() {
    clear();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep(drawn.length);
      return;
    }
    setPlaying(true);
    setStep(0);
    drawn.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setStep(i + 1), STEP_MS * (i + 1)));
    });
    timers.current.push(window.setTimeout(() => setPlaying(false), STEP_MS * (drawn.length + 1)));
  }

  const lit = drawn.slice(0, step);

  return (
    <div>
      <CrestGrid clubs={clubs} lit={lit} />
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-muted" aria-live="polite">
          {playing
            ? `Promotional sequence: ${lit.length} of ${drawn.length} highlighted.`
            : 'Promotional sequence, as in PEFA™ launch material. Not a draw result.'}
        </p>
        <button
          type="button"
          onClick={replay}
          disabled={playing}
          className="shrink-0 rounded-full border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-ink disabled:opacity-60"
        >
          {playing ? 'Playing…' : 'Replay the promo'}
        </button>
      </div>
    </div>
  );
}
