/**
 * Scene — the hero board for every code, drawn with the toy-city art (src/ui/art) and controlled by real HTML
 * buttons laid over the SVG (houses `data-testid="block-{q}"`, detectors `data-testid="detector-{id}"`).
 *
 *   houses-row / grid   rep3 / rsc3 houses + detectors (watch lines/tint on tap), beacon tower at result time
 *   bridge / lab        propagation lanes with gates, travelling fire tokens, a time cursor, a house per lane end
 *
 * Secrecy (R8): with `fog` every house renders `{ kind: 'fog' }`, the button markup is identical for every house
 * (only the index and the player's own plan markers differ) and the aria label says nothing but "hidden".
 * A spray `frame` (SprayPlayer / WhyCompare) replaces the static states and adds trucks, crews, streams, splashes.
 */
import { useCallback, useMemo, type KeyboardEvent, type ReactNode } from 'react';
import { getCode, type Circuit, type CodeId, type Gate } from '../../quantum';
import type { CrewLetter, ResultType } from '../../game';
import {
  ART,
  BridgeLanes,
  Coupler,
  Detector,
  Dial,
  Firefighter,
  FireTruck,
  HelmetChip,
  House,
  LabLanes,
  LaneToken,
  MemoryTower,
  MirrorMachine,
  OUTLINE,
  REP3_SCENE,
  RSC3_SCENE,
  SceneGround,
  Splash,
  Stream,
  WatchLines,
  WatchTint,
  nozzleAt,
  type HouseState,
  type HouseVariant,
} from '../art';
import { useT } from '../i18n';
import type { Translate } from '../i18n';
import { HOUSE_DIMS, crewSpot, defaultHouseVariant, deriveSceneKind, flamePoint, houseBox, laneTokenX, lerpPt, easeOut, sceneGeometry, type SceneGeometry, type SceneKind } from './geometry';
import type { SceneFrame } from './frame';
import { anomalyLetter, asCrew, letterOf, staticHouseState } from './houseState';

/** Result-time decoration (R9). `patternQubits` = support of the engine residual; `beacon` = draw the memory tower. */
export interface SceneOutcome {
  readonly result: ResultType;
  readonly logicalFlip: { readonly x: readonly boolean[]; readonly z: readonly boolean[] };
  readonly patternQubits: readonly number[];
  readonly beacon: boolean;
}

/** Same contract as src/ui/Board.tsx `BoardProps`, so the Scene can replace the Board one screen at a time. */
export interface BoardLikeProps {
  readonly codeId: CodeId;
  readonly circuit: Circuit;
  /** Fires drawn on the houses (qubit-0-first). Lane boards: the tokens at the cursor. */
  readonly fires: string | null;
  /** Committed crews (debrief / result). */
  readonly crews: string | null;
  /** Live plan (challenge). */
  readonly placements?: Readonly<Record<number, CrewLetter>> | undefined;
  /** Residual fires (debrief, from the residual step on). */
  readonly residual: string | null;
  /** Alarm bits in code.checks order; null = alarms not read yet. */
  readonly syndrome: readonly number[] | null;
  readonly interactive: boolean;
  readonly onToggle?: ((q: number) => void) | undefined;
  readonly selected?: CrewLetter | undefined;
  /** Lane boards: -1 = before the first gate … circuit.length = after the circuit (fires sit in the houses). */
  readonly gateCursor?: number | undefined;
  /** Lane boards: tokens pinned at the input end (the public starting fire). */
  readonly inputFires?: string | null | undefined;
  readonly budgetReached?: boolean | undefined;
  readonly ariaDescribedBy?: string | undefined;
  readonly ariaLabel?: string | undefined;
}

export interface SceneProps extends BoardLikeProps {
  /** Challenge secrecy: every house is an identical fogged candidate. */
  readonly fog?: boolean | undefined;
  /** Index (code.checks order) of the detector whose watched houses are highlighted. */
  readonly highlightedCheck?: number | null | undefined;
  /** Detectors become buttons; tapping toggles the highlight (same index again → null). */
  readonly onToggleDetector?: ((checkIndex: number | null) => void) | undefined;
  readonly outcome?: SceneOutcome | undefined;
  readonly sceneKind?: SceneKind | undefined;
  /** Per-house building variety (index → variant); defaults to a deterministic cycle. */
  readonly houseVariants?: readonly HouseVariant[] | undefined;
  /** Spray frame (SprayPlayer): overrides fires/crews/residual drawing. */
  readonly frame?: SceneFrame | undefined;
  /** Caption / district name shown by the parent; the scene itself never renders prose. */
  readonly className?: string | undefined;
  /** Extra SVG children drawn above everything (dev previews). */
  readonly children?: ReactNode | undefined;
}

interface Pt {
  readonly x: number;
  readonly y: number;
}

const CREW_LABEL_KEY = { X: 'crew.X', Z: 'crew.Z', Y: 'crew.Y' } as const;

function crewName(t: Translate, l: CrewLetter): string {
  return t(CREW_LABEL_KEY[l]);
}

/** Arrow-key navigation between houses by geometry (nearest house in the pressed direction). */
function useArrowNav(centers: readonly Pt[]) {
  return useCallback(
    (e: KeyboardEvent<HTMLElement>, q: number) => {
      const dir = e.key === 'ArrowLeft' ? [-1, 0] : e.key === 'ArrowRight' ? [1, 0] : e.key === 'ArrowUp' ? [0, -1] : e.key === 'ArrowDown' ? [0, 1] : null;
      if (dir === null) return;
      e.preventDefault();
      const from = centers[q];
      if (from === undefined) return;
      let best = -1;
      let bestScore = Infinity;
      centers.forEach((c, i) => {
        if (i === q) return;
        const dx = c.x - from.x;
        const dy = c.y - from.y;
        const along = dx * (dir[0] ?? 0) + dy * (dir[1] ?? 0);
        const across = Math.abs(dx * (dir[1] ?? 0)) + Math.abs(dy * (dir[0] ?? 0));
        if (along <= 1) return;
        const s = along + across * 2.5;
        if (s < bestScore) {
          bestScore = s;
          best = i;
        }
      });
      if (best < 0) return;
      const root = e.currentTarget.closest('[data-scene]');
      root?.querySelector<HTMLElement>(`[data-q="${String(best)}"]`)?.focus();
    },
    [centers],
  );
}

export function Scene(props: SceneProps) {
  const t = useT();
  const kind = props.sceneKind ?? deriveSceneKind(props.codeId, props.circuit);
  const geo = useMemo(() => sceneGeometry(kind, props.codeId), [kind, props.codeId]);
  const code = getCode(props.codeId);
  const fog = props.fog ?? false;
  const frame = props.frame;
  const len = props.circuit.length;
  const cursor = props.gateCursor ?? len;
  const atOutput = cursor >= len;
  const variants = useMemo(() => Array.from({ length: geo.n }, (_, q) => props.houseVariants?.[q] ?? defaultHouseVariant(kind, q)), [geo.n, kind, props.houseVariants]);
  const result = props.outcome?.result ?? null;
  const states: HouseState[] = useMemo(
    () =>
      Array.from({ length: geo.n }, (_, q) =>
        frame !== undefined
          ? (frame.houses[q] ?? { kind: 'normal' })
          : staticHouseState({ fog, fires: props.fires, crews: props.crews, residual: props.residual, result, atOutput }, q),
      ),
    [geo.n, frame, fog, props.fires, props.crews, props.residual, result, atOutput],
  );
  const syndrome = frame !== undefined ? frame.syndrome : props.syndrome;
  const ringing = (i: number): boolean => syndrome !== null && (syndrome[i] ?? 0) === 1;
  const highlighted = props.highlightedCheck ?? null;
  const watched = highlighted === null ? [] : (code.checks[highlighted]?.qubits ?? []);
  const centers = useMemo(() => geo.houses.map((h) => ({ x: h.x, y: h.y - 30 })), [geo]);
  const onKeyDown = useArrowNav(centers);
  const anomaly = props.outcome !== undefined && props.outcome.result === 'logical-failure' ? anomalyLetter(props.outcome.logicalFlip) : null;
  const showTower = props.outcome?.beacon === true && geo.tower !== null;
  const chain = props.outcome?.result === 'logical-failure' ? props.outcome.patternQubits : [];
  const safeBadge = (frame?.outcome ?? result) === 'safe-pattern';

  // Static crews (plan markers / committed crews) are only drawn when no spray frame is playing.
  const planned = (q: number): CrewLetter | null => props.placements?.[q] ?? null;
  const committed = (q: number): CrewLetter | null => (frame !== undefined ? null : (planned(q) ?? asCrew(letterOf(props.crews, q))));

  const groupLabel = props.ariaLabel ?? (geo.lanes !== null ? t('a11y.boardCircuit') : t('a11y.boardGrid', { code: code.name }));

  return (
    <div
      className={['scene', `scene-${kind}`, `scene-code-${props.codeId}`, props.className ?? ''].filter(Boolean).join(' ')}
      style={{ aspectRatio: `${String(geo.width)} / ${String(geo.height)}` }}
      role="group"
      aria-label={groupLabel}
      aria-describedby={props.ariaDescribedBy}
      data-board
      data-scene
      data-scene-kind={kind}
    >
      <svg className="scene-svg" viewBox={`0 0 ${String(geo.width)} ${String(geo.height)}`} aria-hidden="true" focusable="false">
        {/* floor */}
        {geo.lanes !== null ? kind === 'lab' ? <LabLanes geometry={geo.lanes} /> : <BridgeLanes geometry={geo.lanes} /> : <SceneGround layout={kind === 'grid' ? RSC3_SCENE : REP3_SCENE} />}
        {/* lane gates, cursor and tokens */}
        {geo.lanes !== null ? <LaneContent geo={geo} circuit={props.circuit} cursor={cursor} fires={frame !== undefined ? null : props.fires} inputFires={props.inputFires ?? null} /> : null}
        {/* watch tint behind the watched houses */}
        {watched.map((q) => {
          const h = geo.houses[q];
          return h === undefined ? null : (
            <g key={`tint-${String(q)}`} className="watch-tint" data-watch-q={q}>
              <WatchTint x={h.x} y={h.y} />
            </g>
          );
        })}
        {/* truck */}
        {frame?.truck !== null && frame?.truck !== undefined ? <TruckActor geo={geo} progress={frame.truck.progress} lights={frame.truck.lights} wheelFrame={frame.truck.wheelFrame} /> : null}
        {/* logical pattern chain connector (behind the houses, visible in the gaps) */}
        {chain.length > 0 ? <ChainOutline geo={geo} qubits={chain} variants={variants} part="connector" /> : null}
        {/* houses, drawn top row first so lower rows overlap correctly */}
        {geo.houses.map((h, q) => (
          <g key={`house-${String(q)}`} className={`house house-${states[q]?.kind ?? 'normal'}`} data-house={q} data-house-state={states[q]?.kind ?? 'normal'}>
            <House x={h.x} y={h.y} tint={q} variant={variants[q] ?? 'small'} state={states[q] ?? { kind: 'normal' }} scale={geo.houseScale} />
          </g>
        ))}
        {/* logical pattern chain outlines (logical failure) */}
        {chain.length > 0 ? <ChainOutline geo={geo} qubits={chain} variants={variants} part="outline" /> : null}
        {/* committed / planned crews: firefighter idle beside the house (+ chip when planned) */}
        {geo.houses.map((h, q) => {
          const c = committed(q);
          if (c === null) return null;
          const spot = crewSpot(geo, q);
          const isPlan = planned(q) !== null;
          return (
            <g key={`crew-${String(q)}`} className={isPlan ? 'crew-marker crew-planned' : 'crew-marker'} data-crew-q={q} data-crew={c}>
              <Firefighter letter={c} pose="idle" facing={spot.facing} x={spot.x} y={spot.y} scale={geo.crewScale} />
              {isPlan ? <HelmetChip letter={c} x={h.x - (HOUSE_DIMS[variants[q] ?? 'small'].w / 2 - 4) * geo.houseScale} y={h.y - (HOUSE_DIMS[variants[q] ?? 'small'].h + 2) * geo.houseScale} scale={0.45} /> : null}
            </g>
          );
        })}
        {/* spray actors */}
        {frame !== undefined ? <SprayActors geo={geo} frame={frame} variants={variants} /> : null}
        {/* watch lines on top of the houses */}
        {highlighted !== null && geo.detectors[highlighted] !== undefined ? (
          <g className="watch-lines">
            <WatchLines from={geo.detectors[highlighted].lamp} to={watched.map((q) => geo.houses[q]).filter((h): h is NonNullable<typeof h> => h !== undefined)} />
          </g>
        ) : null}
        {/* detectors */}
        {geo.detectors.map((d, i) => (
          <g key={d.id} className={`detector${ringing(i) ? ' is-ringing' : ''}${highlighted === i ? ' is-highlighted' : ''}`} data-detector={d.id} data-ringing={ringing(i) ? 'true' : 'false'}>
            <Detector type={d.type} x={d.x} y={d.y} ringing={ringing(i)} highlighted={highlighted === i} scale={geo.detectorScale} />
          </g>
        ))}
        {/* memory beacon (result time only) */}
        {showTower && geo.tower !== null ? (
          <g className="memory-tower" data-anomaly={anomaly ?? 'none'}>
            <MemoryTower x={geo.tower.x} y={geo.tower.y} scale={geo.tower.scale} anomaly={anomaly} lit={anomaly === null} />
          </g>
        ) : null}
        {props.children}
      </svg>

      {/* house buttons */}
      {geo.houses.map((_, q) => {
        const box = houseBox(geo, q, variants[q] ?? 'small');
        const style = {
          left: `${String((box.x / geo.width) * 100)}%`,
          top: `${String((box.y / geo.height) * 100)}%`,
          width: `${String((box.w / geo.width) * 100)}%`,
          height: `${String((box.h / geo.height) * 100)}%`,
        };
        return (
          <div key={`slot-${String(q)}`} className="house-slot" style={style}>
            <HouseButton
              q={q}
              state={states[q] ?? { kind: 'normal' }}
              fog={fog}
              crew={committed(q)}
              interactive={props.interactive}
              selected={props.selected}
              budgetReached={props.budgetReached ?? false}
              watchers={fog ? [] : code.checks.filter((c) => c.qubits.includes(q)).map((c) => c.id)}
              onToggle={props.onToggle}
              onKeyDown={onKeyDown}
              t={t}
            />
          </div>
        );
      })}

      {/* detector buttons */}
      {geo.detectors.map((d, i) => {
        const check = code.checks[i];
        if (check === undefined) return null;
        const r = 16 * geo.detectorScale + 10;
        const style = {
          left: `${String(((d.lamp.x - r) / geo.width) * 100)}%`,
          top: `${String(((d.lamp.y - r) / geo.height) * 100)}%`,
          width: `${String(((2 * r) / geo.width) * 100)}%`,
          height: `${String(((2 * r) / geo.height) * 100)}%`,
        };
        const list = check.qubits.join(', ');
        const label = t(ringing(i) ? 'a11y.stationRinging' : 'a11y.stationQuiet', { station: check.id, list });
        if (props.onToggleDetector === undefined) {
          return (
            <div key={`det-${d.id}`} className="detector-slot" style={style}>
              <div className="detector-hit" role="img" aria-label={label} data-detector-id={d.id} />
            </div>
          );
        }
        const on = props.onToggleDetector;
        return (
          <div key={`det-${d.id}`} className="detector-slot" style={style}>
            <button
              type="button"
              className={`detector-hit${highlighted === i ? ' is-pressed' : ''}`}
              aria-label={label}
              aria-pressed={highlighted === i}
              data-testid={`detector-${d.id}`}
              data-detector-id={d.id}
              onClick={() => on(highlighted === i ? null : i)}
            />
          </div>
        );
      })}

      {safeBadge ? (
        <span className="scene-badge scene-badge-safe" data-testid="badge-safe">
          {t('result.outcome.success')}
        </span>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ house button */

interface HouseButtonProps {
  readonly q: number;
  readonly state: HouseState;
  readonly fog: boolean;
  readonly crew: CrewLetter | null;
  readonly interactive: boolean;
  readonly selected: CrewLetter | undefined;
  readonly budgetReached: boolean;
  readonly watchers: readonly string[];
  readonly onToggle: ((q: number) => void) | undefined;
  readonly onKeyDown: (e: KeyboardEvent<HTMLElement>, q: number) => void;
  readonly t: Translate;
}

function HouseButton({ q, state, fog, crew, interactive, selected, budgetReached, watchers, onToggle, onKeyDown, t }: HouseButtonProps) {
  const parts: string[] = [fog ? t('a11y.fogHouse', { q }) : t('a11y.house', { q })];
  if (watchers.length > 0) parts.push(t('a11y.watchedBy', { list: watchers.join(', ') }));
  if (!fog) {
    switch (state.kind) {
      case 'fire':
        parts.push(t('a11y.fire', { crew: crewName(t, state.letter) }));
        break;
      case 'residual':
        parts.push(t('a11y.residualFire', { crew: crewName(t, state.letter) }));
        break;
      case 'ghost':
        parts.push(t('a11y.residualFire', { crew: crewName(t, state.letter) }));
        break;
      case 'out':
      case 'restored':
        parts.push(t('a11y.fireOut'));
        break;
      case 'normal':
      case 'fog':
        break;
    }
  }
  if (crew !== null) parts.push(t('a11y.crew', { crew: crewName(t, crew) }));
  if (interactive) {
    if (crew === null) parts.push(budgetReached ? t('a11y.noCrewsLeft') : selected === undefined ? t('a11y.pressToSendAny') : t('a11y.pressToSend', { crew: crewName(t, selected) }));
    else if (crew === selected) parts.push(t('a11y.pressToRecall'));
    else parts.push(selected === undefined ? t('a11y.pressToSwitchAny') : t('a11y.pressToSwitch', { crew: crewName(t, selected) }));
  }
  const label = parts.join(', ');
  const classes = ['block', `block-${state.kind}`, crew !== null ? 'has-crew' : '', budgetReached && crew === null ? 'is-budget-reached' : ''].filter(Boolean).join(' ');
  if (!interactive) {
    return <div className={classes} role="img" aria-label={label} data-q={q} data-testid={`block-${String(q)}`} />;
  }
  return (
    <button
      type="button"
      className={classes}
      aria-label={label}
      aria-pressed={crew !== null}
      data-q={q}
      data-testid={`block-${String(q)}`}
      onClick={() => onToggle?.(q)}
      onKeyDown={(e) => onKeyDown(e, q)}
    >
      {/* selected-crew preview: identical markup on every house, visible only on focus/hover (CSS) */}
      {selected !== undefined && crew === null && !budgetReached ? (
        <span className="crew-preview" aria-hidden="true">
          <svg viewBox="-30 -46 60 50" width="30" height="25" focusable="false">
            <HelmetChip letter={selected} x={0} y={0} />
          </svg>
        </span>
      ) : null}
      {crew !== null ? (
        <span className="plan-tag" aria-hidden="true">
          {t('plan.title')}
        </span>
      ) : null}
    </button>
  );
}

/* ------------------------------------------------------------------ lanes */

function LaneContent({ geo, circuit, cursor, fires, inputFires }: { readonly geo: SceneGeometry; readonly circuit: Circuit; readonly cursor: number; readonly fires: string | null; readonly inputFires: string | null }) {
  const g = geo.lanes;
  if (g === null) return null;
  const steps = circuit.length;
  const atOutput = cursor >= steps;
  const tokenX = laneTokenX(g, cursor, steps);
  const tokenAt = (s: string | null, q: number): CrewLetter | null => asCrew(letterOf(s, q));
  return (
    <g className="lanes">
      {circuit.map((gate, j) => (
        <g key={j} className={j === cursor ? 'gate is-active' : j < cursor ? 'gate is-done' : 'gate'} opacity={j <= cursor ? 1 : 0.6}>
          <GateArt gate={gate} x={g.stepX(j, steps)} laneY={g.laneY} active={j === cursor} />
        </g>
      ))}
      {!atOutput ? <line className="time-cursor" x1={tokenX} y1={30} x2={tokenX} y2={g.height - 40} stroke={ART.alarm} strokeWidth={2.5} strokeDasharray="8 6" /> : null}
      {Array.from({ length: g.lanes }, (_, q) => {
        const l = tokenAt(inputFires, q);
        return l === null ? null : <LaneToken key={`in-${String(q)}`} letter={l} x={g.inX} y={g.laneY(q) - 6} />;
      })}
      {!atOutput
        ? Array.from({ length: g.lanes }, (_, q) => {
            const l = tokenAt(fires, q);
            return l === null ? null : (
              <g key={`tok-${String(q)}`} className="token">
                <LaneToken letter={l} x={tokenX} y={g.laneY(q) - 6} />
              </g>
            );
          })
        : null}
    </g>
  );
}

function GateArt({ gate, x, laneY, active }: { readonly gate: Gate; readonly x: number; readonly laneY: (i: number) => number; readonly active: boolean }) {
  switch (gate.kind) {
    case 'H':
      return <MirrorMachine x={x} y={laneY(gate.q) + 24} scale={0.9} active={active} />;
    case 'S':
      return <Dial x={x} y={laneY(gate.q)} active={active} />;
    case 'CNOT':
      return <Coupler x={x} controlY={laneY(gate.c)} targetY={laneY(gate.t)} active={active} />;
    case 'CZ': {
      const col = active ? ART.highlight : ART.ink;
      return (
        <g>
          <line x1={x} y1={laneY(gate.a)} x2={x} y2={laneY(gate.b)} stroke={col} strokeWidth={OUTLINE * 2} />
          <circle cx={x} cy={laneY(gate.a)} r={10} fill={col} />
          <circle cx={x} cy={laneY(gate.b)} r={10} fill={col} />
        </g>
      );
    }
    case 'SWAP': {
      const col = active ? ART.highlight : ART.ink;
      const cross = (y: number) => (
        <g key={y} stroke={col} strokeWidth={OUTLINE * 1.4}>
          <line x1={x - 9} y1={y - 9} x2={x + 9} y2={y + 9} />
          <line x1={x - 9} y1={y + 9} x2={x + 9} y2={y - 9} />
        </g>
      );
      return (
        <g>
          <line x1={x} y1={laneY(gate.a)} x2={x} y2={laneY(gate.b)} stroke={col} strokeWidth={OUTLINE * 2} />
          {cross(laneY(gate.a))}
          {cross(laneY(gate.b))}
        </g>
      );
    }
  }
}

/* ------------------------------------------------------------------ result decorations */

function ChainOutline({ geo, qubits, variants, part }: { readonly geo: SceneGeometry; readonly qubits: readonly number[]; readonly variants: readonly HouseVariant[]; readonly part: 'connector' | 'outline' }) {
  const boxes = qubits.map((q) => houseBox(geo, q, variants[q] ?? 'small'));
  if (boxes.length === 0) return null;
  const centersOf = boxes.map((b) => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 }));
  if (part === 'connector') {
    return centersOf.length > 1 ? (
      <polyline className="logical-chain-connector" points={centersOf.map((c) => `${String(c.x)},${String(c.y)}`).join(' ')} fill="none" stroke={ART.crewY} strokeWidth={OUTLINE * 3} strokeDasharray="12 8" strokeLinejoin="round" strokeLinecap="round" opacity={0.85} />
    ) : null;
  }
  return (
    <g className="logical-chain" data-chain={qubits.join(',')}>
      {boxes.map((b, i) => (
        <rect key={i} x={b.x - 2} y={b.y - 2} width={b.w + 4} height={b.h} rx={12} fill="none" stroke={ART.crewY} strokeWidth={OUTLINE * 1.8} strokeDasharray="10 6" />
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ spray actors */

function TruckActor({ geo, progress, lights, wheelFrame }: { readonly geo: SceneGeometry; readonly progress: number; readonly lights: boolean; readonly wheelFrame: 0 | 1 }) {
  const p = lerpPt(geo.truck.from, geo.truck.stop, easeOut(progress));
  return (
    <g className="truck" data-progress={progress.toFixed(2)}>
      <FireTruck x={p.x} y={p.y} facing={geo.truck.facing} lights={lights} wheelFrame={wheelFrame} scale={geo.truck.scale} />
    </g>
  );
}

function SprayActors({ geo, frame, variants }: { readonly geo: SceneGeometry; readonly frame: SceneFrame; readonly variants: readonly HouseVariant[] }) {
  const origin: Pt = { x: geo.truck.stop.x + 40 * geo.truck.scale, y: geo.truck.stop.y };
  return (
    <g className="spray-actors">
      {frame.streams.map((s) => {
        const spot = crewSpot(geo, s.q);
        const from = nozzleAt(spot.x, spot.y, geo.crewScale, spot.facing);
        return (
          <g key={`stream-${String(s.q)}`} className="stream" data-stream-q={s.q} data-progress={s.progress.toFixed(2)}>
            <Stream from={from} to={flamePoint(geo, s.q, variants[s.q] ?? 'small')} progress={s.progress} />
          </g>
        );
      })}
      {frame.splashes.map((s) => (
        <g key={`splash-${String(s.q)}`} className="splash" data-splash-q={s.q}>
          <Splash x={flamePoint(geo, s.q, variants[s.q] ?? 'small').x} y={flamePoint(geo, s.q, variants[s.q] ?? 'small').y + 10} spread={s.spread} scale={0.8} />
        </g>
      ))}
      {frame.crews.map((c) => {
        const spot = crewSpot(geo, c.q);
        const p = lerpPt(origin, spot, c.progress);
        const facing: 1 | -1 = c.progress < 1 ? (spot.x >= origin.x ? 1 : -1) : spot.facing;
        return (
          <g key={`ff-${String(c.q)}`} className={`firefighter pose-${c.pose}`} data-crew-q={c.q} data-crew={c.crew} data-pose={c.pose}>
            <Firefighter letter={c.crew} pose={c.pose} facing={facing} x={p.x} y={p.y} scale={geo.crewScale} />
          </g>
        );
      })}
    </g>
  );
}

