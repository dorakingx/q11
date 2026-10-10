/**
 * Minimal Web Audio tones. The AudioContext is created lazily on a user gesture; nothing plays unless
 * the sound setting is on. Always mutable: the caller passes `enabled` on every call.
 */
export type SoundName = 'select' | 'place' | 'remove' | 'confirm' | 'success' | 'failure' | 'alarm' | 'step';

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
  }
}
