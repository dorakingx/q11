/**
 * Minimal Web Audio tones. The AudioContext is created lazily on a user gesture; nothing plays unless
 * the sound setting is on. Always mutable: the caller passes `enabled` on every call.
 */
/** `blocked` = a tap that the rules refused (budget reached). Tones play only for actions the reducer accepted, plus this one refusal. */
import { getCode } from '../quantum';
import { crewCount, currentMission, type Action, type GameState } from '../game';

export type SoundName = 'select' | 'place' | 'remove' | 'confirm' | 'success' | 'failure' | 'alarm' | 'step' | 'blocked';

let ctx: AudioContext | null = null;

function context(): AudioContext | null {
  if (ctx !== null) return ctx;
  const Ctor = globalThis.AudioContext;
  if (typeof Ctor !== 'function') return null;
  try {
    ctx = new Ctor();
  } catch {
    ctx = null;
  }
  return ctx;
}

function tone(ac: AudioContext, freq: number, start: number, dur: number, gain = 0.08, type: OscillatorType = 'sine'): void {
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  o.connect(g).connect(ac.destination);
  o.start(start);
  o.stop(start + dur + 0.02);
}

export function playSound(name: SoundName, enabled: boolean): void {
  if (!enabled) return;
  const ac = context();
  if (ac === null) return;
  if (ac.state === 'suspended') void ac.resume();
  const t = ac.currentTime;
  switch (name) {
    case 'select':
      tone(ac, 660, t, 0.06);
      break;
    case 'place':
      tone(ac, 440, t, 0.09);
      tone(ac, 660, t + 0.05, 0.09);
      break;
    case 'remove':
      tone(ac, 520, t, 0.08);
      tone(ac, 390, t + 0.05, 0.1);
      break;
    case 'confirm':
      tone(ac, 523, t, 0.1);
      tone(ac, 659, t + 0.08, 0.14);
      break;
    case 'success':
      tone(ac, 523, t, 0.12);
      tone(ac, 659, t + 0.1, 0.12);
      tone(ac, 784, t + 0.2, 0.22);
      break;
    case 'failure':
      tone(ac, 330, t, 0.16, 0.08, 'triangle');
      tone(ac, 247, t + 0.14, 0.26, 0.08, 'triangle');
      break;
    case 'alarm':
      tone(ac, 880, t, 0.08, 0.05, 'square');
      tone(ac, 880, t + 0.14, 0.08, 0.05, 'square');
      break;
    case 'step':
      tone(ac, 587, t, 0.05, 0.05);
      break;
    case 'blocked':
      // Short, low, flat buzz: clearly not the rising "place" pair.
      tone(ac, 196, t, 0.07, 0.06, 'square');
      break;
  }
}

/**
 * Which tone (if any) an action deserves, decided by comparing the state before and after the reducer ran:
 * only accepted actions make a sound, and a block tap refused by the budget gets its own "blocked" tone.
 */
export function soundFor(action: Action, before: GameState, after: GameState): SoundName | null {
  switch (action.type) {
    case 'SELECT_LETTER':
      return after.selected !== before.selected ? 'select' : null;
    case 'TOGGLE_BLOCK': {
      const was = before.placements[action.qubit];
      const now = after.placements[action.qubit];
      if (was === now) {
        if (after === before && before.screen === 'challenge' && !before.standDownDialog && was === undefined) {
          const m = currentMission(before);
          const validBlock = m !== null && action.qubit >= 0 && action.qubit < getCode(m.code).n;
          if (m !== null && validBlock && crewCount(before.placements) >= m.budget) return 'blocked';
        }
        return null;
      }
      return now === undefined ? 'remove' : 'place';
    }
    case 'RECALL_BLOCK':
      return after.placements !== before.placements ? 'remove' : null;
    case 'CLEAR_CREWS':
      return after.placements !== before.placements && crewCount(before.placements) > 0 ? 'remove' : null;
    case 'CONFIRM':
    case 'STAND_DOWN_CONFIRM':
      return after.screen === 'debrief' && before.screen !== 'debrief' ? 'confirm' : null;
    case 'REPLAY_NEXT':
    case 'REPLAY_PREV':
    case 'REPLAY_GOTO':
      return after.replayIndex !== before.replayIndex ? 'step' : null;
    default:
      return null;
  }
}
