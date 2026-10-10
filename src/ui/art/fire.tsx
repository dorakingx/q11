/**
 * Fire parts. The flame silhouette is a two-tongue shape split exactly along x = 0 so the Y fire can be
 * drawn as a red left half and a blue right half without gradients or clip ids. Base anchor = bottom-centre.
 *   X = red flame + white "X" badge, Z = blue flame + "Z" badge, Y = split flame + "Y" badge.
 */
import type { CrewLetter } from '../../game';
import { ART, OUTLINE } from './palette';
import { LetterBadge, Part, type PartProps } from './primitives';

/* Left half of the outline, from the base (0,0) up the left side to the tip (0,-92). */
const LEFT = 'M0 0 C-26 0 -38 -16 -38 -36 C-38 -52 -30 -60 -32 -74 C-24 -66 -18 -58 -16 -48 C-10 -62 -4 -76 0 -92';
/* Right half, from the tip down the right side back to the base. */
const RIGHT = 'M0 -92 C6 -74 20 -62 28 -48 C36 -34 36 -14 22 -4 C16 0 8 0 0 0';
const FULL = `${LEFT} ${RIGHT} Z`;
/* Inner core (lighter), a smaller single tongue. */
const CORE = 'M0 -6 C-14 -6 -20 -16 -20 -28 C-20 -40 -12 -48 -8 -56 C-4 -46 2 -40 4 -32 C10 -40 10 -50 10 -56 C18 -46 20 -34 18 -24 C16 -12 10 -6 0 -6 Z';

export interface FlameProps extends PartProps {
  readonly letter: CrewLetter;
  /** Residual fire in a result view: adds a thick red outline. */
  readonly residual?: boolean;
  /** Dashed outline version used for the harmless-pattern ghost. */
  readonly ghost?: boolean;
}

export function Flame({ letter, residual = false, ghost = false, ...part }: FlameProps) {
  const fillL = letter === 'Z' ? ART.fireZ : ART.fireX;
  const fillR = letter === 'X' ? ART.fireX : ART.fireZ;
  const core = letter === 'X' ? ART.fireXCore : letter === 'Z' ? ART.fireZCore : ART.fireYCore;
  if (ghost) {
    return (
      <Part {...part}>
        <path d={FULL} fill={ART.paper} fillOpacity={0.6} stroke={ART.ghost} strokeWidth={OUTLINE} strokeDasharray="7 5" strokeLinejoin="round" />
        <LetterBadge cx={0} cy={-26} r={13} letter={letter} ink={ART.ghost} stroke={ART.ghost} />
      </Part>
    );
  }
  return (
    <Part {...part}>
      {residual ? <path d={FULL} fill="none" stroke={ART.danger} strokeWidth={OUTLINE * 3.2} strokeLinejoin="round" /> : null}
      <path d={`${LEFT} L0 0 Z`} fill={fillL} />
      <path d={`${RIGHT} L0 -92 Z`} fill={fillR} />
      <path d={CORE} fill={core} />
      <path d={FULL} fill="none" stroke={ART.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
      <LetterBadge cx={0} cy={-26} r={13} letter={letter} />
    </Part>
  );
}

/** Small smoke puffs rising from a fire or a district (no letters: smoke never reveals the fire type). */
export function Smoke({ size = 1, ...part }: PartProps & { readonly size?: number }) {
  return (
    <Part {...part} scale={(part.scale ?? 1) * size}>
      <g fill={ART.smoke} stroke={ART.ink} strokeWidth={OUTLINE * 0.8}>
        <circle cx={-10} cy={-18} r={14} />
        <circle cx={8} cy={-30} r={17} />
        <circle cx={-6} cy={-50} r={13} />
        <circle cx={14} cy={-66} r={11} />
      </g>
      <g fill={ART.smokeDark}>
        <circle cx={-14} cy={-14} r={7} />
        <circle cx={4} cy={-28} r={8} />
      </g>
    </Part>
  );
}

/** Steam after a fire goes out: pale puffs with a soft outline. */
export function SteamPuff(part: PartProps) {
  return (
    <Part {...part}>
      <g fill={ART.steam} stroke={ART.fogDark} strokeWidth={OUTLINE * 0.7}>
        <circle cx={-12} cy={-14} r={11} />
        <circle cx={6} cy={-22} r={13} />
        <circle cx={-2} cy={-40} r={9} />
        <circle cx={14} cy={-50} r={6} />
      </g>
    </Part>
  );
}

/** Green check mark used on an extinguished house. */
export function CheckMark(part: PartProps) {
  return (
    <Part {...part}>
      <circle cx={0} cy={-16} r={16} fill={ART.success} stroke={ART.ink} strokeWidth={OUTLINE * 0.8} />
      <path d="M-8 -16 L-2 -10 L9 -23" fill="none" stroke={ART.paper} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
    </Part>
  );
}
