/**
 * Play screens: Training, Challenge (dispatch) and Debrief (replay + what-if + quantum verification).
 * The Challenge view receives ONLY a PublicMissionView and the live placements — never the true error.
 */
import { useEffect, useId, useRef, useState } from 'react';
import { getCode, fromString, letterAt, syndrome as syndromeOf, syndromeToArray, propagate, toString as pauliToString } from '../quantum';
import {
  crewCount,
  filterByDispatch,
  outcomeLabel,
  QUALITY_LABEL,
  SOURCE_LABEL,
  type Action,
  type CloudResult,
  type CloudResultOk,
  type CrewLetter,
  type Debrief,
  type GameState,
  type PublicMissionView,
  type QuantumBridge,
} from '../game';
import { Board } from './Board';
import { Helmet } from './glyphs';
import { AlarmList, Dialog, Legend, Palette, Stars, TopBar, VerdictBanner } from './panels';
import { alarmSummary, fireLabel } from './text';

interface PlayProps {
  readonly state: GameState;
  readonly dispatch: (a: Action) => void;
}

/* ------------------------------------------------------------------ training */

export function TrainingScreen({ state, dispatch, mission }: PlayProps & { readonly mission: PublicMissionView }) {
  const lesson = mission.training[state.lesson];
  const descId = useId();
  if (lesson === undefined) return null;
  const code = getCode(mission.code);
  const start = fromString(lesson.fire);
  const traj = propagate(start, lesson.circuit);
  const cursor = state.lessonCursor;
  const frame = traj.frames[cursor + 1] ?? start;
  const frameStr = pauliToString(frame);
  const isWires = lesson.circuit.length > 0 || code.checks.length === 0;
  const synd = code.checks.length > 0 ? syndromeToArray(syndromeOf(code, frame)) : null;
  const lessonCount = mission.training.length;
  const atLastFrame = cursor >= lesson.circuit.length - 1;
  const atLastLesson = state.lesson === lessonCount - 1;
  const nextLabel = !atLastFrame ? 'Next step' : !atLastLesson ? 'Next lesson' : 'Start dispatch';
  return (
    <main className="screen screen-play">
      <TopBar
        title={`Mission ${String(mission.index)} · ${mission.title}`}
        subtitle={`Training · lesson ${String(state.lesson + 1)} of ${String(lessonCount)} · fires visible`}
        onMissions={() => dispatch({ type: 'OPEN_MISSIONS' })}
        onSettings={() => dispatch({ type: 'OPEN_SETTINGS' })}
      />
      <div className="play-layout">
        <section className="board-col" aria-label="Training board">
          <Board
            codeId={mission.code}
            circuit={lesson.circuit}
            fires={frameStr}
            crews={null}
            residual={null}
            syndrome={synd}
            interactive={false}
            gateCursor={isWires ? cursor : undefined}
            inputFires={isWires ? lesson.fire : null}
            ariaDescribedBy={descId}
            ariaLabel="Training board, fires visible"
          />
          <p className="board-caption" id={descId} aria-live="polite" data-testid="training-caption">
            {lesson.circuit.length > 0 ? (
              <>
                <strong>
                  {cursor < 0 ? 'Start: ' : `After gate ${String(cursor + 1)} of ${String(lesson.circuit.length)}: `}
                  {frameStr}
                </strong>{' '}
              </>
            ) : null}
            {lesson.caption}
          </p>
        </section>
        <aside className="panel">
          {code.checks.length > 0 ? <AlarmList codeId={mission.code} syndrome={synd} /> : null}
          <section className="panel-section">
            <h2 className="panel-title">Lesson</h2>
            <ol className="lesson-dots" aria-label="Lessons">
              {mission.training.map((t, i) => (
                <li key={i}>
                  <button type="button" className={`dot ${i === state.lesson ? 'is-current' : ''}`} aria-current={i === state.lesson ? 'step' : undefined} onClick={() => dispatch({ type: 'LESSON_SELECT', lesson: i })} aria-label={`Lesson ${String(i + 1)}: ${fireLabel(t.fire)}`}>
                    {i + 1}
                  </button>
                </li>
              ))}
            </ol>
            <Legend allowed={mission.allowed} />
          </section>
          <div className="actions">
            <button type="button" className="btn" onClick={() => dispatch({ type: 'LESSON_PREV' })} disabled={state.lesson === 0 && cursor <= -1} data-testid="training-prev">
              Prev
            </button>
            <button type="button" className="btn btn-primary" onClick={() => dispatch({ type: 'LESSON_NEXT' })} data-testid="training-next">
              {nextLabel}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => dispatch({ type: 'START_CHALLENGE' })} data-testid="start-challenge">
              Skip to dispatch
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ challenge */

export interface ChallengeProps {
  /** Public data only. The type has no `error` field by construction. */
  readonly mission: PublicMissionView;
  readonly placements: Readonly<Record<number, CrewLetter>>;
  readonly selected: CrewLetter;
  readonly standDownDialog: boolean;
  readonly dispatch: (a: Action) => void;
}

/**
 * DOM order is palette → blocks → actions (the Tab order from docs/GAME_DESIGN.md); the visual layout
 * (board left, panel right; board on top on phones) comes from CSS grid areas.
 */
export function ChallengeScreen({ mission, placements, selected, standDownDialog, dispatch }: ChallengeProps) {
  const descId = useId();
  const mainRef = useRef<HTMLElement>(null);
  const used = crewCount(placements);
  const budgetReached = used >= mission.budget;
  const isWires = mission.kind === 'propagation';
  const synd = isWires ? null : mission.syndrome;

  // Keyboard shortcuts: 1/2/3 select, Backspace recalls the focused block's crew (or clears all), C confirms.
  // Active only while focus is inside this dispatch screen (never from the body, a notice or a dialog).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (standDownDialog || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target instanceof HTMLElement ? e.target : null;
      const root = mainRef.current;
      if (t === null || root === null || !root.contains(t)) return;
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') return;
      const map: Record<string, CrewLetter> = { '1': 'X', '2': 'Z', '3': 'Y' };
      const letter = map[e.key];
      if (letter !== undefined) {
        if (mission.allowed.includes(letter)) dispatch({ type: 'SELECT_LETTER', letter });
        e.preventDefault();
        return;
      }
      if (e.key === 'Backspace' || e.key === 'Delete') {
        const block = t.closest<HTMLElement>('button.block[data-q]');
        const q = block === null ? NaN : Number(block.dataset['q']);
        if (Number.isInteger(q)) dispatch({ type: 'RECALL_BLOCK', qubit: q });
        else dispatch({ type: 'CLEAR_CREWS' });
        e.preventDefault();
        return;
      }
      if (e.key === 'c' || e.key === 'C') {
        dispatch({ type: 'CONFIRM' });
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [dispatch, mission.allowed, standDownDialog]);

  const startLetters = mission.visibleStart === null ? [] : Array.from(mission.visibleStart).map((l, q) => ({ q, l })).filter((x) => x.l !== 'I');

  return (
    <main className="screen screen-play screen-challenge" ref={mainRef}>
      <TopBar
        title={`Mission ${String(mission.index)} · ${mission.title}`}
        subtitle={isWires ? 'Dispatch · predict where the fires end up' : 'Dispatch · fires hidden, alarms live'}
        onMissions={() => dispatch({ type: 'OPEN_MISSIONS' })}
        onSettings={() => dispatch({ type: 'OPEN_SETTINGS' })}
      />
      <div className="play-layout play-layout-challenge">
        <aside className="panel panel-before">
          {!isWires ? <AlarmList codeId={mission.code} syndrome={synd} /> : null}
          <Palette allowed={mission.allowed} selected={selected} onSelect={(l) => dispatch({ type: 'SELECT_LETTER', letter: l })} />
        </aside>
        <section className="board-col" aria-label="Dispatch board">
          <Board
            codeId={mission.code}
            circuit={mission.circuit}
            fires={null}
            crews={null}
            placements={placements}
            residual={null}
            syndrome={synd}
            interactive
            onToggle={(q) => dispatch({ type: 'TOGGLE_BLOCK', qubit: q })}
            selected={selected}
            budgetReached={budgetReached}
            inputFires={isWires ? mission.visibleStart : null}
            ariaDescribedBy={descId}
          />
          <p className="board-caption" id={descId}>
            {isWires ? (
              <>
                Starting fire: {startLetters.map((x) => `${x.l} on q${String(x.q)}`).join(', ')}. The fires travel through the circuit; send crews to where they
                <em> end up</em>.
              </>
            ) : (
              alarmSummary(mission.code, synd)
            )}{' '}
            <span className="muted">Tap a block to send the selected crew; tap again to recall it.</span>
          </p>
        </section>
        <aside className="panel panel-after">
          <section className="panel-section">
            <h2 className="panel-title">Dispatch</h2>
            <p className="budget" data-testid="budget" aria-live="polite">
              Crews: <strong>{used}</strong> / {mission.budget}
              {budgetReached ? <span className="muted"> · budget reached</span> : null}
            </p>
            <ul className="placement-list" aria-label="Placed crews">
              {Object.entries(placements)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([q, l]) => (
                  <li key={q}>
                    <Helmet letter={l} size={18} /> {l} crew → block {q}
                  </li>
                ))}
              {used === 0 ? <li className="muted">No crews placed.</li> : null}
            </ul>
          </section>
          <div className="actions actions-sticky">
            <button type="button" className="btn" onClick={() => dispatch({ type: 'CLEAR_CREWS' })} disabled={used === 0}>
              Clear
            </button>
            <button type="button" className="btn btn-primary" onClick={() => dispatch({ type: 'CONFIRM' })} data-testid="confirm">
              Confirm dispatch
            </button>
          </div>
        </aside>
      </div>
      {standDownDialog ? (
        <Dialog title="Stand down with no crews?" confirmLabel="Stand down" cancelLabel="Keep dispatching" onConfirm={() => dispatch({ type: 'STAND_DOWN_CONFIRM' })} onCancel={() => dispatch({ type: 'STAND_DOWN_CANCEL' })}>
          <p>You are about to confirm without sending any crew. Whatever is burning stays burning.</p>
        </Dialog>
      ) : null}
    </main>
  );
}

/* ------------------------------------------------------------------ debrief */

export interface DebriefProps extends PlayProps {
  readonly mission: PublicMissionView;
  readonly debrief: Debrief;
  readonly bridge: QuantumBridge;
}

export function DebriefScreen({ state, dispatch, mission, debrief, bridge }: DebriefProps) {
  const step = debrief.steps[state.replayIndex] ?? debrief.steps[debrief.steps.length - 1];
  const descId = useId();
  const code = getCode(mission.code);
  if (step === undefined) return null;
  const last = debrief.steps.length - 1;
  const isWires = mission.kind === 'propagation';
  const residualP = fromString(debrief.residual);
  const residualBlocks = Array.from({ length: code.n }, (_, q) => q).filter((q) => letterAt(residualP, q) !== 'I');
  const logicalText =
    debrief.verdict === 'success'
      ? 'preserved'
      : debrief.verdict === 'detectable'
        ? 'undecided — alarms still ringing'
        : isWires
          ? `missed — fires left on ${residualBlocks.length === 1 ? 'block' : 'blocks'} ${residualBlocks.join(', ')}`
          : `flipped (${[debrief.logicalFlip.x.some(Boolean) ? 'X̄' : null, debrief.logicalFlip.z.some(Boolean) ? 'Z̄' : null].filter(Boolean).join(' and ')})`;
  return (
    <main className="screen screen-play screen-debrief">
      <TopBar
        title={`Mission ${String(mission.index)} · ${mission.title}`}
        subtitle="Debrief · everything revealed"
        onMissions={() => dispatch({ type: 'OPEN_MISSIONS' })}
        onSettings={() => dispatch({ type: 'OPEN_SETTINGS' })}
      />
      <div className="play-layout">
        <section className="board-col" aria-label="Replay board">
          <VerdictBanner verdict={debrief.verdict} label={debrief.verdictLabel} />
          <Board
            codeId={mission.code}
            circuit={mission.circuit}
            fires={step.fires}
            crews={step.crews}
            residual={step.residual}
            syndrome={step.syndrome}
            interactive={false}
            gateCursor={isWires ? step.gateCursor : undefined}
            inputFires={isWires ? debrief.startFires : null}
            ariaDescribedBy={descId}
            ariaLabel="Replay board"
          />
          <p className="board-caption" id={descId} aria-live="polite" data-testid="replay-caption">
            <strong>
              Step {state.replayIndex + 1} of {debrief.steps.length} · {STEP_TITLE[step.id.startsWith('gate-') ? 'gate' : step.id] ?? step.id}.
            </strong>{' '}
            {step.caption}
          </p>
          <div className="replay-controls" role="group" aria-label="Replay controls">
            <button type="button" className="btn" onClick={() => dispatch({ type: 'REPLAY_PREV' })} disabled={state.replayIndex === 0} data-testid="replay-prev">
              Prev
            </button>
            <button type="button" className="btn" onClick={() => dispatch({ type: 'REPLAY_NEXT' })} disabled={state.replayIndex === last} data-testid="replay-next">
              Next
            </button>
            <button type="button" className={`btn ${state.autoPlay ? 'is-active' : ''}`} aria-pressed={state.autoPlay} onClick={() => dispatch({ type: 'REPLAY_AUTO', on: !state.autoPlay })} data-testid="replay-auto">
              Auto-play
            </button>
            <ol className="step-dots" aria-label="Replay steps">
              {debrief.steps.map((s, i) => (
                <li key={s.id}>
                  <button type="button" className={`dot ${i === state.replayIndex ? 'is-current' : ''}`} aria-current={i === state.replayIndex ? 'step' : undefined} onClick={() => dispatch({ type: 'REPLAY_GOTO', index: i })} aria-label={`Step ${String(i + 1)}: ${STEP_TITLE[s.id.startsWith('gate-') ? 'gate' : s.id] ?? s.id}`}>
                    {i + 1}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <aside className="panel">
          <section className="panel-section">
            <h2 className="panel-title">Report</h2>
            <dl className="facts">
              <div>
                <dt>True fires</dt>
                <dd className="mono">{debrief.fires}</dd>
              </div>
              {isWires ? (
                <div>
                  <dt>Started as</dt>
                  <dd className="mono">{debrief.startFires}</dd>
                </div>
              ) : null}
              <div>
                <dt>Your crews</dt>
                <dd className="mono">{debrief.crews}</dd>
              </div>
              <div>
                <dt>Residual</dt>
                <dd className="mono" data-testid="residual">
                  {debrief.residual}
                  {residualBlocks.length > 0 ? <span className="muted"> · blocks {residualBlocks.join(', ')}</span> : <span className="muted"> · nothing left</span>}
                </dd>
              </div>
              <div>
                <dt>Logical</dt>
                <dd>{logicalText}</dd>
              </div>
              <div>
                <dt>Decision</dt>
                <dd>
                  {QUALITY_LABEL[debrief.score.quality]} · <Stars count={debrief.score.stars} max={debrief.score.maxStars} size={16} />
                </dd>
              </div>
            </dl>
            <p className="narrative" data-testid="narrative">
              {debrief.narrative}
            </p>
          </section>
          {code.checks.length > 0 ? <AlarmList codeId={mission.code} syndrome={step.syndrome} compact /> : null}
          <section className="panel-section whatif" data-testid="whatif">
            <h2 className="panel-title">What if</h2>
            <p>
              Minimum-weight dispatch for these alarms: <span className="mono">{debrief.whatIf.decoderCrews}</span> → {outcomeLabel(debrief.whatIf.decoderVerdict, code.checks.length > 0)}.
            </p>
            {debrief.whatIf.trueFireCrews !== null ? (
              <p>
                Crews matching the true fires: <span className="mono">{debrief.whatIf.trueFireCrews}</span> → Logical qubit safe.
              </p>
            ) : null}
            <p className="muted">{debrief.whatIf.explanation}</p>
          </section>
          <CloudPanel key={`${mission.id}:${debrief.crews}`} bridge={bridge} missionId={mission.id} correction={debrief.crews} />
          <div className="actions actions-sticky">
            <button type="button" className="btn" onClick={() => dispatch({ type: 'TRY_AGAIN' })} data-testid="try-again">
              Try again
            </button>
            <button type="button" className="btn btn-primary" onClick={() => dispatch({ type: 'SHOW_RESULT' })} data-testid="to-result">
              Result
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => dispatch({ type: 'NEXT_MISSION' })} data-testid="debrief-next">
              Next mission
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}

const STEP_TITLE: Readonly<Record<string, string>> = {
  placed: 'Fires placed',
  gate: 'Gate',
  alarms: 'Alarms',
  dispatch: 'Your dispatch',
  residual: 'Residual',
  verdict: 'Verdict',
};

/* ------------------------------------------------------------------ cloud verification */

type CloudState = { readonly kind: 'idle' } | { readonly kind: 'running' } | { readonly kind: 'done'; readonly result: CloudResult };

/**
 * Shows only recorded results that verify THIS dispatch (identical crews, or crews that differ from the
 * recorded ones by a stabilizer). The bridge filters already; the UI filters again so a bridge that ignores
 * the second argument (the Qollab live path) can never show a card for a different dispatch.
 */
export function CloudPanel({ bridge, missionId, correction }: { readonly bridge: QuantumBridge; readonly missionId: string; readonly correction: string }) {
  const [live, setLive] = useState<CloudState>({ kind: 'idle' });
  const allForMission = bridge.cached(missionId);
  const cached = filterByDispatch(bridge.cached(missionId, correction), missionId, correction);
  const otherDispatches = Array.from(new Set(allForMission.map((r) => r.correction))).filter((c) => !cached.some((r) => r.correction === c));
  const canRun = bridge.kind === 'qollab' && typeof bridge.run === 'function';
  const remaining = bridge.jobsRemaining?.() ?? 0;
  const run = async () => {
    if (!canRun || bridge.run === undefined) return;
    setLive({ kind: 'running' });
    const result = await bridge.run({ missionId, correction, shots: 100 });
    setLive({ kind: 'done', result });
  };
  return (
    <section className="panel-section cloud" data-testid="cloud-panel">
      <h2 className="panel-title">Quantum verification</h2>
      <p className="muted small">
        The verdict above is exact Pauli-frame algebra computed locally. Circuit-level runs (Qiskit) are labelled by where they ran and are never invented. Only runs of
        this dispatch (<span className="mono">{correction}</span>, or crews equivalent to it) are shown.
      </p>
      {cached.length === 0 && live.kind === 'idle' ? (
        <p className="cloud-empty" data-testid="cloud-empty">
          No cloud result recorded for this dispatch{otherDispatches.length > 0 ? ` (recorded dispatches: ${otherDispatches.join(', ')})` : ''}.
        </p>
      ) : null}
      {cached.map((r, i) => (
        <CloudResultCard key={`${r.startedAt}-${String(i)}`} result={r} />
      ))}
      {live.kind === 'running' ? (
        <p className="cloud-running" role="status">
          Running on {bridge.backendName ?? 'the selected backend'} (100 shots)…
        </p>
      ) : null}
      {live.kind === 'done' ? live.result.status === 'ok' ? <CloudResultCard result={live.result} /> : <p className="cloud-error" role="alert">Verification failed: {live.result.message}</p> : null}
      {canRun ? (
        <button type="button" className="btn" onClick={() => void run()} disabled={live.kind === 'running' || remaining <= 0}>
          {remaining <= 0 ? 'No job left in this run' : `Verify on ${bridge.backendName ?? 'selected backend'} (100 shots)`}
        </button>
      ) : null}
    </section>
  );
}

function CloudResultCard({ result }: { readonly result: CloudResultOk }) {
  const total = Object.values(result.counts).reduce((a, b) => a + b, 0);
  const top = Object.entries(result.counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);
  return (
    <div className={`cloud-card cloud-${result.source}`} data-testid="cloud-card">
      <p className="cloud-source">
        <span className="tag">{SOURCE_LABEL[result.source]}</span> {result.backendName} · {result.shots} shots · {new Date(result.finishedAt).toISOString().slice(0, 16).replace('T', ' ')} UTC
      </p>
      <p className="cloud-dispatch small">
        Recorded crews: <span className="mono">{result.correction}</span> · Job id: <span className="mono">{result.jobId ?? 'none (local run)'}</span>
      </p>
      <ul className="counts">
        {top.map(([bits, n]) => (
          <li key={bits}>
            <span className="mono">{bits}</span> <span className="muted">{n}</span> <span className="bar" style={{ width: `${String(total > 0 ? (n / total) * 100 : 0)}%` }} aria-hidden="true" />
          </li>
        ))}
      </ul>
      <dl className="facts small cloud-facts">
        {summariseAnalysis(result).map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Curated, human-readable summary of the Python-side analysis (shape documented in qollab/q11/circuits.py). */
function summariseAnalysis(result: CloudResultOk): readonly (readonly [string, string])[] {
  const out: (readonly [string, string])[] = [];
  const a = isRecord(result.analysis) ? result.analysis : {};
  const p = isRecord(result.prediction) ? result.prediction : {};
  const pct = (x: unknown): string | null => (typeof x === 'number' ? `${String(Math.round(x * 100))}%` : null);
  const bits = (x: unknown): string | null => (Array.isArray(x) && x.every((b) => b === 0 || b === 1) ? x.map(String).join('') : null);
  const dom = bits(a['dominantSyndrome']);
  const predSyn = bits(p['syndrome']);
  if (dom !== null) out.push(['Dominant alarm pattern', predSyn !== null ? `${dom} (predicted ${predSyn})` : dom]);
  const synShare = pct(a['predictedSyndromeShare']);
  if (synShare !== null) out.push(['Shots with the predicted alarms', synShare]);
  const ls = a['predictedLogicalShare'];
  if (Array.isArray(ls) && typeof ls[0] === 'number') out.push(['Shots with the predicted logical bit', pct(ls[0]) ?? '—']);
  const dm = a['dominantMatches'];
  if (isRecord(dm)) {
    const ok = Object.values(dm).every((v) => v === true || v === null);
    out.push(['Dominant outcome agrees with the verdict', ok ? 'yes' : 'no']);
  }
  const em = a['exactMatchesIdealModel'] ?? a['matches'];
  if (isRecord(em)) out.push(['Exact match with the noiseless model', Object.values(em).every((v) => v === true || v === null) ? 'yes' : 'no (expected under a noise model)']);
  if (typeof p['verdict'] === 'string') out.push(['Pauli-frame verdict', p['verdict']]);
  if (typeof a['readoutBasis'] === 'string' && typeof a['prep'] === 'string') out.push(['Prepared / readout', `logical |${a['prep']}⟩ / ${a['readoutBasis']} basis`]);
  return out;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}
