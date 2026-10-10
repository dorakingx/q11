/**
 * Small firefighter (≈60 units tall at scale 1). Helmet colour + letter identify the crew (X red, Z blue,
 * Y purple). Poses: idle, run (2 frames), spray (holding the hose nozzle). Faces +x by default.
 * Anchor = bottom-centre between the boots.
 */
import type { CrewLetter } from '../../game';
import { ART, OUTLINE, OUTLINE_THIN } from './palette';
import { LetterBadge, GroundShadow, Part, type PartProps } from './primitives';
import { letterColour } from './util';

export type CrewPose = 'idle' | 'run1' | 'run2' | 'spray';

export interface FirefighterProps extends PartProps {
  readonly letter: CrewLetter;
  readonly pose?: CrewPose;
  /** 1 = faces right, -1 = faces left. */
  readonly facing?: 1 | -1;
  /** Draw the ground shadow (default true). */
  readonly shadow?: boolean;
}

export function Firefighter({ letter, pose = 'idle', facing = 1, shadow = true, ...part }: FirefighterProps) {
  const colour = letterColour(letter);
  const legs = legsFor(pose);
  return (
    <Part {...part}>
      {shadow ? <GroundShadow cx={0} cy={1} rx={16} ry={4.5} /> : null}
      <g transform={facing === -1 ? 'scale(-1 1)' : undefined}>
        {/* back arm (spray / run) */}
        {pose === 'spray' ? <path d="M-4 -40 L18 -34" stroke={ART.jacket} strokeWidth={7} strokeLinecap="round" /> : null}
        {/* legs */}
        <g stroke={ART.ink} strokeWidth={OUTLINE_THIN} strokeLinejoin="round">
          <path d={legs.back} fill={ART.jacket} />
          <path d={legs.front} fill={ART.jacket} />
        </g>
        {/* boots */}
        <rect x={legs.bootBack - 6} y={-7} width={12} height={7} rx={2} fill={ART.boots} />
        <rect x={legs.bootFront - 6} y={-7} width={12} height={7} rx={2} fill={ART.boots} />
        {/* jacket */}
        <path d="M-13 -24 L-13 -44 Q-13 -48 -9 -48 L9 -48 Q13 -48 13 -44 L13 -24 Z" fill={ART.jacket} stroke={ART.ink} strokeWidth={OUTLINE_THIN} strokeLinejoin="round" />
        <rect x={-13} y={-36} width={26} height={3.5} fill={ART.jacketStripe} />
        <rect x={-13} y={-29} width={26} height={3.5} fill={ART.jacketStripe} />
        {/* arms */}
        {pose === 'spray' ? (
          <>
            <path d="M6 -42 L30 -36" stroke={ART.jacket} strokeWidth={7} strokeLinecap="round" />
            <path d="M6 -42 L30 -36" stroke={ART.jacketStripe} strokeWidth={2} strokeLinecap="round" strokeDasharray="3 6" />
            {/* nozzle */}
            <rect x={22} y={-40} width={14} height={9} rx={2} fill={ART.inkSoft} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
            <rect x={34} y={-38} width={5} height={5} fill={ART.hose} stroke={ART.ink} strokeWidth={1} />
          </>
        ) : pose === 'idle' ? (
          <>
            <path d="M-13 -44 L-16 -27" stroke={ART.jacket} strokeWidth={6} strokeLinecap="round" />
            <path d="M13 -44 L16 -27" stroke={ART.jacket} strokeWidth={6} strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d={pose === 'run1' ? 'M-12 -44 L-20 -33' : 'M-12 -44 L-6 -30'} stroke={ART.jacket} strokeWidth={6} strokeLinecap="round" />
            <path d={pose === 'run1' ? 'M12 -44 L18 -30' : 'M12 -44 L22 -36'} stroke={ART.jacket} strokeWidth={6} strokeLinecap="round" />
          </>
        )}
        {/* head */}
        <circle cx={0} cy={-55} r={9.5} fill={ART.skin} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
        <circle cx={3.5} cy={-56} r={1.4} fill={ART.ink} />
        {/* helmet: dome + brim + letter */}
        <path d="M-14 -58 Q-14 -80 0 -80 Q14 -80 14 -58 Z" fill={colour} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
        <rect x={-17} y={-60} width={34} height={4.5} rx={2} fill={colour} stroke={ART.ink} strokeWidth={OUTLINE_THIN} />
        <g transform={facing === -1 ? 'scale(-1 1)' : undefined}>
          <LetterBadge cx={0} cy={-69} r={7.5} letter={letter} />
        </g>
      </g>
    </Part>
  );
}

function legsFor(pose: CrewPose): { back: string; front: string; bootBack: number; bootFront: number } {
  switch (pose) {
    case 'idle':
      return { back: 'M-10 -24 L-10 -6 L-1 -6 L-1 -24 Z', front: 'M1 -24 L1 -6 L10 -6 L10 -24 Z', bootBack: -5.5, bootFront: 5.5 };
    case 'run1':
      return { back: 'M-4 -24 L-18 -8 L-11 -4 L2 -20 Z', front: 'M2 -24 L14 -10 L8 -5 L-5 -19 Z', bootBack: -15, bootFront: 12 };
    case 'run2':
      return { back: 'M-3 -24 L-9 -6 L0 -6 L5 -22 Z', front: 'M1 -24 L8 -9 L14 -11 L10 -24 Z', bootBack: -5, bootFront: 11 };
    case 'spray':
      return { back: 'M-6 -24 L-14 -6 L-6 -6 L2 -22 Z', front: 'M2 -24 L8 -6 L16 -6 L10 -24 Z', bootBack: -10, bootFront: 12 };
  }
}

/** Helmet only — a compact crew chip for palettes and legends. Anchor = bottom-centre of the brim. */
export function HelmetChip({ letter, ...part }: PartProps & { readonly letter: CrewLetter }) {
  const colour = letterColour(letter);
  return (
    <Part {...part}>
      <path d="M-22 -8 Q-22 -40 0 -40 Q22 -40 22 -8 Z" fill={colour} stroke={ART.ink} strokeWidth={OUTLINE} />
      <rect x={-27} y={-10} width={54} height={8} rx={4} fill={colour} stroke={ART.ink} strokeWidth={OUTLINE} />
      <LetterBadge cx={0} cy={-22} r={10} letter={letter} />
    </Part>
  );
}
