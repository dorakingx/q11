/**
 * Static house-state derivation for the Scene when no spray frame is playing (no React).
 * Challenge (fog) → every house identical; training / replay → true fires; result → the four readable outcomes,
 * every letter read from the engine residual string (never recomputed).
 */
import { fromString, letterAt, type PauliLetter } from '../../quantum';
import type { CrewLetter, ResultType } from '../../game';
import type { HouseState } from '../art';

export function letterOf(s: string | null | undefined, q: number): PauliLetter {
  if (s === null || s === undefined || s.length === 0) return 'I';
  const p = fromString(s);
  return q < p.n ? letterAt(p, q) : 'I';
}

export function asCrew(l: PauliLetter): CrewLetter | null {
  return l === 'I' ? null : l;
}

export interface StaticStateInput {
  readonly fog: boolean;
  readonly fires: string | null;
  readonly crews: string | null;
  readonly residual: string | null;
  readonly result: ResultType | null;
  /** Lane boards: fires sit in the houses only when the time cursor has reached the output. */
  readonly atOutput: boolean;
}

export function staticHouseState(input: StaticStateInput, q: number): HouseState {
  if (input.fog) return { kind: 'fog' };
  const fire = input.atOutput ? letterOf(input.fires, q) : 'I';
  const crew = letterOf(input.crews, q);
  if (input.residual !== null) {
    const r = letterOf(input.residual, q);
    const result = input.result;
    if (r !== 'I') {
      if (result === 'safe-pattern') return { kind: 'ghost', letter: r };
      if (result === 'logical-failure') return { kind: 'fire', letter: r };
      return { kind: 'residual', letter: r };
    }
    if (fire !== 'I' || crew !== 'I') return result === null ? { kind: 'out' } : { kind: 'restored' };
    return { kind: 'normal' };
  }
  if (fire !== 'I') return { kind: 'fire', letter: fire };
  return { kind: 'normal' };
}

/** The beacon's anomaly letter from the engine's logical flip bits (X, Z or Y = both); null when nothing flipped. */
export function anomalyLetter(flip: { readonly x: readonly boolean[]; readonly z: readonly boolean[] }): CrewLetter | null {
  const x = flip.x.some(Boolean);
  const z = flip.z.some(Boolean);
  if (x && z) return 'Y';
  if (x) return 'X';
  if (z) return 'Z';
  return null;
}
