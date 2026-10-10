import { describe, expect, it } from 'vitest';
import { DEFAULT_SETTINGS, defaultSave, loadSave, memoryStorage, parseSave, RESET_NOTICE, SAVE_KEY, writeSave, type StorageLike } from './persistence';
import { SAVE_VERSION, type SaveData } from './types';

const V1_SETTINGS = { sound: true, reducedMotion: false };

describe('persistence', () => {
  it('the storage key is unchanged so v1 saves are found and migrated', () => {
    expect(SAVE_KEY).toBe('q11.save.v1');
    expect(SAVE_VERSION).toBe(2);
    expect(DEFAULT_SETTINGS).toEqual({ sound: false, reducedMotion: false, language: 'en', freeRoam: false });
    expect(defaultSave()).toEqual({ version: 2, progress: {}, settings: DEFAULT_SETTINGS, tutorialDone: false });
  });

  it('round-trips a valid v2 save without a notice', () => {
    const st = memoryStorage();
    const save: SaveData = {
      version: 2,
      progress: { 'first-alarm': { stars: 3, attempts: 2, completed: true } },
      settings: { sound: true, reducedMotion: false, language: 'ja', freeRoam: true },
      tutorialDone: true,
    };
    expect(writeSave(st, save)).toBe(true);
    expect(loadSave(st)).toEqual({ save, notice: null });
    expect(parseSave(JSON.stringify(save))).toEqual(save);
  });

  it('migrates a v1 save: progress and settings kept, language en, freeRoam off, tutorialDone derived from progress', () => {
    const withProgress = JSON.stringify({
      version: 1,
      progress: { 'first-alarm': { stars: 3, attempts: 1, completed: true }, 'blind-dispatch': { stars: 0, attempts: 2, completed: false } },
      settings: V1_SETTINGS,
    });
    expect(parseSave(withProgress)).toEqual({
      version: 2,
      progress: { 'first-alarm': { stars: 3, attempts: 1, completed: true }, 'blind-dispatch': { stars: 0, attempts: 2, completed: false } },
      settings: { sound: true, reducedMotion: false, language: 'en', freeRoam: false },
      tutorialDone: true,
    });
    const noProgress = JSON.stringify({ version: 1, progress: {}, settings: { sound: false, reducedMotion: true } });
    expect(parseSave(noProgress)).toEqual({
      version: 2,
      progress: {},
      settings: { sound: false, reducedMotion: true, language: 'en', freeRoam: false },
      tutorialDone: false,
    });
    // Loading a v1 save produces no notice (nothing was lost) and the next write stores v2 under the same key.
    const st = memoryStorage();
    st.setItem(SAVE_KEY, withProgress);
    const loaded = loadSave(st);
    expect(loaded.notice).toBeNull();
    expect(loaded.save.version).toBe(2);
    expect(writeSave(st, loaded.save)).toBe(true);
    expect(JSON.parse(st.getItem(SAVE_KEY) ?? '{}')).toMatchObject({ version: 2, tutorialDone: true });
  });

  it('empty storage → defaults, no notice', () => {
    expect(loadSave(memoryStorage())).toEqual({ save: defaultSave(), notice: null });
    expect(loadSave(null)).toEqual({ save: defaultSave(), notice: null });
  });

  it('corrupt JSON → reset with a notice and the fresh save written back', () => {
    const st = memoryStorage();
    st.setItem(SAVE_KEY, '{not json');
    const r = loadSave(st);
    expect(r.notice).toBe(RESET_NOTICE);
    expect(r.save).toEqual(defaultSave());
    expect(JSON.parse(st.getItem(SAVE_KEY) ?? '')).toEqual(defaultSave());
  });

  it('unknown version or malformed fields → reset with a notice', () => {
    const v2Settings = { sound: false, reducedMotion: false, language: 'en', freeRoam: false };
    const cases = [
      JSON.stringify({ version: 3, progress: {}, settings: v2Settings, tutorialDone: false }),
      JSON.stringify({ version: '2', progress: {}, settings: v2Settings, tutorialDone: false }),
      JSON.stringify({ version: 1, progress: { x: { stars: 7, attempts: 1, completed: true } }, settings: V1_SETTINGS }),
      JSON.stringify({ version: 1, progress: { x: { stars: 1, attempts: -1, completed: true } }, settings: V1_SETTINGS }),
      JSON.stringify({ version: 1, progress: {}, settings: { sound: 'yes', reducedMotion: false } }),
      JSON.stringify({ version: 1, progress: [], settings: V1_SETTINGS }),
      // v2 must carry every v2 field with the right type.
      JSON.stringify({ version: 2, progress: {}, settings: v2Settings }),
      JSON.stringify({ version: 2, progress: {}, settings: v2Settings, tutorialDone: 'yes' }),
      JSON.stringify({ version: 2, progress: {}, settings: V1_SETTINGS, tutorialDone: false }),
      JSON.stringify({ version: 2, progress: {}, settings: { ...v2Settings, language: 'fr' }, tutorialDone: false }),
      JSON.stringify({ version: 2, progress: {}, settings: { ...v2Settings, freeRoam: 1 }, tutorialDone: false }),
      JSON.stringify(null),
      JSON.stringify('string'),
    ];
    for (const text of cases) {
      expect(parseSave(text), text).toBeNull();
      const st = memoryStorage();
      st.setItem(SAVE_KEY, text);
      expect(loadSave(st).notice, text).toBe(RESET_NOTICE);
    }
  });

  it('throwing storage is treated as unavailable (in-memory only, silently)', () => {
    const broken: StorageLike = {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
      removeItem: () => {
        throw new Error('blocked');
      },
    };
    expect(loadSave(broken)).toEqual({ save: defaultSave(), notice: null });
    expect(writeSave(broken, defaultSave())).toBe(false);
  });
});
