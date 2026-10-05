import { type RefObject, useEffect, useState, useSyncExternalStore } from 'react';
import { todayUtc } from '~/lib/market';

const REDUCE = '(prefers-reduced-motion: reduce)';

/** True when the visitor asks for reduced motion. False during prerender. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(REDUCE);
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia(REDUCE).matches,
    () => false,
  );
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia(REDUCE).matches;

// The date only exists in the browser. Prerendered HTML gets null, and the
// client swaps in today's date on hydration without a mismatch.
const noSubscribe = () => () => {};
export const useToday = () =>
  useSyncExternalStore(
    noSubscribe,
    () => todayUtc(),
    () => null,
  );

/** Whether an element is on screen. With `once`, stays true after the first sighting. */
export function useInView(ref: RefObject<Element | null>, { once = false, margin = '0px' } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry!.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, margin]);
  return inView;
}

/**
 * Scroll progress through an element, 0–1, updated once per frame.
 * `pin`: from the element's top reaching the viewport top to its bottom
 * reaching the viewport bottom (a sticky scene). `pass`: from its top entering
 * at the bottom of the viewport to its middle reaching the centre.
 */
export function useScrollProgress(ref: RefObject<Element | null>, mode: 'pin' | 'pass' = 'pin') {
  const [p, setP] = useState(0);
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw =
        mode === 'pin'
          ? -r.top / Math.max(1, r.height - vh)
          : (vh - r.top) / Math.max(1, vh / 2 + r.height / 2);
      setP(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ref, mode]);
  return p;
}
