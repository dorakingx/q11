/**
 * Original SVG glyphs. Every token is identifiable by shape + letter + colour (never colour alone):
 *   fire   = flame glyph, red (X) / blue (Z) / split red+blue (Y), with the letter at the base
 *   crew   = helmet badge with the letter
 *   station = diamond "Z" (red-type stations notice red fires) / square "X" (blue-type notice blue fires)
 */
import type { CrewLetter } from '../game';
import { COLOURS } from './theme';

const FLAME_PATH = 'M12 1.5c1.3 4.4 4.6 8.6 4.6 13.9a4.6 4.6 0 0 1-9.2 0c0-3 2-4.6 2-7 0-1.1-.5-1.9-.8-2.5 1.5.6 2.2 1.9 2.4 2.8C11.8 7 12 4.6 12 1.5Z';

export interface FlameProps {
  readonly letter: CrewLetter;
  readonly size?: number;
  /** Outlined variant for residual fires (debrief). */
  readonly outlined?: boolean;
  readonly title?: string;
}

/** Flame glyph in a 24×24 box. Y is split vertically: left half red, right half blue. */
export function Flame({ letter, size = 28, outlined = false, title }: FlameProps) {
  const id = `flame-${letter}-${outlined ? 'o' : 'f'}`;
  const fill = letter === 'Y' ? `url(#${id}-split)` : COLOURS[letter];
  return (
    <svg className={`glyph glyph-flame glyph-${letter}`} width={size} height={size} viewBox="0 0 24 24" aria-hidden={title === undefined} role={title === undefined ? undefined : 'img'}>
      {title !== undefined ? <title>{title}</title> : null}
      {letter === 'Y' ? (
        <defs>
          <linearGradient id={`${id}-split`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={COLOURS.X} />
            <stop offset="0.5" stopColor={COLOURS.X} />
            <stop offset="0.5" stopColor={COLOURS.Z} />
            <stop offset="1" stopColor={COLOURS.Z} />
          </linearGradient>
        </defs>
      ) : null}
      <path d={FLAME_PATH} fill={fill} fillOpacity={outlined ? 0.35 : 1} stroke={outlined ? COLOURS.text : 'rgba(0,0,0,0.35)'} strokeWidth={outlined ? 1.6 : 0.8} />
      <text x="12" y="22.6" textAnchor="middle" fontSize="6.5" fontWeight="700" fill={COLOURS.text} fontFamily="system-ui, sans-serif">
        {outlined ? 'R' : letter}
      </text>
    </svg>
  );
}

export interface HelmetProps {
  readonly letter: CrewLetter;
  readonly size?: number;
  readonly title?: string;
}

/** Firefighter helmet badge: brim + dome, with the crew letter. */
export function Helmet({ letter, size = 24, title }: HelmetProps) {
  return (
    <svg className={`glyph glyph-helmet glyph-${letter}`} width={size} height={size} viewBox="0 0 24 24" aria-hidden={title === undefined} role={title === undefined ? undefined : 'img'}>
      {title !== undefined ? <title>{title}</title> : null}
      <circle cx="12" cy="12" r="11" fill={COLOURS.navy} stroke={COLOURS[letter]} strokeWidth="2" />
      <path d="M5.5 13.5a6.5 6.5 0 0 1 13 0Z" fill={COLOURS[letter]} />
      <rect x="4" y="13.2" width="16" height="2.4" rx="1.2" fill={COLOURS.text} />
      <text x="12" y="21.2" textAnchor="middle" fontSize="6.6" fontWeight="800" fill={COLOURS.text} fontFamily="system-ui, sans-serif">
        {letter}
      </text>
    </svg>
  );
}

export interface StationGlyphProps {
  readonly type: 'X' | 'Z';
  readonly ringing: boolean;
  readonly size?: number;
  readonly title?: string;
}

/** Stand-alone station glyph for lists (the board draws its own stations inline). */
export function StationGlyph({ type, ringing, size = 22, title }: StationGlyphProps) {
  return (
    <svg className={`glyph glyph-station ${ringing ? 'is-ringing' : ''}`} width={size} height={size} viewBox="-14 -14 28 28" aria-hidden={title === undefined} role={title === undefined ? undefined : 'img'}>
      {title !== undefined ? <title>{title}</title> : null}
      <StationShape type={type} ringing={ringing} r={10} />
    </svg>
  );
}

export interface StationShapeProps {
  readonly type: 'X' | 'Z';
  readonly ringing: boolean;
  /** Half-size in SVG units. */
  readonly r: number;
}

/** The station shape centred at (0,0): diamond for Z checks, square for X checks. */
export function StationShape({ type, ringing, r }: StationShapeProps) {
  const stroke = ringing ? COLOURS.alarm : type === 'Z' ? COLOURS.X : COLOURS.Z;
  const fill = ringing ? COLOURS.alarm : COLOURS.panel;
  const textFill = ringing ? COLOURS.navy : COLOURS.text;
  const shape =
    type === 'Z' ? (
      <polygon points={`0,${String(-r)} ${String(r)},0 0,${String(r)} ${String(-r)},0`} fill={fill} stroke={stroke} strokeWidth={ringing ? 3 : 1.6} strokeLinejoin="round" />
    ) : (
      <rect x={-r * 0.85} y={-r * 0.85} width={r * 1.7} height={r * 1.7} rx={r * 0.18} fill={fill} stroke={stroke} strokeWidth={ringing ? 3 : 1.6} />
    );
  return (
    <g className={ringing ? 'station-shape is-ringing' : 'station-shape'}>
      {ringing ? <circle r={r * 1.45} fill="none" stroke={COLOURS.alarm} strokeWidth={1.2} opacity={0.7} className="station-pulse" /> : null}
      {shape}
      <text y={r * 0.42} textAnchor="middle" fontSize={r * 1.05} fontWeight={800} fill={textFill} fontFamily="system-ui, sans-serif">
        {ringing ? '!' : type}
      </text>
    </g>
  );
}

export function StarIcon({ filled, size = 22 }: { readonly filled: boolean; readonly size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={filled ? 'star is-filled' : 'star'}>
      <path d="M12 2.5l2.9 6.2 6.7.8-5 4.6 1.4 6.7L12 17.4 6 20.8l1.4-6.7-5-4.6 6.7-.8Z" fill={filled ? COLOURS.alarm : 'none'} stroke={filled ? COLOURS.alarm : COLOURS.muted} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function GearIcon({ size = 22 }: { readonly size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm8.3 2.2-1.9-.4a6.9 6.9 0 0 0-.7-1.7l1.1-1.6-1.8-1.8-1.6 1.1a6.9 6.9 0 0 0-1.7-.7l-.4-1.9h-2.6l-.4 1.9a6.9 6.9 0 0 0-1.7.7L7 5.2 5.2 7l1.1 1.6a6.9 6.9 0 0 0-.7 1.7l-1.9.4v2.6l1.9.4a6.9 6.9 0 0 0 .7 1.7L5.2 17 7 18.8l1.6-1.1a6.9 6.9 0 0 0 1.7.7l.4 1.9h2.6l.4-1.9a6.9 6.9 0 0 0 1.7-.7l1.6 1.1 1.8-1.8-1.1-1.6a6.9 6.9 0 0 0 .7-1.7l1.9-.4Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

/** The Q11 mark (same geometry as public/icon.svg), inlined so the Qollab bundle needs no asset URL. */
export function Q11Mark({ size = 72 }: { readonly size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" role="img" aria-label="Q11 mark: a Q-shaped protective ring with a small flame inside">
      <g fill="none" stroke="#8fc1ff" strokeWidth="56" strokeLinecap="round">
        <circle cx="248" cy="240" r="170" />
        <line x1="334" y1="326" x2="424" y2="416" />
      </g>
      <path fill="#ff5a3c" transform="translate(158 125.2) scale(0.8)" d="M116 14 C128 58 160 102 160 190 A60 60 0 0 1 40 190 C40 150 66 134 66 104 C66 90 60 80 56 72 C76 80 84 96 86 108 C98 86 100 56 116 14 Z" />
    </svg>
  );
}
