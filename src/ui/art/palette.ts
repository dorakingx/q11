/**
 * Art palette for the toy-city redesign (docs/UX_REDESIGN.md R4). Flat colours only — no gradients, no glow.
 * Every token is also identified by shape + letter (X/Z/Y), never by colour alone.
 */
import type { CrewLetter } from '../../game';

export const ART = {
  /* ground + sky */
  sky: '#d4ecf8',
  skyDeep: '#bcdff2',
  cloud: '#ffffff',
  sand: '#f5e8d0',
  sandDark: '#e6d4b2',
  shadow: '#d8c49c',
  grass: '#a9d67f',
  grassDark: '#7fb95a',
  road: '#8f9099',
  roadEdge: '#6c6e79',
  roadLine: '#f8f1dc',
  river: '#8fd3f0',
  riverDark: '#5db4da',
  /* ink */
  ink: '#2b2a33',
  inkSoft: '#5a586a',
  paper: '#ffffff',
  /* houses */
  wallPeach: '#f8d9c6',
  wallMint: '#cfe9d9',
  wallButter: '#fae9ab',
  wallLilac: '#dcd6f4',
  wallRose: '#f6c8d2',
  wallPowder: '#cfe3f7',
  wallBrick: '#d9705e',
  wallStone: '#e9e3d6',
  side: '#c9b8a2',
  roofTerracotta: '#c94f3f',
  roofSlate: '#5a6e8c',
  roofMoss: '#7c9e6a',
  roofPlum: '#8c5a7c',
  windowDark: '#4a6a8f',
  windowLit: '#ffd659',
  door: '#8a5a3c',
  /* fire */
  fireX: '#e8432f',
  fireXCore: '#ffb13d',
  fireZ: '#2f7fe6',
  fireZCore: '#a3d6ff',
  fireYCore: '#fff2c4',
  smoke: '#b8bcc8',
  smokeDark: '#9a9fae',
  steam: '#f2f6fa',
  /* water (never a blue flame: pale cyan, round drops, white highlights) */
  water: '#8fe3f5',
  waterDeep: '#4ec0e2',
  waterHighlight: '#ffffff',
  /* alarms */
  alarm: '#ffb020',
  alarmRing: '#ffd24d',
  alarmDark: '#8a4b00',
  /* crews */
  crewX: '#e8432f',
  crewZ: '#2f7fe6',
  crewY: '#9b5de5',
  jacket: '#2f3b5c',
  jacketStripe: '#ffd24d',
  skin: '#f3c9a6',
  boots: '#2b2a33',
  hose: '#f0d35a',
  /* truck */
  truck: '#d8352b',
  truckDark: '#a8261f',
  truckTrim: '#f3f3f6',
  ladder: '#d9d9e0',
  wheel: '#2b2a33',
  hub: '#d5d5dc',
  glass: '#a3d6ff',
  beaconBlue: '#3d8dff',
  /* result + state */
  success: '#3fb96a',
  successDark: '#1f7a43',
  danger: '#d62839',
  fog: '#b9bcc6',
  fogDark: '#8d919e',
  ghost: '#6f6d7d',
  highlight: '#ff9f1c',
  flag: '#ff6b4a',
  flagPole: '#8a6a4a',
  barrier: '#ff9f1c',
  barrierStripe: '#2b2a33',
  lamp: '#fff1b8',
  lampPost: '#5a586a',
  tree: '#7fb95a',
  treeDark: '#5f9a42',
  trunk: '#8a5a3c',
  beaconDome: '#f5f1e6',
} as const;

export type ArtColour = (typeof ART)[keyof typeof ART];

/** Crew / fire letter colours (shared hue family with the old board so X stays red, Z blue, Y purple). */
export const LETTER_COLOUR: Readonly<Record<CrewLetter, string>> = { X: ART.crewX, Z: ART.crewZ, Y: ART.crewY };

/** Outline width at 100-unit scale (2–3 px). */
export const OUTLINE = 2.5;
export const OUTLINE_THIN = 1.6;

/** Wall colours cycled across a row of houses so neighbours differ. */
export const WALL_CYCLE: readonly string[] = [ART.wallPeach, ART.wallMint, ART.wallButter, ART.wallLilac, ART.wallRose, ART.wallPowder];
export const ROOF_CYCLE: readonly string[] = [ART.roofTerracotta, ART.roofSlate, ART.roofMoss, ART.roofPlum];
