/**
 * Shared building blocks for the art parts. Every part is a pure `<g>` fragment positioned by its
 * ground anchor (bottom-centre) through `Part`, so scenes can place it with {x, y, scale}.
 */
import type { ReactNode } from 'react';
import { ART, OUTLINE } from './palette';
import { fmt, FONT } from './util';

export interface PartProps {
  /** Ground anchor (bottom-centre) in parent SVG units. */
  readonly x: number;
  readonly y: number;
  /** 1 = 100-unit scale. */
  readonly scale?: number;
  /** Accessible name; omitted = decorative. */
  readonly title?: string;
  readonly className?: string;
}

export function Part({ x, y, scale = 1, title, className, children }: PartProps & { readonly children: ReactNode }) {
  const transform = scale === 1 ? `translate(${fmt(x)} ${fmt(y)})` : `translate(${fmt(x)} ${fmt(y)}) scale(${fmt(scale)})`;
  return (
    <g transform={transform} className={className} role={title === undefined ? undefined : 'img'} aria-label={title}>
      {title !== undefined ? <title>{title}</title> : null}
      {children}
    </g>
  );
}

export interface LetterBadgeProps {
  readonly cx: number;
  readonly cy: number;
  readonly r: number;
  readonly letter: string;
  /** Badge fill (default white) and letter colour (default ink). */
  readonly fill?: string;
  readonly ink?: string;
  readonly stroke?: string;
}

/** White disc with a bold letter — the shape-independent identifier of X / Z / Y / ! / ?. */
export function LetterBadge({ cx, cy, r, letter, fill = ART.paper, ink = ART.ink, stroke = ART.ink }: LetterBadgeProps) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={OUTLINE * 0.8} />
      <text x={cx} y={cy + r * 0.72} textAnchor="middle" fontSize={r * 1.9} fontWeight={800} fill={ink} fontFamily={FONT} style={{ userSelect: 'none' }}>
        {letter}
      </text>
    </g>
  );
}

/** Flat drop shadow under an object standing on the ground. */
export function GroundShadow({ cx, cy, rx, ry = rx * 0.32 }: { readonly cx: number; readonly cy: number; readonly rx: number; readonly ry?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={ART.shadow} />;
}
