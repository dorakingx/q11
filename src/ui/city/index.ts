/**
 * City map screen (src/ui/city). App renders `<CityScreen>` for `state.screen === 'missions'`:
 *
 *   <CityScreen state={state} dispatch={dispatch}
 *               recentlySolved={lastSolvedDistrictId} onSettings={() => dispatch({ type: 'OPEN_SETTINGS' })}
 *               onTitle={() => dispatch({ type: 'OPEN_TITLE' })} />
 *
 * Dispatch → truck drive → `dispatch({ type: 'SELECT_MISSION', id })` exactly once (immediately under reduced motion).
 */
export { CityScreen, type CityScreenProps } from './CityScreen';
export { BADGE_KEY, RESTORE_MS, TRAVEL_MS, badgeKey, statusesOf } from './geometry';
