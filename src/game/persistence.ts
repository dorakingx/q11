/**
 * Versioned save data in localStorage["q11.save.v1"] (the key is kept across versions so no existing save is stranded).
 * v1 saves are migrated to v2 on read; corrupt or unknown data ⇒ reset with a visible notice.
 * Storage unavailable (Qollab sandbox, private mode) ⇒ in-memory only, silently.
 */
import type { Language, MissionProgress, SaveData, Settings } from './types';
import { SAVE_VERSION } from './types';

/** Storage key. Deliberately unchanged in v2: `parseSave` migrates v1 data found under it. */
export const SAVE_KEY = 'q11.save.v1';

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export const DEFAULT_SETTINGS: Settings = { sound: false, reducedMotion: false, language: 'en', freeRoam: false };

export function defaultSave(): SaveData {
  return { version: SAVE_VERSION, progress: {}, settings: DEFAULT_SETTINGS, tutorialDone: false };
}

export const RESET_NOTICE = 'Saved progress was unreadable and has been reset.';

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function parseProgress(v: unknown): Record<string, MissionProgress> | null {
  if (!isRecord(v)) return null;
  const out: Record<string, MissionProgress> = {};
  for (const [id, raw] of Object.entries(v)) {
    if (!isRecord(raw)) return null;
    const stars = raw['stars'];
    const attempts = raw['attempts'];
    const completed = raw['completed'];
    if (stars !== 0 && stars !== 1 && stars !== 2 && stars !== 3) return null;
    if (typeof attempts !== 'number' || !Number.isInteger(attempts) || attempts < 0) return null;
    if (typeof completed !== 'boolean') return null;
    out[id] = { stars, attempts, completed };
  }
  return out;
}

function isLanguage(v: unknown): v is Language {
  return v === 'en' || v === 'ja';
}

/** v1 settings: { sound, reducedMotion }. Missing v2 fields get their defaults. */
function parseSettingsV1(v: unknown): Settings | null {
  if (!isRecord(v)) return null;
  const sound = v['sound'];
  const reducedMotion = v['reducedMotion'];
  if (typeof sound !== 'boolean' || typeof reducedMotion !== 'boolean') return null;
  return { sound, reducedMotion, language: DEFAULT_SETTINGS.language, freeRoam: DEFAULT_SETTINGS.freeRoam };
}

/** v2 settings: every field present and well-typed. */
function parseSettingsV2(v: unknown): Settings | null {
  const base = parseSettingsV1(v);
  if (base === null || !isRecord(v)) return null;
  const language = v['language'];
  const freeRoam = v['freeRoam'];
  if (!isLanguage(language) || typeof freeRoam !== 'boolean') return null;
  return { sound: base.sound, reducedMotion: base.reducedMotion, language, freeRoam };
}

/**
 * Strict parser: accepts a well-formed v1 or v2 save and always returns v2; anything else → null.
 * v1 → v2: progress and settings kept, language 'en', freeRoam false, tutorialDone = any progress recorded.
 */
export function parseSave(text: string | null): SaveData | null {
  if (text === null) return null;
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return null;
  }
  if (!isRecord(raw)) return null;
  const version = raw['version'];
  if (version === 1) {
    const progress = parseProgress(raw['progress']);
    const settings = parseSettingsV1(raw['settings']);
    if (progress === null || settings === null) return null;
    return { version: SAVE_VERSION, progress, settings, tutorialDone: Object.keys(progress).length > 0 };
  }
  if (version === SAVE_VERSION) {
    const progress = parseProgress(raw['progress']);
    const settings = parseSettingsV2(raw['settings']);
    const tutorialDone = raw['tutorialDone'];
    if (progress === null || settings === null || typeof tutorialDone !== 'boolean') return null;
    return { version: SAVE_VERSION, progress, settings, tutorialDone };
  }
  return null;
}

export interface LoadResult {
  readonly save: SaveData;
  /** Set when stored data existed but was unreadable (and has been replaced). */
  readonly notice: string | null;
}

export function loadSave(storage: StorageLike | null): LoadResult {
  if (storage === null) return { save: defaultSave(), notice: null };
  let text: string | null;
  try {
    text = storage.getItem(SAVE_KEY);
  } catch {
    return { save: defaultSave(), notice: null };
  }
  if (text === null) return { save: defaultSave(), notice: null };
  const parsed = parseSave(text);
  if (parsed !== null) return { save: parsed, notice: null };
  const fresh = defaultSave();
  try {
    storage.setItem(SAVE_KEY, JSON.stringify(fresh));
  } catch {
    /* storage may be read-only; in-memory state still works */
  }
  return { save: fresh, notice: RESET_NOTICE };
}

export function writeSave(storage: StorageLike | null, save: SaveData): boolean {
  if (storage === null) return false;
  try {
    storage.setItem(SAVE_KEY, JSON.stringify(save));
    return true;
  } catch {
    return false;
  }
}

/** Simple in-memory StorageLike for environments without web storage. */
export function memoryStorage(): StorageLike {
  const m = new Map<string, string>();
  return {
    getItem: (k) => m.get(k) ?? null,
    setItem: (k, v) => {
      m.set(k, v);
    },
    removeItem: (k) => {
      m.delete(k);
    },
  };
}

/** Pick browser localStorage if it works, otherwise null. */
export function detectStorage(): StorageLike | null {
  try {
    const ls = globalThis.localStorage;
    const probe = '__q11_probe__';
    ls.setItem(probe, '1');
    ls.removeItem(probe);
    return ls;
  } catch {
    return null;
  }
}
