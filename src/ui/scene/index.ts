/**
 * src/ui/scene — the hero board of the redesign (docs/UX_REDESIGN.md R4, R6–R10):
 *   Scene          replaces src/ui/Board.tsx for every code (houses / lanes), fog secrecy, detector highlight, outcome art
 *   SprayPlayer    plays an EffectTimeline (src/game/effects.ts) on a clock or as a reduced-motion stepper
 *   ResultOverlay  the four readable results with stars, reaction, Why? / Try again / Next and a Details fold
 *   WhyCompare     "Your spray" vs "The other way" on the same board under one clock
 * Styles: scene.css (imports nothing; relies on src/ui/tokens.css variables).
 */
export { Scene, type SceneProps, type SceneOutcome, type BoardLikeProps } from './Scene';
export { SprayPlayer, type SprayPlayerProps } from './SprayPlayer';
export { SprayStage, type SprayStageProps } from './SprayStage';
export { ResultOverlay, type ResultOverlayProps } from './ResultOverlay';
export { WhyCompare, type WhyCompareProps, type WhyAlternative } from './WhyCompare';
export { computeFrame, finalFrame, eventProgress, IMPACT_FLASH, type SceneFrame, type FrameOptions } from './frame';
export { captionAt, captionForEvent, announcementAt, ANNOUNCED_EVENTS, RESULT_TITLE_KEY, RESULT_BODY_KEY } from './captions';
export { deriveSceneKind, sceneGeometry, defaultHouseVariant, crewSpot, crewBox, detectorBox, flameBox, houseBox, houseDrawnBox, boxesIntersect, TOWER_STRIP, type SceneKind, type SceneGeometry } from './geometry';
export { alternativeDebrief, frameOptionsFor, outcomeFor, placementsFromCrews } from './stageModel';
export { anomalyLetter, staticHouseState } from './houseState';
export { useSprayClock, type SprayClock } from './useSprayClock';
