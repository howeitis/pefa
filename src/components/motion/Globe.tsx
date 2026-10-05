import { useEffect, useRef } from 'react';
import { clubs } from '~/canon';
import { CITY_COORDS, HQ } from '~/data/cities';
import { prefersReducedMotion } from './hooks';

/**
 * A dotted globe turning slowly, with capital flowing out of Luxembourg to
 * every club city along great-circle arcs. Founders are marked in parchment,
 * the Synergy Draft™ pool in gold. Drag to spin it. Decorative: the section
 * around it lists the same cities as text. The land dots (2,254 of them,
 * from scripts/build-land-dots.mjs) load only when the globe nears the view.
 */

type Vec = [number, number, number];
const RAD = Math.PI / 180;
const toVec = (lat: number, lng: number): Vec => [
  Math.cos(lat * RAD) * Math.sin(lng * RAD),
  Math.sin(lat * RAD),
  Math.cos(lat * RAD) * Math.cos(lng * RAD),
];

function slerp(a: Vec, b: Vec, t: number): Vec {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const om = Math.acos(dot);
  if (om < 1e-6) return a;
  const s = Math.sin(om);
  const k1 = Math.sin((1 - t) * om) / s;
  const k2 = Math.sin(t * om) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
}

const SHADES = 10;
const shades: number[][] = Array.from({ length: SHADES }, () => []);

const sites = (() => {
  const seen = new Map<string, { vec: Vec; global: boolean }>();
  for (const c of clubs) {
    const at = CITY_COORDS[c.city];
    if (!at || seen.has(c.city)) continue;
    seen.set(c.city, { vec: toVec(at[0], at[1]), global: c.membership === 'global' });
  }
  return [...seen.values()];
})();

export function Globe({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const still = prefersReducedMotion();
    let land: Vec[] = [];
    let w = 0;
    let h = 0;
    let frame = 0;
    let visible = false;
    let yaw = -0.5;
    let spin = still ? 0 : 0.0018;
    let dragging: { x: number; yaw: number } | null = null;
    const tilt = 0.42;
    const hq = toVec(HQ.lat, HQ.lng);
    const arcs = sites.map((s) =>
      Array.from({ length: 41 }, (_, i) => {
        const v = slerp(hq, s.vec, i / 40);
        const lift = 1 + Math.sin((i / 40) * Math.PI) * 0.18;
        return [v[0] * lift, v[1] * lift, v[2] * lift] as Vec;
      }),
    );

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const t = time / 1000;
      const R = Math.min(w, h) * 0.43;
      const cx = w / 2;
      const cy = h / 2;
      const [sy, cyw, st, ct] = [Math.sin(yaw), Math.cos(yaw), Math.sin(tilt), Math.cos(tilt)];
      const rotate = (v: Vec): Vec => {
        const x = v[0] * cyw - v[2] * sy;
        const z1 = v[0] * sy + v[2] * cyw;
        return [x, v[1] * ct - z1 * st, v[1] * st + z1 * ct];
      };
      ctx.clearRect(0, 0, w, h);

      // Atmosphere and body.
      const halo = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.25);
      halo.addColorStop(0, 'rgba(229,184,66,0.10)');
      halo.addColorStop(1, 'rgba(229,184,66,0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2);
      ctx.fill();
      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, '#1a2234');
      body.addColorStop(1, '#0b0f19');
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(229,184,66,0.22)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Land, bucketed by depth so each shade is a single fill.
      for (const b of shades) b.length = 0;
      for (const v of land) {
        const p = rotate(v);
        if (p[2] <= 0) continue;
        const s = 0.9 + p[2] * 1.1;
        shades[Math.min(SHADES - 1, Math.floor(p[2] * SHADES))]!.push(
          cx + p[0] * R - s / 2,
          cy - p[1] * R - s / 2,
          s,
        );
      }
      shades.forEach((b, i) => {
        if (!b.length) return;
        ctx.fillStyle = `rgba(246,244,238,${(0.1 + ((i + 0.5) / SHADES) * 0.5).toFixed(3)})`;
        ctx.beginPath();
        for (let k = 0; k < b.length; k += 3) ctx.rect(b[k]!, b[k + 1]!, b[k + 2]!, b[k + 2]!);
        ctx.fill();
      });

      // Arcs: a faint path, and a bright pulse travelling out from HQ.
      arcs.forEach((arc, i) => {
        const pts = arc.map(rotate);
        const seen = (p: Vec) => p[2] > 0 || p[0] * p[0] + p[1] * p[1] > 1;
        ctx.strokeStyle = 'rgba(229,184,66,0.16)';
        ctx.beginPath();
        let pen = false;
        for (const p of pts) {
          if (!seen(p)) {
            pen = false;
            continue;
          }
          const [x, y] = [cx + p[0] * R, cy - p[1] * R];
          if (pen) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
          pen = true;
        }
        ctx.stroke();
        const head = ((t * 0.32 + i * 0.137) % 1.4) * pts.length;
        ctx.lineWidth = 1.6;
        for (let k = Math.max(1, Math.floor(head - 10)); k < Math.min(pts.length, head); k++) {
          const [a, b] = [pts[k - 1]!, pts[k]!];
          if (!seen(a) || !seen(b)) continue;
          ctx.strokeStyle = `rgba(255,214,120,${(1 - (head - k) / 10) * 0.95})`;
          ctx.beginPath();
          ctx.moveTo(cx + a[0] * R, cy - a[1] * R);
          ctx.lineTo(cx + b[0] * R, cy - b[1] * R);
          ctx.stroke();
        }
        ctx.lineWidth = 1;
      });

      sites.forEach((s, i) => {
        const p = rotate(s.vec);
        if (p[2] <= 0.02) return;
        const [x, y] = [cx + p[0] * R, cy - p[1] * R];
        const pulse = (t * 0.6 + i * 0.29) % 1;
        ctx.strokeStyle = s.global
          ? `rgba(229,184,66,${(1 - pulse) * 0.6})`
          : `rgba(246,244,238,${(1 - pulse) * 0.45})`;
        ctx.beginPath();
        ctx.arc(x, y, 2 + pulse * 9, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = s.global ? '#e5b842' : '#f6f4ee';
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      const q = rotate(hq);
      if (q[2] > 0) {
        const [x, y] = [cx + q[0] * R, cy - q[1] * R];
        ctx.fillStyle = '#e5b842';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(229,184,66,0.8)';
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.stroke();
        ctx.font = `500 10px ${getComputedStyle(canvas).getPropertyValue('--font-mono')}`;
        ctx.fillStyle = 'rgba(246,244,238,0.9)';
        ctx.fillText('LU · HQ', x + 14, y + 3);
      }
    };

    const loop = (time: number) => {
      if (!dragging) yaw += spin;
      draw(time);
      frame = visible && !document.hidden && !still ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);
    let loaded = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry!.isIntersecting;
        if (visible && !loaded) {
          loaded = true;
          void import('~/data/land-dots.json').then((m) => {
            const flat = m.default as number[];
            for (let i = 0; i < flat.length; i += 2) land.push(toVec(flat[i]!, flat[i + 1]!));
            land = [...land];
            draw(performance.now());
            kick();
          });
        }
        kick();
      },
      { rootMargin: '200px' },
    );
    io.observe(canvas);

    const down = (e: PointerEvent) => {
      dragging = { x: e.clientX, yaw };
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      yaw = dragging.yaw + (e.clientX - dragging.x) * 0.006;
      if (still) draw(performance.now());
    };
    const up = () => {
      dragging = null;
      spin = still ? 0 : 0.0018;
    };
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    document.addEventListener('visibilitychange', kick);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', kick);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`block aspect-square w-full cursor-grab touch-pan-y active:cursor-grabbing ${className}`}
    />
  );
}
