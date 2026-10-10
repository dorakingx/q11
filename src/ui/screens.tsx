/**
 * Non-play screens: title, how it works, settings, briefing, result, summary. The city map lives in src/ui/city.
 * Every visible string comes from useT(); mission kid copy from missionCopy(); art from src/ui/art.
 */
import { getCode } from '../quantum';
import { DISTRICTS, districtForMission, listPublicMissions, maxTotalStars, resultType, totalStars, type Action, type Debrief, type DistrictKind, type GameState, type Language, type PublicMissionView } from '../game';
import { BridgeSpan, ChapterBadge, ConversionLab, Detector, House, MemoryTower, Tree } from './art';
import { GearIcon, Q11Mark } from './glyphs';
import { briefingText, missionCopy, plural, reactionFor, useLanguage, useT } from './i18n';
import { Details, DetectorIcon, FlameIcon, HelmetIcon, LangToggle, Legend, Stars, TopBar, WaterIcon } from './panels';
import { badgeNameKey, CODE_KEY, outcomeKey, QUALITY_KEY, resultHeadingKey } from './text';

export interface ScreenProps {
  readonly state: GameState;
  readonly dispatch: (a: Action) => void;
  readonly storageLabel: string;
}

const BADGE_COLOURS = ['#2f6fdd', '#2bb673', '#8a4fd6', '#e8432a', '#f2b200', '#3a2f2a'];

/* ------------------------------------------------------------------ title */

export function TitleScreen({ state, dispatch }: ScreenProps) {
  const t = useT();
  const stars = totalStars(state.progress);
  return (
    <main className="screen screen-title">
      <div className="title-card">
        <Q11Mark size={112} label={t('a11y.q11mark')} />
        <h1 className="title-h" tabIndex={-1} data-focus-target>
          {t('app.name')} <span className="title-dash">—</span> {t('title.heading')}
        </h1>
        <p className="title-lead">{t('title.kidLine')}</p>
        <div className="title-actions">
          <button type="button" className="btn btn-primary btn-large btn-play" onClick={() => dispatch({ type: 'PLAY' })} data-testid="play">
            {state.tutorialDone ? t('title.play') : t('title.firstCall')}
          </button>
          <button type="button" className="btn btn-large" onClick={() => dispatch({ type: 'OPEN_HOW' })} data-testid="how">
            {t('title.how')}
          </button>
        </div>
        <div className="title-tools">
          <LangToggle language={state.settings.language} onChange={(language) => dispatch({ type: 'SET_LANGUAGE', language })} />
          <button type="button" className="btn btn-ghost btn-icon" onClick={() => dispatch({ type: 'OPEN_SETTINGS' })} aria-label={t('title.settings')} data-testid="settings">
            <GearIcon />
          </button>
        </div>
        {stars > 0 ? (
          <p className="muted title-progress" data-testid="title-progress">
            {t('title.progress', { stars, max: maxTotalStars() })}
          </p>
        ) : null}
        <p className="title-foot muted">{t('title.foot')}</p>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ how it works */

export function HowItWorks({ dispatch }: ScreenProps) {
  const t = useT();
  return (
    <main className="screen screen-doc">
      <TopBar title={t('how.title')} onSettings={() => dispatch({ type: 'OPEN_SETTINGS' })} onTitle={() => dispatch({ type: 'OPEN_TITLE' })} />
      <article className="doc">
        <p className="brief-text">{t('how.kid.intro')}</p>
        <h2>{t('how.kid.legend')}</h2>
        <dl className="how-list">
          <div>
            <dt>
              <svg width="40" height="40" viewBox="-40 -80 80 84" aria-hidden="true" focusable="false">
                <House x={0} y={0} variant="small" state={{ kind: 'normal' }} tint={0} />
              </svg>
              {t('how.houses.term')}
            </dt>
            <dd>{t('how.kid.houses')}</dd>
          </div>
          <div>
            <dt>
              <FlameIcon letter="X" size={30} /> <FlameIcon letter="Z" size={30} /> <FlameIcon letter="Y" size={30} />
              {t('how.fires.term')}
            </dt>
            <dd>{t('how.kid.fires')}</dd>
          </div>
          <div>
            <dt>
              <DetectorIcon type="Z" size={30} /> <DetectorIcon type="X" size={30} /> <DetectorIcon type="Z" ringing size={30} />
              {t('how.alarms.term')}
            </dt>
            <dd>{t('how.kid.alarms')}</dd>
          </div>
          <div>
            <dt>
              <HelmetIcon letter="X" size={30} /> <HelmetIcon letter="Z" size={30} /> <HelmetIcon letter="Y" size={30} />
              {t('how.crews.term')}
            </dt>
            <dd>{t('how.kid.crews')}</dd>
          </div>
          <div>
            <dt>{t('how.gates.term')}</dt>
            <dd>{t('how.kid.gates')}</dd>
          </div>
          <div>
            <dt>
              <WaterIcon size={30} /> <FlameIcon letter="Z" size={30} />
              {t('legend.water')}
            </dt>
            <dd>{t('how.kid.water')}</dd>
          </div>
        </dl>
        <p className="how-rule">{t('how.quantumRules')}</p>
        <p>{t('how.kid.spray')}</p>
        <Details summary={t('details.title')} testId="how-details">
          <dl className="how-list how-list-details">
            <div>
              <dt>{t('how.houses.term')}</dt>
              <dd>{t('how.houses.desc')}</dd>
            </div>
            <div>
              <dt>{t('how.fires.term')}</dt>
              <dd>{t('how.fires.desc')}</dd>
            </div>
            <div>
              <dt>{t('how.alarms.term')}</dt>
              <dd>{t('how.alarms.desc')}</dd>
            </div>
            <div>
              <dt>{t('how.crews.term')}</dt>
              <dd>{t('how.crews.desc')}</dd>
            </div>
            <div>
              <dt>{t('how.gates.term')}</dt>
              <dd>{t('how.gates.desc')}</dd>
            </div>
            <div>
              <dt>{t('how.verdict.term')}</dt>
              <dd>{t('how.verdict.desc')}</dd>
            </div>
          </dl>
          <h3>{t('how.controls')}</h3>
          <ul className="plain-list">
            <li>{t('how.controls.tap')}</li>
            <li>{t('how.controls.keyboard')}</li>
            <li>{t('how.controls.stars')}</li>
            <li>{t('how.controls.sound')}</li>
          </ul>
          <p className="muted small">{t('how.model')}</p>
          <p className="muted small">{t('details.notSyndromeZero')}</p>
        </Details>
        <div className="doc-actions">
          <button type="button" className="btn btn-primary" onClick={() => dispatch({ type: 'CLOSE_OVERLAY' })} data-testid="back">
            {t('how.back')}
          </button>
        </div>
      </article>
    </main>
  );
}

/* ------------------------------------------------------------------ settings */

function Switch({ id, on, onChange, testId }: { readonly id: string; readonly on: boolean; readonly onChange: (on: boolean) => void; readonly testId: string }) {
  const t = useT();
  return (
    <button type="button" role="switch" aria-checked={on} aria-labelledby={id} className={`switch${on ? ' is-on' : ''}`} onClick={() => onChange(!on)} data-testid={testId}>
      <span className="switch-knob" aria-hidden="true" />
      <span className="switch-text">{on ? t('settings.on') : t('settings.off')}</span>
    </button>
  );
}

export function SettingsScreen({ state, dispatch, storageLabel, onReset }: ScreenProps & { readonly onReset: () => void }) {
  const t = useT();
  const langBtn = (l: Language, label: string) => (
    <button type="button" className={`seg-btn${state.settings.language === l ? ' is-on' : ''}`} aria-pressed={state.settings.language === l} onClick={() => dispatch({ type: 'SET_LANGUAGE', language: l })} data-testid={`lang-${l}`}>
      {label}
    </button>
  );
  return (
    <main className="screen screen-doc">
      <TopBar title={t('settings.title')} onSettings={() => dispatch({ type: 'CLOSE_OVERLAY' })} settingsLabel={t('settings.close')} onTitle={() => dispatch({ type: 'OPEN_TITLE' })} />
      <section className="doc">
        <div className="setting-row">
          <div>
            <span className="setting-name" id="set-sound">
              {t('settings.sound')}
            </span>
            <p className="muted small">{t('settings.sound.desc')}</p>
          </div>
          <Switch id="set-sound" on={state.settings.sound} onChange={(on) => dispatch({ type: 'SET_SOUND', on })} testId="switch-sound" />
        </div>
        <div className="setting-row">
          <div>
            <span className="setting-name" id="set-motion">
              {t('settings.motion')}
            </span>
            <p className="muted small">{t('settings.motion.desc')}</p>
          </div>
          <Switch id="set-motion" on={state.settings.reducedMotion} onChange={(on) => dispatch({ type: 'SET_REDUCED_MOTION', on })} testId="switch-motion" />
        </div>
        <div className="setting-row">
          <div>
            <span className="setting-name" id="set-language">
              {t('settings.language')}
            </span>
            <p className="muted small">{t('settings.language.desc')}</p>
          </div>
          <div className="seg" role="group" aria-labelledby="set-language" data-testid="language-group">
            {langBtn('en', t('settings.language.en'))}
            {langBtn('ja', t('settings.language.ja'))}
          </div>
        </div>
        <div className="setting-row">
          <div>
            <span className="setting-name" id="set-free-roam">
              {t('settings.freeRoam')}
            </span>
            <p className="muted small">{t('settings.freeRoam.desc')}</p>
          </div>
          <Switch id="set-free-roam" on={state.settings.freeRoam} onChange={(on) => dispatch({ type: 'SET_FREE_ROAM', on })} testId="switch-free-roam" />
        </div>
        <div className="setting-row">
          <div>
            <span className="setting-name">{t('settings.progress')}</span>
            <p className="muted small" data-testid="settings-storage">
              {storageLabel}
            </p>
          </div>
          <button type="button" className="btn btn-danger" onClick={onReset} data-testid="reset-progress">
            {t('settings.reset')}
          </button>
        </div>
        <div className="doc-actions">
          <button type="button" className="btn btn-primary" onClick={() => dispatch({ type: 'CLOSE_OVERLAY' })} data-testid="back">
            {t('settings.back')}
          </button>
        </div>
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ briefing */

/** Decorative district thumbnail built from the art parts (never from mission data). */
export function DistrictThumb({ kind, beacon = false, size = 180 }: { readonly kind: DistrictKind; readonly beacon?: boolean; readonly size?: number }) {
  const w = 320;
  const h = 170;
  let body: JSX.Element;
  switch (kind) {
    case 'houses-row':
      body = (
        <>
          <House x={70} y={150} variant="small" tint={0} scale={0.9} />
          <House x={160} y={150} variant="tall" tint={1} scale={0.9} />
          <House x={250} y={150} variant="small" tint={2} scale={0.9} />
          <Detector type="Z" x={115} y={150} scale={0.8} />
          <Detector type="Z" x={205} y={150} scale={0.8} />
        </>
      );
      break;
    case 'bridge':
      body = (
        <>
          <House x={48} y={150} variant="small" tint={3} scale={0.8} />
          <BridgeSpan x={160} y={150} width={150} />
          <House x={272} y={150} variant="small" tint={4} scale={0.8} />
        </>
      );
      break;
    case 'lab':
      body = (
        <>
          <ConversionLab x={160} y={152} active />
          <Tree x={40} y={152} size={0.9} />
          <Tree x={290} y={152} size={0.8} />
        </>
      );
      break;
    case 'grid':
      body = (
        <>
          <House x={60} y={150} variant="shop" tint={2} scale={0.8} />
          <House x={150} y={150} variant="small" tint={4} scale={0.8} />
          <House x={230} y={150} variant="tall" tint={5} scale={0.8} />
          <Detector type="Z" x={105} y={150} scale={0.75} />
          <Detector type="X" x={190} y={150} scale={0.75} />
          {beacon ? <MemoryTower x={290} y={152} scale={0.55} lit /> : <Tree x={295} y={152} size={0.9} />}
        </>
      );
      break;
  }
  return (
    <svg className="district-thumb" viewBox={`0 0 ${String(w)} ${String(h)}`} width={size} height={(size * h) / w} aria-hidden="true" focusable="false">
      <rect x={0} y={0} width={w} height={h} rx={18} fill="var(--sky)" />
      <rect x={0} y={118} width={w} height={h - 118} fill="var(--ground-2)" />
      {body}
    </svg>
  );
}

export function BriefingScreen({ state, dispatch, mission }: ScreenProps & { readonly mission: PublicMissionView }) {
  const t = useT();
  const lang = useLanguage();
  const copy = missionCopy(mission.id, lang);
  const district = districtForMission(mission.id);
  const code = getCode(mission.code);
  const hasTraining = mission.training.length > 0;
  return (
    <main className="screen screen-brief">
      <TopBar title={copy.districtName} subtitle={`${t('mission.label', { n: mission.index })} · ${copy.kidTitle}`} onMissions={() => dispatch({ type: 'OPEN_MISSIONS' })} onSettings={() => dispatch({ type: 'OPEN_SETTINGS' })} />
      <section className="brief panel-card" data-testid="briefing">
        <div className="brief-head">
          <DistrictThumb kind={district?.kind ?? 'grid'} beacon={district?.hasBeacon ?? false} />
          <div className="brief-copy">
            <h2 className="brief-goal-h">{t('briefing.goal')}</h2>
            <p className="brief-text" data-testid="briefing-goal">
              {copy.goal}
            </p>
            <h2 className="brief-goal-h">{t('briefing.lesson')}</h2>
            <p className="brief-lesson">{copy.lessonOneLiner}</p>
          </div>
        </div>
        <dl className="brief-facts">
          <div>
            <dt>{t('briefing.crews')}</dt>
            <dd>
              {mission.allowed.map((l) => (
                <span key={l} className="inline-glyph">
                  <HelmetIcon letter={l} size={26} /> {l}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt>{t('briefing.budget')}</dt>
            <dd>{plural(lang, 'briefing.budget', mission.budget)}</dd>
          </div>
          <div>
            <dt>{t('briefing.previousBest')}</dt>
            <dd>
              <Stars count={state.progress[mission.id]?.stars ?? 0} max={mission.maxStars} size={20} />
              {mission.maxStars < 3 ? <span className="muted small">{t('briefing.upTo', { n: mission.maxStars })}</span> : null}
            </dd>
          </div>
        </dl>
        <div className="brief-actions">
          <button type="button" className="btn btn-primary btn-large" onClick={() => dispatch({ type: 'START_MISSION' })} data-testid="start-mission">
            {hasTraining ? t('briefing.startTraining') : t('briefing.go')}
          </button>
          {hasTraining ? (
            <button type="button" className="btn btn-large" onClick={() => dispatch({ type: 'START_CHALLENGE' })} data-testid="briefing-skip">
              {t('briefing.skipToDispatch')}
            </button>
          ) : null}
        </div>
        <Details summary={copy.detailsTitle} testId="briefing-details">
          <p className="brief-original">{briefingText(mission.id, lang, mission.briefing)}</p>
          <p className="muted small">
            {t('details.code')}: {t(CODE_KEY[mission.code] ?? 'mission.code.rsc3')} · {code.name}
          </p>
        </Details>
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ result */

export function ResultScreen({ state, dispatch, mission, debrief }: ScreenProps & { readonly mission: PublicMissionView; readonly debrief: Debrief }) {
  const t = useT();
  const lang = useLanguage();
  const s = debrief.score;
  const copy = missionCopy(mission.id, lang);
  const isLast = mission.index === listPublicMissions().length;
  const hasChecks = getCode(mission.code).checks.length > 0;
  const earned = state.progress[mission.id]?.completed === true;
  const di = DISTRICTS.findIndex((d) => d.missionId === mission.id);
  const result = resultType(debrief);
  const next = () => dispatch(state.tutorialActive ? { type: 'OPEN_MISSIONS' } : { type: 'NEXT_MISSION' });
  const nextLabel = state.tutorialActive ? t('result.city') : isLast ? t('result.summary') : t('result.next');
  return (
    <main className="screen screen-result">
      <TopBar title={copy.districtName} subtitle={t('result.subtitle')} onMissions={() => dispatch({ type: 'OPEN_MISSIONS' })} onSettings={() => dispatch({ type: 'OPEN_SETTINGS' })} />
      <section className="result panel-card" data-testid="result" data-result={result}>
        <div className="result-top">
          <svg className="result-badge" viewBox="-30 -62 60 66" width={64} height={70} aria-label={t('result.badge', { district: t(badgeNameKey(mission.id)) })} role="img" focusable="false">
            <ChapterBadge x={0} y={0} colour={BADGE_COLOURS[di] ?? '#2f6fdd'} earned={earned} />
          </svg>
          <div>
            <h2 className="result-h">{t(resultHeadingKey(s))}</h2>
            <Stars count={s.stars} max={s.maxStars} size={40} />
            <p className="muted small">
              {s.maxStars === 1 ? t('result.starsOf.one', { stars: s.stars }) : t('result.starsOf.other', { stars: s.stars, max: s.maxStars })}
              {s.maxStars < 3 ? ` · ${t('result.maxOne')}` : ''}
            </p>
          </div>
        </div>
        <p className="result-reaction">{reactionFor(copy, result)}</p>
        <dl className="result-facts">
          <div>
            <dt>{t('result.decision')}</dt>
            <dd>{t(QUALITY_KEY[s.quality])}</dd>
          </div>
          <div>
            <dt>{t('result.outcome')}</dt>
            <dd className={`outcome outcome-${s.outcome}`}>{t(outcomeKey(s.outcome, hasChecks))}</dd>
          </div>
          <div>
            <dt>{t('result.cost')}</dt>
            <dd>{plural(lang, 'result.costText', s.crewsUsed, { used: s.crewsUsed, min: s.minCrews })}</dd>
          </div>
          <div>
            <dt>{t('result.attempts')}</dt>
            <dd data-testid="result-attempts">{state.progress[mission.id]?.attempts ?? 1}</dd>
          </div>
        </dl>
        {earned ? (
          <p className="result-badge-line" data-testid="result-badge-line">
            {t('result.badge', { district: t(badgeNameKey(mission.id)) })}
          </p>
        ) : null}
        <div className="result-actions">
          <button type="button" className="btn btn-large" onClick={() => dispatch({ type: 'OPEN_WHY' })} data-testid="result-why">
            {t('dispatch.why')}
          </button>
          <button type="button" className="btn btn-large" onClick={() => dispatch({ type: 'TRY_AGAIN' })} data-testid="try-again">
            {t('result.tryAgain')}
          </button>
          <button type="button" className="btn btn-primary btn-large" onClick={next} data-testid="next-mission">
            {nextLabel}
          </button>
        </div>
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ summary */

export function SummaryScreen({ state, dispatch }: ScreenProps) {
  const t = useT();
  const lang = useLanguage();
  const missions = listPublicMissions();
  const total = totalStars(state.progress);
  return (
    <main className="screen screen-summary">
      <TopBar title={t('summary.title')} subtitle={t('mission.starsOf', { stars: total, max: maxTotalStars() })} onMissions={() => dispatch({ type: 'OPEN_MISSIONS' })} onSettings={() => dispatch({ type: 'OPEN_SETTINGS' })} />
      <section className="summary panel-card" data-testid="summary">
        <p className="brief-text">{t('summary.lead')}</p>
        <h2 className="panel-title">{t('summary.badges')}</h2>
        <ul className="badge-row" aria-label={t('summary.badges')}>
          {DISTRICTS.map((d, i) => {
            const earned = state.progress[d.missionId]?.completed === true;
            return (
              <li key={d.id} className={earned ? 'badge-item is-earned' : 'badge-item'} data-badge={d.id} data-earned={earned ? 'true' : 'false'}>
                <svg viewBox="-30 -62 60 66" width={52} height={57} aria-hidden="true" focusable="false">
                  <ChapterBadge x={0} y={0} colour={BADGE_COLOURS[i] ?? '#2f6fdd'} earned={earned} />
                </svg>
                <span>{t(badgeNameKey(d.missionId))}</span>
              </li>
            );
          })}
        </ul>
        <table className="summary-table">
          <thead>
            <tr>
              <th scope="col">{t('summary.mission')}</th>
              <th scope="col">{t('summary.stars')}</th>
              <th scope="col">{t('summary.attempts')}</th>
            </tr>
          </thead>
          <tbody>
            {missions.map((m) => {
              const p = state.progress[m.id];
              return (
                <tr key={m.id}>
                  <th scope="row">
                    {m.index}. {missionCopy(m.id, lang).districtName}
                  </th>
                  <td>
                    <Stars count={p?.stars ?? 0} max={m.maxStars} size={18} />
                  </td>
                  <td>{p?.attempts ?? 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="muted">{t('summary.freeRoamHint')}</p>
        <div className="result-actions">
          <button type="button" className="btn btn-primary btn-large" onClick={() => dispatch({ type: 'OPEN_MISSIONS' })} data-testid="summary-city">
            {t('summary.playAgain')}
          </button>
          <button type="button" className="btn btn-large" onClick={() => dispatch({ type: 'OPEN_SETTINGS' })}>
            {t('settings.freeRoam')}
          </button>
          <button type="button" className="btn btn-ghost btn-large" onClick={() => dispatch({ type: 'OPEN_TITLE' })}>
            {t('summary.titleBtn')}
          </button>
        </div>
        <Legend allowed={['X', 'Z', 'Y']} alarms water />
      </section>
    </main>
  );
}
