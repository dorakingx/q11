/**
 * Water parts. Water is pale cyan with ROUND drops and white highlights — never a flame silhouette and
 * never the Z-blue (#2f7fe6), so a blue Z fire and a water stream cannot be confused.
 */
import { ART, OUTLINE } from './palette';
import { Part, type PartProps } from './primitives';
import { fmt } from './util';

export interface StreamProps {
  /** Nozzle position. */
  readonly from: { readonly x: number; readonly y: number };
  /** Impact position (base of the target fire). */
  readonly to: { readonly x: number; readonly y: number };
  /** How much of the arc is drawn, 0–1 (animation progress; 1 = reaches the target). */
  readonly progress?: number;
  /** Arc height in units (default: proportional to distance). */
  readonly lift?: number;
  readonly title?: string;
  readonly className?: string;
}

/** Hose stream: a thick pale-cyan arc with a white highlight and drops along the way. */
export function Stream({ from, to, progress = 1, lift, title, className }: StreamProps) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy);
  const h = lift ?? Math.max(28, dist * 0.35);
  const cx = (from.x + to.x) / 2;
  const cy = Math.min(from.y, to.y) - h;
  const p = Math.max(0, Math.min(1, progress));
  // Quadratic Bézier, cut at t = p by De Casteljau.
  const q1 = { x: from.x + (cx - from.x) * p, y: from.y + (cy - from.y) * p };
  const q2 = { x: cx + (to.x - cx) * p, y: cy + (to.y - cy) * p };
  const end = { x: q1.x + (q2.x - q1.x) * p, y: q1.y + (q2.y - q1.y) * p };
  const d = `M${fmt(from.x)} ${fmt(from.y)} Q${fmt(q1.x)} ${fmt(q1.y)} ${fmt(end.x)} ${fmt(end.y)}`;
  const drops: { x: number; y: number; r: number }[] = [];
  for (let i = 1; i <= 4; i++) {
    const t = (i / 5) * p;
    const mt = 1 - t;
    const x = mt * mt * from.x + 2 * mt * t * cx + t * t * to.x;
    const y = mt * mt * from.y + 2 * mt * t * cy + t * t * to.y;
    drops.push({ x: x + (i % 2 === 0 ? 9 : -9), y: y + 10 + (i % 2) * 4, r: 3.2 + (i % 3) });
  }
  return (
    <g className={className} role={title === undefined ? undefined : 'img'} aria-label={title}>
      {title !== undefined ? <title>{title}</title> : null}
      <path d={d} fill="none" stroke={ART.waterDeep} strokeWidth={13} strokeLinecap="round" />
      <path d={d} fill="none" stroke={ART.water} strokeWidth={9} strokeLinecap="round" />
      <path d={d} fill="none" stroke={ART.waterHighlight} strokeWidth={2.4} strokeLinecap="round" strokeDasharray="10 14" />
      {drops.map((dr, i) => (
        <g key={i}>
          <circle cx={dr.x} cy={dr.y} r={dr.r} fill={ART.water} stroke={ART.waterDeep} strokeWidth={1.2} />
          <circle cx={dr.x - dr.r * 0.3} cy={dr.y - dr.r * 0.3} r={dr.r * 0.3} fill={ART.waterHighlight} />
        </g>
      ))}
      {p >= 1 ? <circle cx={to.x} cy={to.y} r={8} fill={ART.water} stroke={ART.waterDeep} strokeWidth={1.5} /> : null}
    </g>
  );
}

export interface SplashProps extends PartProps {
  /** 0–1 spread of the radiating drops. */
  readonly spread?: number;
}

/** Splash at the impact point: radiating drops + a flat puddle ring. Anchor = impact point. */
export function Splash({ spread = 1, ...part }: SplashProps) {
  const s = 0.4 + 0.6 * Math.max(0, Math.min(1, spread));
  const drops = [-150, -115, -80, -50, -25, 0, 30].map((deg, i) => {
    const a = (deg * Math.PI) / 180;
    const r = (26 + (i % 2) * 10) * s;
    return { x: Math.cos(a) * r, y: Math.sin(a) * r - 4, size: 3.5 + (i % 3) * 1.2 };
  });
  return (
    <Part {...part}>
      <ellipse cx={0} cy={2} rx={26 * s} ry={7 * s} fill={ART.water} stroke={ART.waterDeep} strokeWidth={1.5} />
      <ellipse cx={-6 * s} cy={1} rx={8 * s} ry={2.2 * s} fill={ART.waterHighlight} />
      {drops.map((d, i) => (
        <g key={i}>
          <line x1={0} y1={-4} x2={d.x * 0.55} y2={d.y * 0.55} stroke={ART.water} strokeWidth={2.2} strokeLinecap="round" />
          <circle cx={d.x} cy={d.y} r={d.size} fill={ART.water} stroke={ART.waterDeep} strokeWidth={1.2} />
          <circle cx={d.x - d.size * 0.3} cy={d.y - d.size * 0.3} r={d.size * 0.3} fill={ART.waterHighlight} />
        </g>
      ))}
    </Part>
  );
}

/** A single water drop (icon for the water/"spray" button). */
export function Drop(part: PartProps) {
  return (
    <Part {...part}>
      <path d="M0 -40 C8 -26 16 -18 16 -8 A16 16 0 0 1 -16 -8 C-16 -18 -8 -26 0 -40 Z" fill={ART.water} stroke={ART.waterDeep} strokeWidth={OUTLINE} strokeLinejoin="round" />
      <ellipse cx={-6} cy={-12} rx={3.5} ry={5} fill={ART.waterHighlight} />
    </Part>
  );
}
