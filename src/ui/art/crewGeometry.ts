/** Firefighter geometry used by scenes to aim the hose stream. */

/** Nozzle tip in the firefighter's local frame when posed 'spray' (before `facing` is applied). */
export const NOZZLE = { x: 34, y: -34 } as const;

/** Nozzle tip in parent coordinates for a firefighter placed at (x, y) with the given scale/facing. */
export function nozzleAt(x: number, y: number, scale = 1, facing: 1 | -1 = 1): { x: number; y: number } {
  return { x: x + NOZZLE.x * scale * facing, y: y + NOZZLE.y * scale };
}
