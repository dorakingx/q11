/**
 * Public entry of the i18n module.
 *
 *   import { LanguageProvider, useT, useLanguage, missionCopy, type Lang, type Key } from '../i18n';
 *
 * This file only re-exports: the component lives in LanguageProvider.tsx, hooks in hooks.ts, the pure core in
 * core.ts and the mission copy in missions.ts, each of which is fast-refresh clean on its own. The react-refresh rule
 * cannot see through re-exports and would flag this barrel for mixing a component with hooks, so it is switched off
 * for this one file (no component is defined here; see docs/I18N.md).
 */
/* eslint-disable react-refresh/only-export-components */
export { LanguageProvider, type LanguageProviderProps } from './LanguageProvider';
export { useLanguage, useT } from './hooks';
export { DEFAULT_LANG, DICTIONARIES, LANGS, LANGUAGE_NAMES, interpolate, isLang, languageFromTag, plural, translate, translator, type Lang, type Params, type PluralBase, type Translate } from './core';
export { en, type Key } from './en';
export { ja } from './ja';
export {
  MISSION_IDS,
  briefingText,
  debriefNarrative,
  fixtureCopyJa,
  isMissionId,
  missionCopy,
  reactionFor,
  trainingCaption,
  type FixtureCopyJa,
  type MissionCopy,
  type MissionId,
  type ResultType,
  type VerdictKindKey,
} from './missions';
export type { Reactions } from './types';
