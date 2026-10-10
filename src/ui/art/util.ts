/** Non-component helpers shared by the art parts (kept out of .tsx files for fast refresh). */
import type { CrewLetter } from '../../game';
import { LETTER_COLOUR } from './palette';

export function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100);
}

export const FONT = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

export function letterColour(letter: CrewLetter): string {
  return LETTER_COLOUR[letter];
}
