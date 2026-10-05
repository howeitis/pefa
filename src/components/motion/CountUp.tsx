import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './hooks';

const NUMBER = /[-−]?\d[\d,]*(\.\d+)?/;

/**
 * A figure that counts up from zero the first time it scrolls into view.
 * The prerendered HTML (and the accessible name throughout) is the final
 * value; only the visible digits run. Non-numeric parts ("£", "%", "bn")
 * are kept as they are.
 */
export function CountUp({
  value,
  className = '',
  duration = 1800,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(NUMBER);
    if (!el || !match || prefersReducedMotion()) return;
    const prefix = value.slice(0, match.index);
    const suffix = value.slice(match.index! + match[0].length);
    const negative = /^[-−]/.test(match[0]);
    const decimals = match[1] ? match[1].length - 1 : 0;
    const grouped = match[0].includes(',');
    const target = Math.abs(Number(match[0].replace(/[-−,]/g, '')));
    const format = (n: number) => {
      const s = grouped
        ? n.toLocaleString('en-GB', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : n.toFixed(decimals);
      return `${prefix}${negative ? '−' : ''}${s}${suffix}`;
    };

    let frame = 0;
    const run = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / duration);
        const eased = t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
        el.textContent = format(target * eased);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry!.isIntersecting) return;
        io.disconnect();
        el.textContent = format(0);
        run();
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value, duration]);

  return (
    <span className={`count ${className}`}>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
    </span>
  );
}
