/**
 * Legacy English crew labels (kept verbatim: `crew.X` etc. in src/ui/i18n mirror them; the i18n parity test pins them).
 * Colours live in src/ui/tokens.css (CSS variables) and src/ui/art/palette.ts (SVG art) — not here.
 */
import type { CrewLetter } from '../game';

export const CREW_LABEL: Readonly<Record<CrewLetter, string>> = { X: 'red (X)', Z: 'blue (Z)', Y: 'red-and-blue (Y)' };
