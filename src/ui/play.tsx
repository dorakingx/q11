/**
 * Play screens: Training, Challenge (dispatch) and Debrief (replay + what-if + quantum verification).
 * The Challenge view receives ONLY a PublicMissionView and the live placements — never the true error.
 */
import { useEffect, useId, useState } from 'react';
import { getCode, fromString, letterAt, syndrome as syndromeOf, syndromeToArray, propagate, toString as pauliToString } from '../quantum';
import {
  crewCount,
  OUTCOME_LABEL,
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
import { alarmSummary } from './text';

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
            <h3 className="panel-title">Lesson</h3>
            <ol className="lesson-dots" aria-label="Lessons">
              {mission.training.map((t, i) => (
                <li key={i}>
                  <button type="button" className={`dot ${i === state.lesson ? 'is-current' : ''}`} aria-current={i === state.lesson ? 'step' : undefined} onClick={() => dispatch({ type: 'LESSON_SELECT', lesson: i })} aria-label={`Lesson ${String(i + 1)}: ${t.fire}`}>
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

export function ChallengeScreen({ mission, placements, selected, standDownDialog, dispatch }: ChallengeProps) {
  const descId = useId();
  const used = crewCount(placements);
  const budgetReached = used >= mission.budget;
  const isWires = mission.kind === 'propagation';
  const synd = isWires ? null : mission.syndrome;

  // Keyboard shortcuts: 1/2/3 select, Backspace clears, C confirms. Arrow keys live on the blocks themselves.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (standDownDialog || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t !== null && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      const map: Record<string, CrewLetter> = { '1': 'X', '2': 'Z', '3': 'Y' };
      const letter = map[e.key];
      if (letter !== undefined) {
        if (mission.allowed.includes(letter)) dispatch({ type: 'SELECT_LETTER', letter });
        e.preventDefault();
        return;
      }
      if (e.key === 'Backspace' || e.key === 'Delete') {
        dispatch({ type: 'CLEAR_CREWS' });
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
    <main className="screen screen-play screen-challenge">
      <TopBar
        title={`Mission ${String(mission.index)} · ${mission.title}`}
        subtitle={isWires ? 'Dispatch · predict where the fires end up' : 'Dispatch · fires hidden, alarms live'}
        onMissions={() => dispatch({ type: 'OPEN_MISSIONS' })}
        onSettings={() => dispatch({ type: 'OPEN_SETTINGS' })}
      />
      <div className="play-layout">
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
        <aside className="panel">
          {!isWires ? <AlarmList codeId={mission.code} syndrome={synd} /> : null}
          <Palette allowed={mission.allowed} selected={selected} onSelect={(l) => dispatch({ type: 'SELECT_LETTER', letter: l })} />
          <section className="panel-section">
            <h3 className="panel-title">Dispatch</h3>
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
          {step.showVerdict ? <VerdictBanner verdict={debrief.verdict} /> : <div className="verdict verdict-pending" aria-hidden="true">Replay · step {state.replayIndex + 1} of {debrief.steps.length}</div>}
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
            <strong>{STEP_TITLE[step.id.startsWith('gate-') ? 'gate' : step.id] ?? step.id}.</strong> {step.caption}
          </p>
          <div className="replay-controls" role="group" aria-label="Replay controls">
            <button type="button" className="btn" onClick={() => dispatch({ type: 'REPLAY_PREV' })} disabled={state.replayIndex === 0} data-testid="replay-prev">
              Prev
            </button>
            <button type="button" className="btn" onClick={() => dispatch({ type: 'REPLAY_NEXT' })} disabled={state.replayIndex === last} data-testid="replay-next">
              Next
            </button>
            <button type="button" className={`btn ${state.autoPlay ? 'is-active' : ''}`} aria-pressed={state.autoPlay} onClick={() => dispatch({ type: 'REPLAY_AUTO', on: !state.autoPlay })} data-testid="replay-auto">
              {state.autoPlay ? 'Pause' : 'Auto-play'}
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
            <h3 className="panel-title">Report</h3>
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
                <dd>
                  {debrief.verdict === 'logical-error'
                    ? `flipped (${[debrief.logicalFlip.x.some(Boolean) ? 'X̄' : null, debrief.logicalFlip.z.some(Boolean) ? 'Z̄' : null].filter(Boolean).join(' and ')})`
                    : debrief.verdict === 'success'
                      ? 'preserved'
                      : 'undecided — alarms still ringing'}
                </dd>
              </div>
              <div>
                <dt>Decision</dt>
                <dd>
                  {QUALITY_LABEL[debrief.score.quality]} · <Stars count={debrief.score.stars} size={16} />
                </dd>
              </div>
            </dl>
            <p className="narrative" data-testid="narrative">
              {debrief.narrative}
            </p>
          </section>
          {code.checks.length > 0 ? <AlarmList codeId={mission.code} syndrome={step.syndrome} compact /> : null}
          <section className="panel-section whatif" data-testid="whatif">
            <h3 className="panel-title">What if</h3>
            <p>
              Minimum-weight dispatch for these alarms: <span className="mono">{debrief.whatIf.decoderCrews}</span> → {OUTCOME_LABEL[debrief.whatIf.decoderVerdict]}.
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

export function CloudPanel({ bridge, missionId, correction }: { readonly bridge: QuantumBridge; readonly missionId: string; readonly correction: string }) {
  const [live, setLive] = useState<CloudState>({ kind: 'idle' });
  const cached = bridge.cached(missionId);
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
      <h3 className="panel-title">Quantum verification</h3>
      <p className="muted small">
        The verdict above is exact Pauli-frame algebra computed locally. Circuit-level runs (Qiskit) are labelled by where they ran and are never invented.
      </p>
      {cached.length === 0 && live.kind === 'idle' ? <p className="cloud-empty">No cloud result recorded yet.</p> : null}
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
    <div className={`cloud-card cloud-${result.source}`}>
      <p className="cloud-source">
        <span className="tag">{SOURCE_LABEL[result.source]}</span> {result.backendName} · {result.shots} shots · {new Date(result.finishedAt).toISOString().slice(0, 16).replace('T', ' ')} UTC
      </p>
      <ul className="counts">
        {top.map(([bits, n]) => (
          <li key={bits}>
            <span className="mono">{bits}</span> <span className="muted">{n}</span> <span className="bar" style={{ width: `${String(total > 0 ? (n / total) * 100 : 0)}%` }} aria-hidden="true" />
          </li>
        ))}
      </ul>
      {isRecord(result.analysis) ? (
        <dl className="facts small">
          {Object.entries(result.analysis)
            .filter(([, v]) => typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean')
            .map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{String(v)}</dd>
              </div>
            ))}
        </dl>
      ) : null}
    </div>
  );
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

