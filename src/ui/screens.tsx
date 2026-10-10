/**
 * Non-play screens: title, how it works, mission list, settings, briefing, result, summary.
 */
import { getCode } from '../quantum';
import { listPublicMissions, OUTCOME_LABEL, QUALITY_LABEL, totalStars, type Action, type Debrief, type GameState, type PublicMissionView } from '../game';
import { Flame, GearIcon, Helmet, Q11Mark, StationGlyph } from './glyphs';
import { Stars, TopBar } from './panels';

export interface ScreenProps {
  readonly state: GameState;
  readonly dispatch: (a: Action) => void;
  readonly storageLabel: string;
}

export function TitleScreen({ state, dispatch }: ScreenProps) {
  const stars = totalStars(state.progress);
  return (
    <main className="screen screen-title">
      <div className="title-card">
        <Q11Mark size={96} />
        <h1 className="title-h">
          Q11 <span className="title-dash">—</span> Quantum Emergency Response
        </h1>
        <p className="title-lead">Read the alarms, dispatch the firefighters, protect the logical qubit.</p>
        <div className="title-actions">
          <button type="button" className="btn btn-primary btn-large" onClick={() => dispatch({ type: 'PLAY' })} data-testid="play">
            Play
          </button>
          <button type="button" className="btn btn-large" onClick={() => dispatch({ type: 'OPEN_HOW' })}>
            How it works
          </button>
          <button type="button" className="btn btn-ghost btn-icon btn-large" onClick={() => dispatch({ type: 'OPEN_SETTINGS' })} aria-label="Settings">
            <GearIcon />
          </button>
        </div>
        {stars > 0 ? (
          <p className="muted title-progress">
            Progress: {stars} of 18 stars.
          </p>
        ) : null}
        <p className="title-foot muted">Qollab × IonQ Global Quantum Hackathon 2026 entry. This effort is supported by Qollab &amp; IonQ.</p>
      </div>
    </main>
  );
}

export function HowItWorks({ dispatch }: ScreenProps) {
  return (
    <main className="screen screen-doc">
      <TopBar title="How it works" onSettings={() => dispatch({ type: 'OPEN_SETTINGS' })} onTitle={() => dispatch({ type: 'OPEN_TITLE' })} />
      <article className="doc">
        <p>
          Q11 is a <strong>fire-dispatch metaphor</strong> for quantum error correction. Nothing here is about real fires or real
          firefighting; every fire, alarm and crew is a piece of quantum algebra.
        </p>
        <dl className="how-list">
          <div>
            <dt>Blocks</dt>
            <dd>Qubits. The number is the qubit index.</dd>
          </div>
          <div>
            <dt>
              Fires <Flame letter="X" size={20} /> <Flame letter="Z" size={20} /> <Flame letter="Y" size={20} />
            </dt>
            <dd>
              Pauli errors lit by an arsonist called <em>Noise</em>. Red = X, blue = Z, split red-and-blue = Y (= X and Z at once).
            </dd>
          </div>
          <div>
            <dt>
              Alarm stations <StationGlyph type="Z" ringing={false} /> <StationGlyph type="X" ringing={false} />
            </dt>
            <dd>
              Stabilizer checks that stand between blocks. A <strong>diamond Z station</strong> rings when an <em>odd</em> number of its
              blocks carry a red (X or Y) fire; a <strong>square X station</strong> rings for an odd number of blue (Z or Y) fires. A station
              never rings just because a fire is nearby, and it never says which block is burning.
            </dd>
          </div>
          <div>
            <dt>
              Crews <Helmet letter="X" size={20} /> <Helmet letter="Z" size={20} /> <Helmet letter="Y" size={20} />
            </dt>
            <dd>
              Corrections. A red crew on a red fire puts it out (X·X = I). A red crew on a safe block <em>lights</em> a red fire.
              Fires and crews combine by XOR, never by “more is better”.
            </dd>
          </div>
          <div>
            <dt>Gates</dt>
            <dd>
              Fires move only through gates. CNOT copies red forward (control → target) and blue backward (target → control).
              H swaps red and blue on its own wire.
            </dd>
          </div>
          <div>
            <dt>Verdict</dt>
            <dd>
              After you confirm, the residual R = crews ⊕ fires is judged by the code’s algebra: <strong>Logical qubit safe</strong> if R is a
              stabilizer; <strong>Silent failure</strong> if every alarm is quiet but R acts as a logical operator; <strong>Fires still
              burning</strong> if any station still rings. Quiet alarms alone are never proof of safety.
            </dd>
          </div>
        </dl>
        <h2>Controls</h2>
        <ul className="plain-list">
          <li>Tap or click a block to send the selected crew; tap again to recall it.</li>
          <li>
            Keyboard: <kbd>1</kbd>/<kbd>2</kbd>/<kbd>3</kbd> select X/Z/Y crews, arrows move between blocks, <kbd>Enter</kbd> or{' '}
            <kbd>Space</kbd> toggles a crew, <kbd>Backspace</kbd> clears, <kbd>C</kbd> confirms.
          </li>
          <li>Sound is off by default; motion follows your system setting and the manual toggle in Settings.</li>
        </ul>
        <p className="muted small">
          Model: Clifford + Pauli educational simulation with a perfect-syndrome assumption. The repetition code is an X-noise-only
          introduction; the main district is a distance-3 rotated surface code.
        </p>
        <div className="doc-actions">
          <button type="button" className="btn btn-primary" onClick={() => dispatch({ type: 'CLOSE_OVERLAY' })}>
            Back
          </button>
        </div>
      </article>
    </main>
  );
}

const CODE_LABEL: Readonly<Record<string, string>> = {
  rep3: 'Repetition code · 3 blocks',
  rsc3: 'Surface code d=3 · 9 blocks',
  trivial2: 'Two bare wires',
  trivial3: 'Three bare wires',
};

export function MissionList({ state, dispatch }: ScreenProps) {
  const missions = listPublicMissions();
  return (
    <main className="screen screen-missions">
      <TopBar
        title="Missions"
        subtitle={`${String(totalStars(state.progress))} of 18 stars`}
        onSettings={() => dispatch({ type: 'OPEN_SETTINGS' })}
        onTitle={() => dispatch({ type: 'OPEN_TITLE' })}
      />
      <ol className="mission-list" aria-label="Missions">
        {missions.map((m) => {
          const p = state.progress[m.id];
          return (
            <li key={m.id}>
              <button type="button" className={`mission-card ${p?.completed ? 'is-complete' : ''}`} onClick={() => dispatch({ type: 'SELECT_MISSION', id: m.id })} data-testid={`mission-${String(m.index)}`}>
                <span className="mission-index" aria-hidden="true">
                  {m.index}
                </span>
                <span className="mission-body">
                  <span className="mission-title">
                    <span className="sr-only">Mission {m.index}: </span>
                    {m.title}
                  </span>
                  <span className="mission-meta">
                    {CODE_LABEL[m.code] ?? m.code} · {m.kind === 'dispatch' ? 'dispatch' : 'propagation'}
                  </span>
                </span>
                <span className="mission-stars">
                  <Stars count={p?.stars ?? 0} size={18} label={p === undefined ? 'not played yet' : `${String(p.stars)} of 3 stars`} />
                  <span className="mission-status">{p === undefined ? 'New' : p.completed ? 'Complete' : `${String(p.attempts)} attempt${p.attempts === 1 ? '' : 's'}`}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </main>
  );
}

export function SettingsScreen({ state, dispatch, storageLabel, onReset }: ScreenProps & { readonly onReset: () => void }) {
  return (
    <main className="screen screen-doc">
      <TopBar title="Settings" onSettings={() => dispatch({ type: 'CLOSE_OVERLAY' })} onTitle={() => dispatch({ type: 'OPEN_TITLE' })} />
      <section className="doc">
        <div className="setting-row">
          <div>
            <span className="setting-name" id="set-sound">
              Sound
            </span>
            <p className="muted small">Simple tones for crews, alarms and verdicts. Off by default.</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={state.settings.sound}
            aria-labelledby="set-sound"
            className={`switch ${state.settings.sound ? 'is-on' : ''}`}
            onClick={() => dispatch({ type: 'SET_SOUND', on: !state.settings.sound })}
            data-testid="switch-sound"
          >
            <span className="switch-knob" aria-hidden="true" />
            <span className="switch-text">{state.settings.sound ? 'On' : 'Off'}</span>
          </button>
        </div>
        <div className="setting-row">
          <div>
            <span className="setting-name" id="set-motion">
              Reduce motion
            </span>
            <p className="muted small">Stops the alarm pulse and transitions. Your system “reduce motion” preference is always respected too.</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={state.settings.reducedMotion}
            aria-labelledby="set-motion"
            className={`switch ${state.settings.reducedMotion ? 'is-on' : ''}`}
            onClick={() => dispatch({ type: 'SET_REDUCED_MOTION', on: !state.settings.reducedMotion })}
            data-testid="switch-motion"
          >
            <span className="switch-knob" aria-hidden="true" />
            <span className="switch-text">{state.settings.reducedMotion ? 'On' : 'Off'}</span>
          </button>
        </div>
        <div className="setting-row">
          <div>
            <span className="setting-name">Progress</span>
            <p className="muted small">{storageLabel}</p>
          </div>
          <button type="button" className="btn btn-danger" onClick={onReset} data-testid="reset-progress">
            Reset progress
          </button>
        </div>
        <div className="doc-actions">
          <button type="button" className="btn btn-primary" onClick={() => dispatch({ type: 'CLOSE_OVERLAY' })}>
            Back
          </button>
        </div>
      </section>
    </main>
  );
}

export function BriefingScreen({ state, dispatch, mission }: ScreenProps & { readonly mission: PublicMissionView }) {
  const code = getCode(mission.code);
  return (
    <main className="screen screen-brief">
      <TopBar
        title={`Mission ${String(mission.index)} · ${mission.title}`}
        subtitle="Briefing"
        onMissions={() => dispatch({ type: 'OPEN_MISSIONS' })}
        onSettings={() => dispatch({ type: 'OPEN_SETTINGS' })}
      />
      <section className="brief">
        <p className="brief-text">{mission.briefing}</p>
        <dl className="brief-facts">
          <div>
            <dt>District</dt>
            <dd>{code.name}</dd>
          </div>
          <div>
            <dt>Crews</dt>
            <dd>
              {mission.allowed.map((l) => (
                <span key={l} className="inline-glyph">
                  <Helmet letter={l} size={20} /> {l}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt>Budget</dt>
            <dd>{mission.budget === 1 ? '1 crew' : `${String(mission.budget)} crews`}</dd>
          </div>
          <div>
            <dt>Previous best</dt>
            <dd>
              <Stars count={state.progress[mission.id]?.stars ?? 0} size={18} />
            </dd>
          </div>
        </dl>
        <div className="brief-actions">
          <button type="button" className="btn btn-primary btn-large" onClick={() => dispatch({ type: 'START_MISSION' })} data-testid="start-mission">
            {mission.training.length > 0 ? 'Start training' : 'Start'}
          </button>
          {mission.training.length > 0 ? (
            <button type="button" className="btn btn-large" onClick={() => dispatch({ type: 'START_CHALLENGE' })}>
              Skip to dispatch
            </button>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export function ResultScreen({ state, dispatch, mission, debrief }: ScreenProps & { readonly mission: PublicMissionView; readonly debrief: Debrief }) {
  const s = debrief.score;
  const isLast = mission.index === listPublicMissions().length;
  return (
    <main className="screen screen-result">
      <TopBar title={`Mission ${String(mission.index)} · ${mission.title}`} subtitle="Result" onMissions={() => dispatch({ type: 'OPEN_MISSIONS' })} onSettings={() => dispatch({ type: 'OPEN_SETTINGS' })} />
      <section className="result" data-testid="result">
        <Stars count={s.stars} size={44} />
        <h2 className="result-h">{s.stars === 3 ? 'Flawless dispatch' : s.stars === 2 ? 'Fires out' : s.stars === 1 ? (s.quality === 'unlucky' ? 'Right call, cruel luck' : 'Close') : 'Try again'}</h2>
        <dl className="result-facts">
          <div>
            <dt>Decision</dt>
            <dd>{QUALITY_LABEL[s.quality]}</dd>
          </div>
          <div>
            <dt>Outcome</dt>
            <dd className={`outcome outcome-${s.outcome}`}>{OUTCOME_LABEL[s.outcome]}</dd>
          </div>
          <div>
            <dt>Cost</dt>
            <dd>
              {s.crewsUsed} crew{s.crewsUsed === 1 ? '' : 's'} used · minimum {s.minCrews}
            </dd>
          </div>
          <div>
            <dt>Attempts</dt>
            <dd>{state.progress[mission.id]?.attempts ?? 1}</dd>
          </div>
        </dl>
        <div className="result-actions">
          <button type="button" className="btn btn-primary btn-large" onClick={() => dispatch({ type: 'NEXT_MISSION' })} data-testid="next-mission">
            {isLast ? 'Summary' : 'Next mission'}
          </button>
          <button type="button" className="btn btn-large" onClick={() => dispatch({ type: 'TRY_AGAIN' })}>
            Try again
          </button>
          <button type="button" className="btn btn-ghost btn-large" onClick={() => dispatch({ type: 'OPEN_MISSIONS' })}>
            Missions
          </button>
        </div>
      </section>
    </main>
  );
}

export function SummaryScreen({ state, dispatch }: ScreenProps) {
  const missions = listPublicMissions();
  const total = totalStars(state.progress);
  return (
    <main className="screen screen-summary">
      <TopBar title="Shift complete" subtitle={`${String(total)} of 18 stars`} onMissions={() => dispatch({ type: 'OPEN_MISSIONS' })} onSettings={() => dispatch({ type: 'OPEN_SETTINGS' })} />
      <section className="summary" data-testid="summary">
        <p className="brief-text">
          Every mission is on record. Single fires are always caught in a distance-3 district; the lesson of Silent Failure is why
          real machines build bigger ones.
        </p>
        <table className="summary-table">
          <thead>
            <tr>
              <th scope="col">Mission</th>
              <th scope="col">Stars</th>
              <th scope="col">Attempts</th>
            </tr>
          </thead>
          <tbody>
            {missions.map((m) => {
              const p = state.progress[m.id];
              return (
                <tr key={m.id}>
                  <th scope="row">
                    {m.index}. {m.title}
                  </th>
                  <td>
                    <Stars count={p?.stars ?? 0} size={18} />
                  </td>
                  <td>{p?.attempts ?? 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="result-actions">
          <button type="button" className="btn btn-primary btn-large" onClick={() => dispatch({ type: 'OPEN_MISSIONS' })}>
            Missions
          </button>
          <button type="button" className="btn btn-large" onClick={() => dispatch({ type: 'OPEN_TITLE' })}>
            Title
          </button>
        </div>
      </section>
    </main>
  );
}
