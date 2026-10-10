/**
 * The board — hero of every screen. Two renderers:
 *  - GridBoard: rsc3 (3×3 blocks, 8 stations) and rep3 (3 blocks in a row, 2 stations).
 *  - WiresBoard: trivial codes — one wire per qubit, gates, a time cursor and fire tokens.
 * Background art is one SVG; the blocks are real HTML <button>s laid over it (≥44 CSS px targets), so
 * keyboard, touch and screen readers all get the same controls. Everything is shape + letter + colour.
 */
import { useCallback, type KeyboardEvent } from 'react';
import { getCode, getLayout, fromString, letterAt, type Circuit, type CodeId, type Gate, type PauliLetter } from '../quantum';
import { Flame, Helmet, StationShape } from './glyphs';
import { COLOURS, CREW_LABEL } from './theme';
import { watchersOf } from './text';
import type { CrewLetter } from '../game';

export interface BoardProps {
  readonly codeId: CodeId;
  readonly circuit: Circuit;
  /** Fires drawn on the blocks (qubit-0-first). On the wires board these are the tokens at the cursor. */
  readonly fires: string | null;
  /** Committed crews (debrief). */
  readonly crews: string | null;
  /** Live placements (challenge). */
  readonly placements?: Readonly<Record<number, CrewLetter>>;
  /** Residual fires (debrief, from the residual step on). */
  readonly residual: string | null;
  /** Alarm bits in code.checks order; null = alarms not read yet. */
  readonly syndrome: readonly number[] | null;
  readonly interactive: boolean;
  readonly onToggle?: (q: number) => void;
  readonly selected?: CrewLetter;
  /** Wires board: -1 = before the first gate … circuit.length = after the circuit (fires sit in the output blocks). */
  readonly gateCursor?: number | undefined;
  /** Wires board: tokens pinned at the input end (the public starting fire). */
  readonly inputFires?: string | null;
  readonly budgetReached?: boolean;
  readonly ariaDescribedBy?: string;
  readonly ariaLabel?: string;
}

const U = 100; // grid unit in SVG px
const BLOCK_R = 34;

interface Pt {
  readonly x: number;
  readonly y: number;
}

function letterOf(s: string | null, q: number): PauliLetter {
  if (s === null) return 'I';
  const p = fromString(s);
  return q < p.n ? letterAt(p, q) : 'I';
}

function asCrew(l: PauliLetter): CrewLetter | null {
  return l === 'I' ? null : l;
}

export function Board(props: BoardProps) {
  const layout = getLayout(props.codeId);
  if (layout.kind === 'wires') return <WiresBoard {...props} />;
  return <GridBoard {...props} />;
}

/* ------------------------------------------------------------------ blocks (shared) */

interface BlockProps {
  readonly q: number;
  readonly center: Pt;
  readonly r: number;
  readonly W: number;
  readonly H: number;
  readonly fire: PauliLetter;
  readonly crew: CrewLetter | null;
  readonly residual: PauliLetter | null; // null = residual not shown yet
  readonly interactive: boolean;
  readonly selected: CrewLetter | undefined;
  readonly budgetReached: boolean;
  /** Ids of the stations watching this block ("Z0, Z1, X0, X1"); empty on bare wires. */
  readonly watchers: readonly string[];
  readonly onToggle: ((q: number) => void) | undefined;
  readonly onKeyDown: (e: KeyboardEvent<HTMLElement>, q: number) => void;
}

function Block({ q, center, r, W, H, fire, crew, residual, interactive, selected, budgetReached, watchers, onToggle, onKeyDown }: BlockProps) {
  const style = {
    left: `${String((center.x / W) * 100)}%`,
    top: `${String((center.y / H) * 100)}%`,
    width: `${String(((2 * r) / W) * 100)}%`,
  };
  const parts: string[] = [`Block ${String(q)}`];
  if (watchers.length > 0) parts.push(`watched by ${watchers.join(', ')}`);
  if (residual !== null) {
    if (residual !== 'I') parts.push(`residual ${CREW_LABEL[residual]} fire`);
    else if (fire !== 'I' || crew !== null) parts.push('fire out');
  } else if (fire !== 'I') parts.push(`${CREW_LABEL[fire]} fire`);
  if (crew !== null) parts.push(`${CREW_LABEL[crew]} crew`);
  if (interactive) {
    if (crew === null) parts.push(budgetReached ? 'no crews left' : `press to send ${selected === undefined ? 'a' : CREW_LABEL[selected]} crew`);
    else if (crew === selected) parts.push('press to recall the crew');
    else parts.push(`press to switch to ${selected === undefined ? 'another' : CREW_LABEL[selected]} crew`);
  }
  const label = parts.join(', ');
  const showResidual = residual !== null;
  const content = (
    <>
      <span className="block-label" aria-hidden="true">
        {q}
      </span>
      <span className="block-center" aria-hidden="true">
        {showResidual ? (
          residual !== 'I' ? (
            <Flame letter={residual} outlined size={30} />
          ) : fire !== 'I' || crew !== null ? (
            <OutTick />
          ) : null
        ) : fire !== 'I' ? (
          <Flame letter={fire} size={30} />
        ) : null}
      </span>
      {crew !== null ? (
        <span className="block-crew" aria-hidden="true">
          <Helmet letter={crew} size={24} />
        </span>
      ) : null}
    </>
  );
  const classes = ['block', fire !== 'I' ? 'is-burning' : '', crew !== null ? 'has-crew' : '', showResidual && residual !== 'I' ? 'has-residual' : ''].filter(Boolean).join(' ');
  if (!interactive) {
    return (
      <div className={classes} style={style} role="img" aria-label={label} data-q={q}>
        {content}
      </div>
    );
  }
  return (
    <button
      type="button"
      className={classes}
      style={style}
      aria-label={label}
      aria-pressed={crew !== null}
      data-q={q}
      data-testid={`block-${String(q)}`}
      onClick={() => onToggle?.(q)}
      onKeyDown={(e) => onKeyDown(e, q)}
    >
      {content}
    </button>
  );
}

function OutTick() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" className="glyph glyph-out">
      <path d="M5 12.5l4.2 4.2L19 7.5" fill="none" stroke={COLOURS.success} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Arrow-key navigation between blocks by geometry (nearest block in the pressed direction). */
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
      const root = e.currentTarget.closest('[data-board]');
      const target = root?.querySelector<HTMLElement>(`[data-q="${String(best)}"]`);
      target?.focus();
    },
    [centers],
  );
}

/* ------------------------------------------------------------------ grid board */

function gridGeometry(codeId: CodeId): { readonly centers: Pt[]; readonly isLine: boolean; readonly W: number; readonly H: number; readonly yShift: number } {
  const code = getCode(codeId);
  const layout = getLayout(codeId);
  if (layout.kind === 'wires') return { centers: [], isLine: false, W: U, H: U, yShift: 0 };
  const isLine = layout.kind === 'line';
  const cols = isLine ? code.n : layout.cols;
  const rows = isLine ? 1 : layout.rows;
  const W = (cols + 1) * U;
  const H = isLine ? 1.5 * U : (rows + 1) * U;
  const yShift = isLine ? -0.25 * U : 0;
  const centers: Pt[] = layout.blocks.map((b) => ({ x: (b.col + 1) * U, y: (b.row + 1) * U + yShift }));
  return { centers, isLine, W, H, yShift };
}

function GridBoard(props: BoardProps) {
  const code = getCode(props.codeId);
  const layout = getLayout(props.codeId);
  const { centers, isLine, W, H, yShift } = gridGeometry(props.codeId);
  const onKeyDown = useArrowNav(centers);
  if (layout.kind === 'wires') return null;
  // Station rows for the line layout sit above the blocks so nothing overlaps.
  const stationPos = (id: string): Pt => {
    const p = layout.checkPositions[id] ?? { row: 0, col: 0 };
    return { x: (p.col + 1) * U, y: (p.row + 1) * U + (isLine ? -0.52 * U : 0) };
  };
  const ringing = (i: number): boolean => props.syndrome !== null && (props.syndrome[i] ?? 0) === 1;
  const stationR = isLine ? 15 : 18;
  return (
    <div
      className={`board board-grid board-${props.codeId}`}
      style={{ aspectRatio: `${String(W)} / ${String(H)}` }}
      role="group"
      aria-label={props.ariaLabel ?? `${code.name} dispatch board`}
      aria-describedby={props.ariaDescribedBy}
      data-board
    >
      <svg className="board-svg" viewBox={`0 0 ${String(W)} ${String(H)}`} aria-hidden="true" focusable="false">
        {/* watch lines: station → each block it watches */}
        {code.checks.map((c, i) => {
          const s = stationPos(c.id);
          const s2 = { x: s.x, y: s.y + yShift };
          return c.qubits.map((q) => {
            const b = centers[q];
            if (b === undefined) return null;
            return (
              <line
                key={`${c.id}-${String(q)}`}
                x1={s2.x}
                y1={s2.y}
                x2={b.x}
                y2={b.y}
                stroke={ringing(i) ? COLOURS.alarm : COLOURS.lineStrong}
                strokeWidth={ringing(i) ? 3 : 1.5}
                strokeOpacity={ringing(i) ? 0.85 : 1}
                strokeDasharray={ringing(i) ? undefined : '4 4'}
              />
            );
          });
        })}
        {/* block discs (the buttons sit on top; the disc gives the board its look even when printed) */}
        {centers.map((c, q) => (
          <circle key={q} cx={c.x} cy={c.y} r={BLOCK_R} fill={COLOURS.panel} stroke={COLOURS.lineStrong} strokeWidth="2" />
        ))}
        {/* stations */}
        {code.checks.map((c, i) => {
          const s = stationPos(c.id);
          return (
            <g key={c.id} transform={`translate(${String(s.x)} ${String(s.y + yShift)})`} className="station" data-station={c.id}>
              <StationShape type={c.type} ringing={ringing(i)} r={stationR} />
            </g>
          );
        })}
      </svg>
      {centers.map((c, q) => (
        <Block
          key={q}
          q={q}
          center={c}
          r={BLOCK_R}
          W={W}
          H={H}
          fire={letterOf(props.fires, q)}
          crew={props.placements?.[q] ?? asCrew(letterOf(props.crews, q))}
          residual={props.residual === null ? null : letterOf(props.residual, q)}
          interactive={props.interactive}
          selected={props.selected}
          budgetReached={props.budgetReached ?? false}
          watchers={watchersOf(props.codeId, q)}
          onToggle={props.onToggle}
          onKeyDown={onKeyDown}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ wires board */

const WIRE_GAP = 80;
const GATE_STEP = 70;
const INPUT_X = 48;
const FIRST_GATE_X = 118;
const OUT_R = 30;

function gateX(i: number): number {
  return FIRST_GATE_X + i * GATE_STEP;
}

function GateArt({ g, wireY }: { readonly g: Gate; readonly wireY: (q: number) => number }) {
  switch (g.kind) {
    case 'H':
    case 'S': {
      const y = wireY(g.q);
      return (
        <g>
          <rect x={-18} y={y - 18} width={36} height={36} rx={6} fill={COLOURS.panel} stroke={COLOURS.text} strokeWidth="2" />
          <text y={y + 6} textAnchor="middle" fontSize="18" fontWeight="700" fill={COLOURS.text} fontFamily="system-ui, sans-serif">
            {g.kind}
          </text>
        </g>
      );
    }
    case 'CNOT': {
      const yc = wireY(g.c);
      const yt = wireY(g.t);
      return (
        <g>
          <line x1={0} y1={yc} x2={0} y2={yt} stroke={COLOURS.text} strokeWidth="2.5" />
          <circle cy={yc} r={7} fill={COLOURS.text} />
          <circle cy={yt} r={15} fill={COLOURS.navy} stroke={COLOURS.text} strokeWidth="2.5" />
          <line x1={-15} y1={yt} x2={15} y2={yt} stroke={COLOURS.text} strokeWidth="2.5" />
          <line x1={0} y1={yt - 15} x2={0} y2={yt + 15} stroke={COLOURS.text} strokeWidth="2.5" />
        </g>
      );
    }
    case 'CZ': {
      const ya = wireY(g.a);
      const yb = wireY(g.b);
      return (
        <g>
          <line x1={0} y1={ya} x2={0} y2={yb} stroke={COLOURS.text} strokeWidth="2.5" />
          <circle cy={ya} r={7} fill={COLOURS.text} />
          <circle cy={yb} r={7} fill={COLOURS.text} />
        </g>
      );
    }
    case 'SWAP': {
      const ya = wireY(g.a);
      const yb = wireY(g.b);
      const cross = (y: number) => (
        <g key={y}>
          <line x1={-9} y1={y - 9} x2={9} y2={y + 9} stroke={COLOURS.text} strokeWidth="2.5" />
          <line x1={-9} y1={y + 9} x2={9} y2={y - 9} stroke={COLOURS.text} strokeWidth="2.5" />
        </g>
      );
      return (
        <g>
          <line x1={0} y1={ya} x2={0} y2={yb} stroke={COLOURS.text} strokeWidth="2.5" />
          {cross(ya)}
          {cross(yb)}
        </g>
      );
    }
  }
}

/** Flame token drawn directly in SVG (for wires). */
function SvgFlame({ x, y, letter, size = 34 }: { readonly x: number; readonly y: number; readonly letter: CrewLetter; readonly size?: number }) {
  // Embed the HTML flame via foreignObject-free approach: reuse the same path, scaled.
  const s = size / 24;
  const fill = letter === 'Y' ? 'url(#wire-split)' : COLOURS[letter];
  return (
    <g transform={`translate(${String(x - size / 2)} ${String(y - size / 2)}) scale(${String(s)})`} className={`token token-${letter}`}>
      <circle cx="12" cy="12" r="13" fill={COLOURS.navy} stroke={COLOURS.line} strokeWidth="1.2" />
      <path d="M12 1.5c1.3 4.4 4.6 8.6 4.6 13.9a4.6 4.6 0 0 1-9.2 0c0-3 2-4.6 2-7 0-1.1-.5-1.9-.8-2.5 1.5.6 2.2 1.9 2.4 2.8C11.8 7 12 4.6 12 1.5Z" fill={fill} stroke="rgba(0,0,0,0.35)" strokeWidth="0.8" />
      <text x="12" y="22.6" textAnchor="middle" fontSize="6.5" fontWeight="700" fill={COLOURS.text} fontFamily="system-ui, sans-serif">
        {letter}
      </text>
    </g>
  );
}

function WiresBoard(props: BoardProps) {
  const code = getCode(props.codeId);
  const n = code.n;
  const len = props.circuit.length;
  const outX = gateX(len) + 10;
  const W = outX + OUT_R + 24;
  const H = WIRE_GAP * n + 40;
  const wireY = (q: number): number => 60 + q * WIRE_GAP;
  const centers: Pt[] = Array.from({ length: n }, (_, q) => ({ x: outX, y: wireY(q) }));
  const onKeyDown = useArrowNav(centers);
  const cursor = props.gateCursor ?? len;
  const atOutput = cursor >= len;
  const tokenX = cursor < 0 ? (INPUT_X + gateX(0)) / 2 + 6 : gateX(cursor) + GATE_STEP / 2;
  const cursorX = cursor < 0 ? (INPUT_X + gateX(0)) / 2 + 6 : gateX(cursor) + GATE_STEP / 2;
  const fires = props.fires;
  const showWireTokens = !atOutput && fires !== null;
  return (
    <div
      className="board board-wires"
      style={{ aspectRatio: `${String(W)} / ${String(H)}` }}
      role="group"
      aria-label={props.ariaLabel ?? 'Circuit board'}
      aria-describedby={props.ariaDescribedBy}
      data-board
    >
      <svg className="board-svg" viewBox={`0 0 ${String(W)} ${String(H)}`} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="wire-split" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={COLOURS.X} />
            <stop offset="0.5" stopColor={COLOURS.X} />
            <stop offset="0.5" stopColor={COLOURS.Z} />
            <stop offset="1" stopColor={COLOURS.Z} />
          </linearGradient>
        </defs>
        {Array.from({ length: n }, (_, q) => (
          <g key={q}>
            <line x1={INPUT_X} y1={wireY(q)} x2={outX} y2={wireY(q)} stroke={COLOURS.lineStrong} strokeWidth="3" />
            <text x={INPUT_X - 30} y={wireY(q) + 5} fontSize="14" fill={COLOURS.muted} fontFamily="system-ui, sans-serif" textAnchor="middle">
              q{q}
            </text>
          </g>
        ))}
        {props.circuit.map((g, i) => (
          <g key={i} transform={`translate(${String(gateX(i))} 0)`} className={i <= cursor ? 'gate is-done' : 'gate'} opacity={props.gateCursor === undefined || i <= cursor ? 1 : 0.55}>
            <GateArt g={g} wireY={wireY} />
          </g>
        ))}
        {props.gateCursor !== undefined && !atOutput ? (
          <line x1={cursorX} y1={18} x2={cursorX} y2={H - 18} stroke={COLOURS.alarm} strokeWidth="2" strokeDasharray="6 5" className="time-cursor" />
        ) : null}
        {/* input tokens (public starting fire) */}
        {props.inputFires !== null && props.inputFires !== undefined
          ? Array.from({ length: n }, (_, q) => {
              const l = letterOf(props.inputFires ?? null, q);
              return l === 'I' ? null : <SvgFlame key={`in-${String(q)}`} x={INPUT_X} y={wireY(q)} letter={l} size={30} />;
            })
          : null}
        {/* travelling tokens at the cursor */}
        {showWireTokens
          ? Array.from({ length: n }, (_, q) => {
              const l = letterOf(fires, q);
              return l === 'I' ? null : <SvgFlame key={`tok-${String(q)}`} x={tokenX} y={wireY(q)} letter={l} />;
            })
          : null}
        {centers.map((c, q) => (
          <circle key={q} cx={c.x} cy={c.y} r={OUT_R} fill={COLOURS.panel} stroke={COLOURS.lineStrong} strokeWidth="2" />
        ))}
        <text x={INPUT_X} y={H - 8} fontSize="12" fill={COLOURS.muted} fontFamily="system-ui, sans-serif" textAnchor="middle">
          start
        </text>
        <text x={outX} y={H - 8} fontSize="12" fill={COLOURS.muted} fontFamily="system-ui, sans-serif" textAnchor="middle">
          end
        </text>
      </svg>
      {centers.map((c, q) => (
        <Block
          key={q}
          q={q}
          center={c}
          r={OUT_R}
          W={W}
          H={H}
          fire={atOutput ? letterOf(fires, q) : 'I'}
          crew={props.placements?.[q] ?? asCrew(letterOf(props.crews, q))}
          residual={props.residual === null ? null : letterOf(props.residual, q)}
          interactive={props.interactive}
          selected={props.selected}
          budgetReached={props.budgetReached ?? false}
          watchers={[]}
          onToggle={props.onToggle}
          onKeyDown={onKeyDown}
        />
      ))}
    </div>
  );
}
