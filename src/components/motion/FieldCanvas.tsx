import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './hooks';

/**
 * The hero's motion piece: a football pitch rendered as data terrain. A grid
 * of points in perspective swells like a market, the pitch markings ride the
 * swell in gold, and a few valuation read-outs track the points beneath
 * them. Decorative (aria-hidden), drawn on one canvas, paused off screen and
 * in hidden tabs, and a single still frame under reduced motion.
 */

const COLS = 72;
const ROWS = 40;
const X_SPAN = 1.9;
const Z_NEAR = 0.55;
const Z_FAR = 4.4;

const READOUTS = [
  { col: 44, row: 8, label: 'ARM.L', base: 158.25 },
  { col: 58, row: 14, label: 'VAR.MC', base: 378.89 },
  { col: 38, row: 24, label: 'xVAL', base: 92.4 },
  { col: 52, row: 31, label: 'STI', base: 61.7 },
];

const LEVELS = 12;
const COLOURS = [
  ...Array.from({ length: LEVELS }, (_, i) => `rgba(246,244,238,${(i / (LEVELS - 1)).toFixed(3)})`),
  ...Array.from({ length: LEVELS }, (_, i) => `rgba(229,184,66,${(i / (LEVELS - 1)).toFixed(3)})`),
];
const buckets: number[][] = COLOURS.map(() => []);

function height(x: number, z: number, t: number) {
  return (
    0.07 * Math.sin(x * 2.1 + t * 0.55) * Math.cos(z * 1.4 - t * 0.35) +
    0.045 * Math.sin((x + z) * 3.2 - t * 0.8) +
    0.12 *
      Math.exp(-((x - Math.sin(t * 0.17) * 1.1) ** 2 + (z - 2.4 - Math.cos(t * 0.13)) ** 2) * 2.2)
  );
}

export function FieldCanvas({
  className = '',
  intensity = 1,
  markings = true,
  readouts = true,
}: {
  className?: string;
  intensity?: number;
  markings?: boolean;
  readouts?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const still = prefersReducedMotion();
    let w = 0;
    let h = 0;
    let dpr = 1;
    let frame = 0;
    let visible = true;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const mono = getComputedStyle(document.documentElement).getPropertyValue('--font-mono');

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const t = time / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      ctx.clearRect(0, 0, w, h);

      const narrow = w < 700;
      const f = narrow ? w * 0.85 : w * 0.6;
      const horizon = h * (narrow ? 0.4 : 0.3) + pointer.y * 14;
      const camX = Math.sin(t * 0.08) * 0.12 + pointer.x * 0.18;
      const camY = 0.62;
      const cx = narrow ? w * 0.5 : w * 0.7;

      const project = (x: number, y: number, z: number) => ({
        x: cx + ((x - camX) / z) * f,
        y: horizon + ((camY - y) / z) * f * 0.62,
      });

      // Dots, bucketed by colour and opacity so each bucket is one fill.
      const step = narrow ? 2 : 1;
      for (const b of buckets) b.length = 0;
      for (let r = 0; r < ROWS; r += step) {
        const z = Z_FAR - (r / (ROWS - 1)) * (Z_FAR - Z_NEAR);
        const depth = 1 - (z - Z_NEAR) / (Z_FAR - Z_NEAR); // 0 far, 1 near
        const s = (0.7 + depth * 1.5) * (narrow ? 1.3 : 1);
        for (let c = 0; c < COLS; c += step) {
          const x = -X_SPAN + (c / (COLS - 1)) * X_SPAN * 2;
          const y = height(x, z, t);
          const p = project(x, y, z);
          if (p.x < -4 || p.x > w + 4 || p.y > h + 4) continue;
          const lift = Math.min(1, Math.max(0, (y + 0.02) * 6));
          const gold = lift > 0.55;
          const a = (0.1 + depth * 0.5) * intensity * (0.6 + lift * 0.6) * (gold ? 1.5 : 1);
          const level = Math.min(LEVELS - 1, Math.round(a * (LEVELS - 1)));
          buckets[(gold ? LEVELS : 0) + level]!.push(p.x - s / 2, p.y - s / 2, s);
        }
      }
      buckets.forEach((b, i) => {
        if (!b.length) return;
        ctx.fillStyle = COLOURS[i]!;
        ctx.beginPath();
        for (let k = 0; k < b.length; k += 3) ctx.rect(b[k]!, b[k + 1]!, b[k + 2]!, b[k + 2]!);
        ctx.fill();
      });

      if (markings) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(229,184,66,${0.38 * intensity})`;
        const line = (pts: [number, number][]) => {
          ctx.beginPath();
          pts.forEach(([x, z], i) => {
            const p = project(x, height(x, z, t), z);
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          });
          ctx.stroke();
        };
        const seg = (x1: number, z1: number, x2: number, z2: number, n = 24) =>
          line(
            Array.from({ length: n + 1 }, (_, i) => [
              x1 + ((x2 - x1) * i) / n,
              z1 + ((z2 - z1) * i) / n,
            ]),
          );
        const zMid = 2.45;
        const [zA, zB, half] = [0.9, 4.0, 1.25];
        seg(-half, zA, -half, zB);
        seg(half, zA, half, zB);
        seg(-half, zA, half, zA);
        seg(-half, zB, half, zB);
        seg(-half, zMid, half, zMid);
        line(
          Array.from({ length: 49 }, (_, i) => {
            const a = (i / 48) * Math.PI * 2;
            return [Math.cos(a) * 0.36, zMid + Math.sin(a) * 0.36] as [number, number];
          }),
        );
        // Penalty areas at both ends.
        for (const [z0, dir] of [
          [zA, 1],
          [zB, -1],
        ] as const) {
          line([
            [-0.6, z0],
            [-0.6, z0 + dir * 0.5],
            [0.6, z0 + dir * 0.5],
            [0.6, z0],
          ]);
        }
      }

      if (readouts && !narrow) {
        ctx.font = `500 10px ${mono}`;
        ctx.textBaseline = 'middle';
        READOUTS.forEach((ro, i) => {
          const z = Z_FAR - (ro.row / (ROWS - 1)) * (Z_FAR - Z_NEAR);
          const x = -X_SPAN + (ro.col / (COLS - 1)) * X_SPAN * 2;
          const y = height(x, z, t);
          const p = project(x, y, z);
          if (p.x < w * 0.58 || p.x > w - 190) return;
          const top = p.y - 44;
          const delta = Math.sin(t * 0.6 + i * 1.7) * 2.4 + y * 18;
          const value = ro.base * (1 + delta / 100);
          ctx.strokeStyle = 'rgba(229,184,66,0.45)';
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, top);
          ctx.stroke();
          ctx.fillStyle = '#e5b842';
          ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
          const text = `${ro.label}  ${value.toFixed(2)}  ${delta >= 0 ? '▲' : '▼'}${Math.abs(delta).toFixed(1)}%`;
          const tw = ctx.measureText(text).width;
          ctx.fillStyle = 'rgba(11,15,25,0.78)';
          ctx.fillRect(p.x + 6, top - 9, tw + 14, 18);
          ctx.strokeStyle = 'rgba(246,244,238,0.18)';
          ctx.strokeRect(p.x + 6.5, top - 8.5, tw + 13, 17);
          ctx.fillStyle = delta >= 0 ? 'rgba(246,244,238,0.92)' : 'rgba(229,184,66,0.95)';
          ctx.fillText(text, p.x + 13, top + 0.5);
        });
      }
    };

    // Phones draw at 30fps; everything else at the display rate.
    let last = 0;
    const loop = (time: number) => {
      if (w >= 700 || time - last > 30) {
        last = time;
        draw(time);
      }
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    let ready = false;
    const kick = () => {
      if (ready && !still && !frame && visible && !document.hidden) {
        frame = requestAnimationFrame(loop);
      }
    };

    // Stay out of the way of first paint and hydration: draw and start
    // moving once the page has loaded and the main thread is idle.
    const begin = () => {
      const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
      idle(
        () => {
          resize();
          draw(still ? 9000 : performance.now());
          ready = true;
          kick();
        },
        { timeout: 2000 },
      );
    };
    if (document.readyState === 'complete') begin();
    else window.addEventListener('load', begin, { once: true });

    const ro = new ResizeObserver(() => {
      if (!ready) return;
      resize();
      if (still) draw(9000);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry!.isIntersecting;
      kick();
    });
    io.observe(canvas);
    const onMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', kick);

    return () => {
      window.removeEventListener('load', begin);
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', kick);
    };
  }, [intensity, markings, readouts]);

  return <canvas ref={ref} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}
