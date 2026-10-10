/**
 * Pure helpers for the city screen: district statuses, hit-box placement over the 1600 × 1000 map, the truck
 * travel easing, reduced-motion detection and the badge-name keys. No React state here.
 */
import type { CSSProperties } from 'react';
import { districtStatus, type DistrictStatus, type MissionProgress } from '../../game';
import { CITY_H, CITY_W, DISTRICTS, DISTRICT_ORDER, type DistrictBox, type DistrictId, type Pt } from '../art';
import type { Key } from '../i18n';

/** Truck drive from the station to the district (R2: ≈1.5 s). */
export const TRAVEL_MS = 1500;
/** "Smoke clears, lights on" restoration moment (≤ 1.5 s). */
export const RESTORE_MS = 1300;
/** Toasts (locked hint / badge earned) auto-dismiss after this. */
export const TOAST_MS = 4000;
/** Wheel frame flips every this many ms while the truck rolls. */
export const WHEEL_MS = 120;

export type Statuses = Readonly<Record<DistrictId, DistrictStatus>>;

export function statusesOf(progress: Readonly<Record<string, MissionProgress>>, freeRoam: boolean): Statuses {
  const out = {} as Record<DistrictId, DistrictStatus>;
  for (const id of DISTRICT_ORDER) out[id] = districtStatus(id, progress, freeRoam);
  return out;
}

export function isDistrictId(v: unknown): v is DistrictId {
  return typeof v === 'string' && (DISTRICT_ORDER as readonly string[]).includes(v);
}

/** The district before `id` in unlock order (null for the first one). */
export function previousDistrict(id: DistrictId): DistrictBox | null {
  const i = DISTRICT_ORDER.indexOf(id);
  if (i <= 0) return null;
  const prev = DISTRICT_ORDER[i - 1];
  return prev === undefined ? null : (DISTRICTS.find((b) => b.id === prev) ?? null);
}

export function neighbourDistrict(id: DistrictId, delta: 1 | -1): DistrictId {
  const i = DISTRICT_ORDER.indexOf(id);
  const n = DISTRICT_ORDER.length;
  const next = DISTRICT_ORDER[(i + delta + n) % n];
  return next ?? id;
}

const pct = (v: number, total: number): string => `${String(Math.round((v / total) * 10000) / 100)}%`;

/** Absolute position of a district <button> over the map: centre + size as percentages of the SVG viewBox. */
export function hitBoxStyle(box: DistrictBox): CSSProperties {
  return {
    left: pct(box.x + box.w / 2, CITY_W),
    top: pct(box.y + box.h / 2, CITY_H),
    width: pct(box.w, CITY_W),
    height: pct(box.h, CITY_H),
  };
}

export function easeInOut(t: number): number {
  const c = Math.min(1, Math.max(0, t));
  return c < 0.5 ? 2 * c * c : 1 - Math.pow(-2 * c + 2, 2) / 2;
}

export function lerp(a: Pt, b: Pt, t: number): Pt {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

export interface TruckPose {
  readonly x: number;
  readonly y: number;
  readonly facing: 1 | -1;
  readonly wheelFrame: 0 | 1;
}

/** A path element that can measure itself (jsdom has no SVG geometry, so both methods are optional). */
export interface MeasurablePath {
  getTotalLength?: () => number;
  getPointAtLength?: (l: number) => { readonly x: number; readonly y: number };
}

/**
 * Point at fraction `f` (0–1) of a road. Uses the browser's path geometry when available and falls back to a
 * straight line from `start` to `end` (jsdom / very old engines), so the drive always ends at the entry point.
 */
export function pointOnRoad(path: MeasurablePath | null, start: Pt, end: Pt, f: number): Pt {
  if (path !== null && typeof path.getTotalLength === 'function' && typeof path.getPointAtLength === 'function') {
    const total = path.getTotalLength();
    if (Number.isFinite(total) && total > 0) {
      const p = path.getPointAtLength(f * total);
      return { x: p.x, y: p.y };
    }
  }
  return lerp(start, end, f);
}

/**
 * Reduced motion as the app exposes it (`<div class="app" data-reduced-motion="true">`) or as the OS prefers.
 * Checked at event time, never during render.
 */
export function detectReducedMotion(): boolean {
  if (typeof document === 'undefined') return false;
  if (document.querySelector('[data-reduced-motion="true"]') !== null) return true;
  try {
    return globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  } catch {
    return false;
  }
}

/** Chapter badge name key per mission (docs/UX_SCREENS.md §8). */
export const BADGE_KEY: Readonly<Record<string, Key>> = {
  'first-alarm': 'city.badgeName.firstAlarm',
  'red-forward-blue-backward': 'city.badgeName.redForwardBlueBackward',
  'color-switch': 'city.badgeName.colorSwitch',
  'blind-dispatch': 'city.badgeName.blindDispatch',
  'two-kinds-of-trouble': 'city.badgeName.twoKindsOfTrouble',
  'silent-failure': 'city.badgeName.silentFailure',
};

export function badgeKey(missionId: string): Key {
  return BADGE_KEY[missionId] ?? 'city.badgeName.firstAlarm';
}

/** Badge colours cycle through the crew hues so neighbouring badges differ (shape is the same shield for all). */
export const BADGE_COLOURS: readonly string[] = ['#e8432f', '#2f7fe6', '#9b5de5', '#2bb673', '#f2b200', '#3fb6f5'];

export function badgeColour(index: number): string {
  return BADGE_COLOURS[((index % BADGE_COLOURS.length) + BADGE_COLOURS.length) % BADGE_COLOURS.length] ?? '#2f7fe6';
}
