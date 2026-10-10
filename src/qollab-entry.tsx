/**
 * Entry for the Qollab bundle (vite.qollab.config.ts → qollab/game/q11-game.js).
 * qollab/main.js imports { mountQ11 } from './game/q11-game.js' and passes the Qollab bridge.
 */
export { mountQ11 } from './ui/mount';
export type { MountOptions } from './ui/mount';
