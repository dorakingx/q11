/**
 * Dev-only preview of CityScreen with fake game states and a dispatch logger (mounted by preview-entry.tsx for
 * city-preview.html). Query params: ?scenario=fresh|three|all|restored|free&lang=en|ja&rm=1&selected=<district>&bare=1
 */
import { useMemo, useState } from 'react';
import { initialState, type Action, type GameState, type MissionProgress, type StarCount } from '../../game';
import { LanguageProvider, isLang, type Lang } from '../i18n';
import { CityScreen } from './CityScreen';
import type { DistrictId } from '../art';
import { isDistrictId } from './geometry';

type ScenarioId = 'fresh' | 'three' | 'all' | 'restored' | 'free';
const SCENARIOS: readonly ScenarioId[] = ['fresh', 'three', 'all', 'restored', 'free'];

const solved = (stars: StarCount, attempts = 1): MissionProgress => ({ stars, attempts, completed: true });

function scenario(id: ScenarioId): { readonly state: GameState; readonly recentlySolved: string | null; readonly selected: DistrictId | null } {
  const base = initialState();
  switch (id) {
    case 'fresh':
      return { state: { ...base, screen: 'missions' }, recentlySolved: null, selected: null };
    case 'three':
      return {
        state: { ...base, screen: 'missions', progress: { 'first-alarm': solved(3), 'red-forward-blue-backward': solved(2, 2), 'color-switch': solved(3) } },
        recentlySolved: null,
        selected: 'central',
      };
    case 'all':
      return {
        state: {
          ...base,
          screen: 'missions',
          progress: { 'first-alarm': solved(3), 'red-forward-blue-backward': solved(3), 'color-switch': solved(3), 'blind-dispatch': solved(3), 'two-kinds-of-trouble': solved(3), 'silent-failure': solved(1) },
        },
        recentlySolved: null,
        selected: null,
      };
    case 'restored':
      return { state: { ...base, screen: 'missions', progress: { 'first-alarm': solved(3) } }, recentlySolved: 'station-row', selected: null };
    case 'free':
      return { state: { ...base, screen: 'missions', settings: { ...base.settings, freeRoam: true } }, recentlySolved: null, selected: null };
  }
}

export function Preview() {
  const params = new URLSearchParams(window.location.search);
  const initialScenario = params.get('scenario');
  const [sc, setSc] = useState<ScenarioId>((SCENARIOS as readonly string[]).includes(initialScenario ?? '') ? (initialScenario as ScenarioId) : 'fresh');
  const [lang, setLang] = useState<Lang>(isLang(params.get('lang')) ? (params.get('lang') as Lang) : 'en');
  const [rm, setRm] = useState<boolean>(params.get('rm') === '1');
  const [log, setLog] = useState<string[]>([]);
  const [key, setKey] = useState(0);
  const bare = params.get('bare') === '1';
  const forcedSelected = params.get('selected');
  const data = useMemo(() => scenario(sc), [sc]);
  const selected = isDistrictId(forcedSelected) ? forcedSelected : data.selected;
  const dispatch = (a: Action) => {
    const line = `${new Date().toLocaleTimeString()} dispatch(${JSON.stringify(a)})`;
    console.log(line);
    setLog((l) => [line, ...l].slice(0, 12));
  };
  return (
    <div className="app" data-reduced-motion={rm ? 'true' : 'false'} data-screen="missions">
      {bare ? null : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', padding: '8px 16px', fontSize: 13 }}>
          <strong>Preview</strong>
          {SCENARIOS.map((s) => (
            <button key={s} type="button" onClick={() => { setSc(s); setKey((k) => k + 1); }} style={{ minHeight: 36, fontWeight: s === sc ? 800 : 400 }}>
              {s}
            </button>
          ))}
          <button type="button" onClick={() => setLang(lang === 'en' ? 'ja' : 'en')} style={{ minHeight: 36 }}>
            lang: {lang}
          </button>
          <label style={{ display: 'inline-flex', gap: 4, alignItems: 'center', minHeight: 36 }}>
            <input type="checkbox" checked={rm} onChange={(e) => setRm(e.target.checked)} /> reduced motion
          </label>
          <button type="button" onClick={() => setKey((k) => k + 1)} style={{ minHeight: 36 }}>
            remount
          </button>
        </div>
      )}
      <LanguageProvider language={lang}>
        <CityScreen
          key={`${sc}-${String(key)}`}
          state={{ ...data.state, settings: { ...data.state.settings, language: lang } }}
          dispatch={dispatch}
          storageNote={lang === 'ja' ? '進み具合はこのブラウザに保存されます。' : 'Progress is saved in this browser.'}
          recentlySolved={data.recentlySolved}
          onSettings={() => dispatch({ type: 'OPEN_SETTINGS' })}
          onTitle={() => dispatch({ type: 'OPEN_TITLE' })}
          initialSelected={selected}
        />
      </LanguageProvider>
      {bare ? null : (
        <pre data-testid="dispatch-log" style={{ margin: '8px 16px', fontSize: 12, whiteSpace: 'pre-wrap' }}>
          {log.join('\n')}
        </pre>
      )}
    </div>
  );
}
