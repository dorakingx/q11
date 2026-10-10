/**
 * Mission copy API: kid-friendly district texts in EN/JA plus faithful Japanese translations of the fixture texts.
 * Pure functions, no React, no fixture import (the UI already holds the English fixture texts through
 * PublicMissionView / Debrief; pass them in and get the language-appropriate text back).
 */
import type { Lang } from './core';
import { FIXTURES_JA } from './fixtures.ja';
import { MISSIONS_EN } from './missions.en';
import { MISSIONS_JA } from './missions.ja';
import { MISSION_IDS, type FixtureCopyJa, type MissionCopy, type MissionId, type ResultType, type VerdictKindKey } from './types';

export function isMissionId(v: unknown): v is MissionId {
  return typeof v === 'string' && (MISSION_IDS as readonly string[]).includes(v);
}

function requireMissionId(id: string): MissionId {
  if (!isMissionId(id)) throw new Error(`unknown mission '${id}'`);
  return id;
}

const COPY: Readonly<Record<Lang, Readonly<Record<MissionId, MissionCopy>>>> = { en: MISSIONS_EN, ja: MISSIONS_JA };

/** Kid copy for one district in one language. Throws on an unknown id (same contract as getPublicMission). */
export function missionCopy(id: string, lang: Lang): MissionCopy {
  return COPY[lang][requireMissionId(id)];
}

/** Japanese translation of a mission's fixtures/missions.json texts. Throws on an unknown id. */
export function fixtureCopyJa(id: string): FixtureCopyJa {
  return FIXTURES_JA[requireMissionId(id)];
}

/** The fixture briefing in the requested language (`enText` = PublicMissionView.briefing). */
export function briefingText(id: string, lang: Lang, enText: string): string {
  return lang === 'ja' ? fixtureCopyJa(id).briefing : enText;
}

/** One training caption (`enText` = PublicMissionView.training[lesson].caption); falls back to English if the index is out of range. */
export function trainingCaption(id: string, lesson: number, lang: Lang, enText: string): string {
  if (lang !== 'ja') return enText;
  return fixtureCopyJa(id).training[lesson] ?? enText;
}

/** The debrief narrative for a verdict (`enText` = Debrief.narrative). */
export function debriefNarrative(id: string, verdict: VerdictKindKey, lang: Lang, enText: string): string {
  return lang === 'ja' ? fixtureCopyJa(id).debrief[verdict] : enText;
}

/** Picks the two-sentence reaction for a board result type (`resultType()` in src/game/effects.ts). */
export function reactionFor(copy: MissionCopy, result: ResultType): string {
  switch (result) {
    case 'restored':
      return copy.reactions.restored;
    case 'safe-pattern':
      return copy.reactions.safePattern;
    case 'still-burning':
      return copy.reactions.stillBurning;
    case 'logical-failure':
      return copy.reactions.logicalFailure;
  }
}

export { MISSION_IDS };
export type { FixtureCopyJa, MissionCopy, MissionId, ResultType, VerdictKindKey };
