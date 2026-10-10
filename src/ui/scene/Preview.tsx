/**
 * Dev-only preview of the scene components (scene-preview.html). Not part of the production build.
 * Sections: challenge fog + detector highlight + plan markers · lanes (bridge / lab) · live SprayPlayer for the four
 * scenarios · frozen mid-animation frames · the four ResultOverlays · WhyCompare.
 * Every debrief here comes from the real engine through the reducer (CONFIRM), every timeline from `buildEffects`:
 * like the app, the preview never calls confirmDispatch / revealMission itself.
 */
import { useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_SETTINGS, buildEffects, getPublicMission, initialState, reducer, resultType, type CrewLetter, type Debrief } from '../../game';
import { fromString, support } from '../../quantum';
import { LanguageProvider, missionCopy, useT, type Lang } from '../i18n';
import { ResultOverlay } from './ResultOverlay';
import { Scene } from './Scene';
import { SprayPlayer } from './SprayPlayer';
import { SprayStage } from './SprayStage';
import { WhyCompare } from './WhyCompare';
import { anomalyLetter } from './houseState';
import '../tokens.css';
import './scene.css';

interface Scenario {
  readonly id: string;
  readonly title: string;
  readonly missionId: string;
  readonly placements: Readonly<Record<number, CrewLetter>>;
}

const SCENARIOS: readonly Scenario[] = [
  { id: 'restored', title: 'Blind dispatch · X on house 4 (restored)', missionId: 'blind-dispatch', placements: { 4: 'X' } },
  { id: 'still-burning', title: 'Blind dispatch · X on house 5 (still burning)', missionId: 'blind-dispatch', placements: { 5: 'X' } },
  { id: 'safe-pattern', title: 'Two kinds · X1 + Z6 (safe pattern)', missionId: 'two-kinds-of-trouble', placements: { 1: 'X', 6: 'Z' } },
  { id: 'logical-failure', title: 'Silent failure · X0 (logical failure)', missionId: 'silent-failure', placements: { 0: 'X' } },
];

/** Play the scenario through the reducer (free roam, tutorial done) and take the Debrief it committed. */
function debriefFor(s: Scenario): Debrief {
  let st = initialState({ version: 2, progress: {}, settings: { ...DEFAULT_SETTINGS, freeRoam: true }, tutorialDone: true });
  st = reducer(st, { type: 'PLAY' });
  st = reducer(st, { type: 'SELECT_MISSION', id: s.missionId });
  st = reducer(st, { type: 'START_CHALLENGE' });
  for (const [q, letter] of Object.entries(s.placements)) {
    st = reducer(st, { type: 'SELECT_LETTER', letter });
    st = reducer(st, { type: 'TOGGLE_BLOCK', qubit: Number(q) });
  }
  st = reducer(st, { type: 'CONFIRM' });
  if (st.debrief === null) throw new Error(`preview: ${s.id} did not commit`);
  return st.debrief;
}

function qs(): URLSearchParams {
  return new URLSearchParams(typeof location === 'undefined' ? '' : location.search);
}

export function Preview() {
  const [lang, setLang] = useState<Lang>(qs().get('lang') === 'ja' ? 'ja' : 'en');
  const only = qs().get('section');
  const show = (id: string) => only === null || only === id;
  return (
    <LanguageProvider language={lang}>
      <div className="preview">
        <header className="preview-head">
          <h1>Scene preview (dev)</h1>
          <button type="button" className="btn" onClick={() => setLang(lang === 'en' ? 'ja' : 'en')}>
            {lang === 'en' ? '日本語' : 'English'}
          </button>
        </header>
        {show('fog') ? <FogSection /> : null}
        {show('row') ? <RowSection /> : null}
        {show('lanes') ? <LanesSection /> : null}
        {show('spray') ? <SpraySection /> : null}
        {show('frames') ? <FramesSection /> : null}
        {show('results') ? <ResultsSection /> : null}
        {show('why') ? <WhySection /> : null}
      </div>
    </LanguageProvider>
  );
}

function Section({ id, title, children }: { readonly id: string; readonly title: string; readonly children: ReactNode }) {
  return (
    <section className="preview-section" id={`sec-${id}`} data-section={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function FogSection() {
  const m = getPublicMission('two-kinds-of-trouble');
  const [placements, setPlacements] = useState<Record<number, CrewLetter>>({ 1: 'X' });
  const [selected, setSelected] = useState<CrewLetter>('Z');
  const [hl, setHl] = useState<number | null>(0);
  const toggle = (q: number) =>
    setPlacements((p) => {
      const next = { ...p };
      if (next[q] === selected) delete next[q];
      else if (Object.keys(next).length < m.budget || next[q] !== undefined) next[q] = selected;
      return next;
    });
  return (
    <Section id="fog" title="Challenge (fog) · detector Z0 highlighted · plan marker X on house 1">
      <div className="preview-row">
        {(['X', 'Z'] as const).map((l) => (
          <button key={l} type="button" className={`btn${selected === l ? ' btn-primary' : ''}`} onClick={() => setSelected(l)} aria-pressed={selected === l}>
            {l} crew
          </button>
        ))}
      </div>
      <Scene
        codeId={m.code}
        circuit={m.circuit}
        fires={null}
        crews={null}
        placements={placements}
        residual={null}
        syndrome={m.syndrome}
        interactive
        onToggle={toggle}
        selected={selected}
        budgetReached={Object.keys(placements).length >= m.budget}
        fog
        highlightedCheck={hl}
        onToggleDetector={setHl}
      />
    </Section>
  );
}

function RowSection() {
  const m = getPublicMission('first-alarm');
  const [placements, setPlacements] = useState<Record<number, CrewLetter>>({ 1: 'X' });
  return (
    <Section id="row" title="Rowhouse Lane (rep3) · training fire visible / planning">
      <div className="preview-grid-2">
        <Scene codeId={m.code} circuit={[]} fires="IXI" crews={null} residual={null} syndrome={m.syndrome} interactive={false} ariaLabel="Training board" />
        <Scene
          codeId={m.code}
          circuit={[]}
          fires={null}
          crews={null}
          placements={placements}
          residual={null}
          syndrome={m.syndrome}
          interactive
          fog
          selected="X"
          onToggle={(q) => setPlacements((p) => (p[q] === undefined ? { [q]: 'X' } : {}))}
          onToggleDetector={() => undefined}
        />
      </div>
    </Section>
  );
}

function LanesSection() {
  const bridge = getPublicMission('red-forward-blue-backward');
  const lab = getPublicMission('color-switch');
  const [cursor, setCursor] = useState(-1);
  const bridgeFrames = ['XZ', 'YY'];
  const labFrames = ['ZI', 'XI', 'XX', 'XZ'];
  const t = useT();
  return (
    <Section id="lanes" title="Propagation lanes · bridge (CNOT) and lab (H · CNOT · H) with the time cursor">
      <div className="preview-row">
        <button type="button" className="btn" onClick={() => setCursor((c) => Math.max(-1, c - 1))}>
          {t('common.prev')}
        </button>
        <span>cursor {cursor}</span>
        <button type="button" className="btn" onClick={() => setCursor((c) => Math.min(3, c + 1))}>
          {t('common.next')}
        </button>
      </div>
      <div className="preview-grid-2 preview-grid-lanes">
        <Scene
          codeId={bridge.code}
          circuit={bridge.circuit}
          fires={bridgeFrames[Math.min(bridgeFrames.length - 1, cursor + 1)] ?? 'XZ'}
          crews={null}
          residual={null}
          syndrome={null}
          interactive={false}
          gateCursor={Math.min(cursor, 1)}
          inputFires="XZ"
        />
        <Scene
          codeId={lab.code}
          circuit={lab.circuit}
          fires={labFrames[Math.min(labFrames.length - 1, cursor + 1)] ?? 'ZI'}
          crews={null}
          residual={null}
          syndrome={null}
          interactive={false}
          gateCursor={cursor}
          inputFires="ZI"
        />
      </div>
      <h3>Bridge planning (fog off: propagation missions show the public start) · crews planned Y on both</h3>
      <Scene codeId={bridge.code} circuit={bridge.circuit} fires={null} crews={null} placements={{ 0: 'Y', 1: 'Y' }} residual={null} syndrome={null} interactive onToggle={() => undefined} selected="Y" gateCursor={1} inputFires="XZ" />
    </Section>
  );
}

function SpraySection() {
  const [active, setActive] = useState<string | null>(null);
  const [reduced, setReduced] = useState(qs().get('reduced') === '1');
  const [doneCount, setDoneCount] = useState(0);
  const [run, setRun] = useState(0);
  const scenario = SCENARIOS.find((s) => s.id === active) ?? null;
  const debrief = useMemo(() => (scenario === null ? null : debriefFor(scenario)), [scenario]);
  const timeline = useMemo(() => (debrief === null ? null : buildEffects(debrief, reduced)), [debrief, reduced]);
  const m = scenario === null ? null : getPublicMission(scenario.missionId);
  return (
    <Section id="spray" title="SprayPlayer (live) · pick a scenario">
      <div className="preview-row">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`btn${active === s.id ? ' btn-primary' : ''}`}
            data-testid={`start-${s.id}`}
            onClick={() => {
              setActive(s.id);
              setRun((r) => r + 1);
            }}
          >
            {s.title}
          </button>
        ))}
        <label className="preview-check">
          <input type="checkbox" checked={reduced} onChange={(e) => setReduced(e.target.checked)} /> reduced motion
        </label>
        <span data-testid="done-count">onDone calls: {doneCount}</span>
      </div>
      {scenario !== null && debrief !== null && timeline !== null && m !== null ? (
        <SprayPlayer key={`${scenario.id}-${String(run)}-${String(reduced)}`} codeId={m.code} circuit={m.circuit} debrief={debrief} timeline={timeline} reducedMotion={reduced} onDone={() => setDoneCount((c) => c + 1)} missionCopy={missionCopy(m.id, 'en')} />
      ) : (
        <p>Pick a scenario above.</p>
      )}
    </Section>
  );
}

const FRAME_TIMES: readonly number[] = [250, 700, 1050, 1450, 1700, 2400];

function FramesSection() {
  const scenario = SCENARIOS[2];
  const scenario2 = SCENARIOS[1];
  if (scenario === undefined || scenario2 === undefined) return null;
  const d = debriefFor(scenario);
  const d2 = debriefFor(scenario2);
  const tl = buildEffects(d, false);
  const tl2 = buildEffects(d2, false);
  const m = getPublicMission(scenario.missionId);
  return (
    <Section id="frames" title="Frozen frames · two kinds X1 + Z6 (top) and blind dispatch X on 5 (bottom)">
      <div className="preview-frames">
        {FRAME_TIMES.map((time) => (
          <figure key={time} className="preview-frame">
            <SprayStage codeId={m.code} circuit={m.circuit} debrief={d} timeline={tl} time={time} />
            <figcaption>t = {time} ms</figcaption>
          </figure>
        ))}
      </div>
      <div className="preview-frames">
        {[300, 950, 1300, 1550, 1850, 2600].map((time) => (
          <figure key={time} className="preview-frame">
            <SprayStage codeId={m.code} circuit={m.circuit} debrief={d2} timeline={tl2} time={time} />
            <figcaption>t = {time} ms</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function ResultsSection() {
  return (
    <Section id="results" title="The four results (Scene outcome + ResultOverlay)">
      {SCENARIOS.map((s) => {
        const d = debriefFor(s);
        const m = getPublicMission(s.missionId);
        const result = resultType(d);
        return (
          <div key={s.id} className="scene-stage preview-stage" data-result={result}>
            <Scene
              codeId={m.code}
              circuit={m.circuit}
              fires={d.fires}
              crews={d.crews}
              residual={d.residual}
              syndrome={d.syndromeOfResidual}
              interactive={false}
              outcome={{ result, logicalFlip: d.logicalFlip, patternQubits: support(fromString(d.residual)), beacon: s.missionId === 'silent-failure' || result === 'logical-failure' }}
            />
            <ResultOverlay debrief={d} result={result} missionCopy={missionCopy(m.id, 'en')} stars={d.score.stars} maxStars={d.score.maxStars} onWhy={() => undefined} onRetry={() => undefined} onNext={() => undefined} nextLabel="Next district">
              <p>Raw residual: {d.residual}</p>
              <p>Alarms: {d.syndromeOfResidual.join('')}</p>
              <p>Decision: {d.score.quality}</p>
              {result === 'logical-failure' ? <p>Anomaly: {anomalyLetter(d.logicalFlip)}</p> : null}
            </ResultOverlay>
          </div>
        );
      })}
    </Section>
  );
}

function WhySection() {
  const [reduced, setReduced] = useState(false);
  const s = SCENARIOS[2];
  const s6 = SCENARIOS[3];
  if (s === undefined || s6 === undefined) return null;
  const d = debriefFor(s);
  const d6 = debriefFor(s6);
  const m = getPublicMission(s.missionId);
  const m6 = getPublicMission(s6.missionId);
  return (
    <Section id="why" title="WhyCompare · two kinds (Z6 vs the true Z7: equivalent) and silent failure (X0 vs the true X1 X2)">
      <label className="preview-check">
        <input type="checkbox" checked={reduced} onChange={(e) => setReduced(e.target.checked)} /> reduced motion
      </label>
      <WhyCompare key={`a-${String(reduced)}`} codeId={m.code} circuit={m.circuit} mine={d} reducedMotion={reduced} missionCopy={missionCopy(m.id, 'en')} />
      <WhyCompare key={`b-${String(reduced)}`} codeId={m6.code} circuit={m6.circuit} mine={d6} reducedMotion={reduced} missionCopy={missionCopy(m6.id, 'en')} />
    </Section>
  );
}
