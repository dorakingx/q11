/** Shared shapes for the mission copy (kid-friendly texts per district) and the fixture translations. */

/** The six mission ids, in play order (same ids as fixtures/missions.json). */
export const MISSION_IDS = ['first-alarm', 'red-forward-blue-backward', 'color-switch', 'blind-dispatch', 'two-kinds-of-trouble', 'silent-failure'] as const;
export type MissionId = (typeof MISSION_IDS)[number];

/** The four board-readable results (docs/UX_REDESIGN.md R9; `resultType()` in src/game/effects.ts). */
export type ResultType = 'restored' | 'safe-pattern' | 'still-burning' | 'logical-failure';

/** Two short sentences per result, no blame. */
export interface Reactions {
  readonly restored: string;
  readonly safePattern: string;
  readonly stillBurning: string;
  readonly logicalFailure: string;
}

export interface MissionCopy {
  /** District on the city map (EN: "Central District"; JA adds the EN name in parentheses). */
  readonly districtName: string;
  /** Short title a child reads on the map. */
  readonly kidTitle: string;
  /** ≤ 90 characters, one sentence a 10-year-old understands. */
  readonly goal: string;
  /** What to try first (beginner callout, separate from Challenge information). */
  readonly beginnerHint: string;
  /** The one thing this district teaches. */
  readonly lessonOneLiner: string;
  readonly reactions: Reactions;
  /** The short "Why?" explanation shown next to the comparison replay. */
  readonly whyShort: string;
  /** Heading of the "Details" fold (where jargon lives). */
  readonly detailsTitle: string;
}

export type VerdictKindKey = 'success' | 'logical-error' | 'detectable';

/** Faithful Japanese translation of one mission's texts in fixtures/missions.json. */
export interface FixtureCopyJa {
  readonly briefing: string;
  /** One caption per training lesson, same count and order as the fixture. */
  readonly training: readonly string[];
  readonly debrief: Readonly<Record<VerdictKindKey, string>>;
}
