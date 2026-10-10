import { describe, expect, it } from 'vitest';
import { defaultSave, loadSave, memoryStorage, parseSave, RESET_NOTICE, SAVE_KEY, writeSave, type StorageLike } from './persistence';

describe('persistence', () => {
  it('round-trips a valid save without a notice', () => {
    const st = memoryStorage();
    const save = {
      version: 1 as const,
      progress: { 'first-alarm': { stars: 3 as const, attempts: 2, completed: true } },
      settings: { sound: true, reducedMotion: false },
    };
    expect(writeSave(st, save)).toBe(true);
    expect(loadSave(st)).toEqual({ save, notice: null });
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
    const cases = [
      JSON.stringify({ version: 2, progress: {}, settings: { sound: false, reducedMotion: false } }),
      JSON.stringify({ version: 1, progress: { x: { stars: 7, attempts: 1, completed: true } }, settings: { sound: false, reducedMotion: false } }),
      JSON.stringify({ version: 1, progress: { x: { stars: 1, attempts: -1, completed: true } }, settings: { sound: false, reducedMotion: false } }),
      JSON.stringify({ version: 1, progress: {}, settings: { sound: 'yes', reducedMotion: false } }),
      JSON.stringify({ version: 1, progress: [], settings: { sound: false, reducedMotion: false } }),
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
