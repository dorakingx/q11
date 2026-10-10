/** Palette (docs/GAME_DESIGN.md) and shared labels — kept out of component files for fast refresh. */
import type { CrewLetter } from '../game';

export const COLOURS = {
  X: '#ff5a3c',
  Z: '#3c8dff',
  Y: '#b86cff',
  alarm: '#ffc53d',
  success: '#3ddc97',
  text: '#e8eefc',
  muted: '#9fb3d9',
  line: '#27416f',
  /** Non-text boundaries that must be readable (block outlines, quiet watch lines): 3.7:1 on the panel #12264a and 3.3:1 on the block fill #173059 (the suggested #3c5a94 is only 2.2:1). */
  lineStrong: '#5a7fbf',
  navy: '#0b1a33',
  panel: '#12264a',
} as const;

export const CREW_LABEL: Readonly<Record<CrewLetter, string>> = { X: 'red (X)', Z: 'blue (Z)', Y: 'red-and-blue (Y)' };
