/**
 * The motion boot script, inlined into <head> by root.tsx so it runs before
 * first paint and before React hydrates (see styles/motion.css).
 *
 * - Marks <html data-js>, which is what lets the CSS hide not-yet-revealed
 *   elements at all.
 * - Reveals `.reveal`, `[data-reveal]`, `.split` and `.redacted` elements as
 *   they enter the viewport by setting `data-in`, staggering elements that
 *   arrive together. A data attribute, not a class, so a React re-render of
 *   `className` can never un-reveal anything.
 * - Watches the DOM for elements added later (client navigation, disclosure
 *   requests) and observes them too.
 * - Spotlight cards and magnetic buttons, with one delegated listener each.
 *
 * It must stay self-contained: it is serialised with Function#toString.
 */
export function boot() {
  const root = document.documentElement;
  root.setAttribute('data-js', '');

  const SELECTOR = '.reveal,[data-reveal],.split,.redacted';
  const reveal = (el: Element) => el.setAttribute('data-in', '');

  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(SELECTOR).forEach(reveal);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        let n = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          if (!el.style.getPropertyValue('--delay')) {
            el.style.setProperty('--delay', `${Math.min(n, 6) * 90}ms`);
          }
          n++;
          reveal(el);
          io.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    );
    const watch = (scope: ParentNode) => {
      if (scope instanceof Element && scope.matches(SELECTOR) && !scope.hasAttribute('data-in')) {
        io.observe(scope);
      }
      scope.querySelectorAll(SELECTOR).forEach((el) => {
        if (!el.hasAttribute('data-in')) io.observe(el);
      });
    };
    watch(document);
    new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && watch(n));
    }).observe(document.body, { childList: true, subtree: true });
  };
  // Started by REVEAL_SCRIPT at the end of <body>, as soon as the markup is
  // parsed. DOMContentLoaded would wait for every deferred module script,
  // holding the hero back until all of the JavaScript had run.
  (window as unknown as { __pefaReveal: () => void }).__pefaReveal = start;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }

  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const still = window.matchMedia('(prefers-reduced-motion: reduce)');
  let magnet: HTMLElement | null = null;

  document.addEventListener(
    'pointermove',
    (e) => {
      if (!fine.matches) return;
      const target = e.target instanceof Element ? e.target : null;
      const card = target?.closest<HTMLElement>('.spotlight');
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
      const m = still.matches ? null : (target?.closest<HTMLElement>('[data-magnetic]') ?? null);
      if (magnet && magnet !== m) {
        magnet.style.removeProperty('--tx');
        magnet.style.removeProperty('--ty');
      }
      magnet = m;
      if (m) {
        const r = m.getBoundingClientRect();
        m.style.setProperty('--tx', `${(e.clientX - r.left - r.width / 2) * 0.25}px`);
        m.style.setProperty('--ty', `${(e.clientY - r.top - r.height / 2) * 0.35}px`);
      }
    },
    { passive: true },
  );
}

export const BOOT_SCRIPT = `(${boot.toString()})()`;
export const REVEAL_SCRIPT = 'window.__pefaReveal&&window.__pefaReveal()';
