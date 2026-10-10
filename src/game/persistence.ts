/**
 * Versioned save data in localStorage["q11.save.v1"]. Corrupt or unknown data ⇒ reset with a visible notice.
 * Storage unavailable (Qollab sandbox, private mode) ⇒ in-memory only, silently.
 */
import type { MissionProgress, SaveData, Settings } from './types';
import { SAVE_VERSION } from './types';

export const SAVE_KEY = 'q11.save.v1';

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export const DEFAULT_SETTINGS: Settings = { sound: false, reducedMotion: false };

export function defaultSave(): SaveData {
  return { version: SAVE_VERSION, progress: {}, settings: DEFAULT_SETTINGS };
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

function parseSettings(v: unknown): Settings | null {
  if (!isRecord(v)) return null;
  const sound = v['sound'];
  const reducedMotion = v['reducedMotion'];
  if (typeof sound !== 'boolean' || typeof reducedMotion !== 'boolean') return null;
  return { sound, reducedMotion };
}

/** Strict parser: returns null for anything that is not a well-formed v1 save. */
export function parseSave(text: string | null): SaveData | null {
  if (text === null) return null;
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return null;
  }
  if (!isRecord(raw)) return null;
  if (raw['version'] !== SAVE_VERSION) return null;
  const progress = parseProgress(raw['progress']);
  const settings = parseSettings(raw['settings']);
  if (progress === null || settings === null) return null;
  return { version: SAVE_VERSION, progress, settings };
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
