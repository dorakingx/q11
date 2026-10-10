/**
 * Side-panel building blocks: alarm list, crew palette, verdict banner, stars, top bar, notice, dialog.
 */
import { useEffect, useRef, type ReactNode } from 'react';
import { getCode, type CodeId, type VerdictKind } from '../quantum';
import { Flame, GearIcon, Helmet, StarIcon, StationGlyph } from './glyphs';
import { CREW_LABEL } from './theme';
import { alarmSummary } from './text';
import { OUTCOME_LABEL, type CrewLetter } from '../game';

export interface AlarmListProps {
  readonly codeId: CodeId;
  /** null = not read yet */
  readonly syndrome: readonly number[] | null;
  readonly id?: string;
  readonly compact?: boolean;
}

export function AlarmList({ codeId, syndrome, id, compact = false }: AlarmListProps) {
  const code = getCode(codeId);
  if (code.checks.length === 0) {
    return (
      <section className="panel-section" aria-labelledby={id === undefined ? undefined : `${id}-h`}>
        <h3 id={id === undefined ? undefined : `${id}-h`} className="panel-title">
          Alarms
        </h3>
        <p className="muted" id={id}>
          No alarm stations on bare wires. Predict where the fires end up.
        </p>
      </section>
    );
  }
  return (
    <section className="panel-section" aria-labelledby={id === undefined ? undefined : `${id}-h`}>
      <h3 id={id === undefined ? undefined : `${id}-h`} className="panel-title">
        Alarms
      </h3>
      <p className="sr-only" id={id} aria-live="polite">
        {alarmSummary(codeId, syndrome)}
      </p>
      <ul className={`alarm-list ${code.checks.length > 4 ? 'is-grid' : ''} ${compact ? 'is-compact' : ''}`} aria-label="Alarm stations">
        {code.checks.map((c, i) => {
          const ringing = syndrome !== null && (syndrome[i] ?? 0) === 1;
          return (
            <li key={c.id} className={ringing ? 'alarm is-ringing' : 'alarm'} data-check={c.id} data-ringing={ringing ? '1' : '0'}>
              <StationGlyph type={c.type} ringing={ringing} size={22} />
              <span className="alarm-main">
                <span className="alarm-id">{c.id}</span>
                <span className="alarm-blocks">blocks {c.qubits.join(', ')}</span>
              </span>
              <span className="alarm-state">{syndrome === null ? '—' : ringing ? 'RINGING' : 'quiet'}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export interface PaletteProps {
  readonly allowed: readonly CrewLetter[];
  readonly selected: CrewLetter;
  readonly onSelect: (l: CrewLetter) => void;
}

const KEY_FOR: Readonly<Record<CrewLetter, string>> = { X: '1', Z: '2', Y: '3' };
const PUTS_OUT: Readonly<Record<CrewLetter, string>> = { X: 'puts out red fires', Z: 'puts out blue fires', Y: 'puts out red-and-blue fires' };

export function Palette({ allowed, selected, onSelect }: PaletteProps) {
  return (
    <section className="panel-section" aria-labelledby="palette-h">
      <h3 id="palette-h" className="panel-title">
        Crews
      </h3>
      <div className="palette" role="radiogroup" aria-label="Crew colour">
        {(['X', 'Z', 'Y'] as const)
          .filter((l) => allowed.includes(l))
          .map((l) => (
            <button
              key={l}
              type="button"
              role="radio"
              aria-checked={selected === l}
              className={`palette-btn palette-${l} ${selected === l ? 'is-selected' : ''}`}
              onClick={() => onSelect(l)}
              aria-label={`${CREW_LABEL[l]} crew, ${PUTS_OUT[l]}, key ${KEY_FOR[l]}`}
              data-testid={`palette-${l}`}
            >
              <Helmet letter={l} size={30} />
              <span className="palette-text">
                <span className="palette-name">{l} crew</span>
                <span className="palette-hint">{PUTS_OUT[l]}</span>
              </span>
              <kbd className="palette-key" aria-hidden="true">
                {KEY_FOR[l]}
              </kbd>
            </button>
          ))}
      </div>
    </section>
  );
}

export function VerdictBanner({ verdict }: { readonly verdict: VerdictKind }) {
  return (
    <div className={`verdict verdict-${verdict}`} role="status" data-testid="verdict">
      <span className="verdict-icon" aria-hidden="true">
        {verdict === 'success' ? <OkMark /> : verdict === 'detectable' ? <Flame letter="X" size={26} /> : <WarnMark />}
      </span>
      <span className="verdict-text">{OUTCOME_LABEL[verdict]}</span>
    </div>
  );
}

function OkMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M7 12.5l3.2 3.2L17 8.8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarnMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 2.5 20h19Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 9v5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function Stars({ count, size = 22, label }: { readonly count: number; readonly size?: number; readonly label?: string }) {
  return (
    <span className="stars" role="img" aria-label={label ?? `${String(count)} of 3 stars`}>
      {[0, 1, 2].map((i) => (
        <StarIcon key={i} filled={i < count} size={size} />
      ))}
    </span>
  );
}

export interface TopBarProps {
  readonly title: ReactNode;
  readonly subtitle?: ReactNode;
  readonly onMissions?: () => void;
  readonly onSettings: () => void;
  readonly onTitle?: () => void;
}

export function TopBar({ title, subtitle, onMissions, onSettings, onTitle }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="topbar-title">
        {onTitle === undefined ? (
          <span className="brand">Q11</span>
        ) : (
          <button type="button" className="btn btn-ghost brand-btn" onClick={onTitle} aria-label="Back to title">
            Q11
          </button>
        )}
        <div className="topbar-text">
          <h1 className="topbar-h">{title}</h1>
          {subtitle !== undefined ? <p className="topbar-sub">{subtitle}</p> : null}
        </div>
      </div>
      <nav className="topbar-actions" aria-label="Game">
        {onMissions !== undefined ? (
          <button type="button" className="btn btn-ghost" onClick={onMissions}>
            Missions
          </button>
        ) : null}
        <button type="button" className="btn btn-ghost btn-icon" onClick={onSettings} aria-label="Settings">
          <GearIcon />
        </button>
      </nav>
    </header>
  );
}

export function Notice({ text, onDismiss }: { readonly text: string; readonly onDismiss: () => void }) {
  return (
    <div className="notice" role="status" data-testid="notice">
      <span>{text}</span>
      <button type="button" className="btn btn-ghost btn-small" onClick={onDismiss} aria-label="Dismiss notice">
        Dismiss
      </button>
    </div>
  );
}

export interface DialogProps {
  readonly title: string;
  readonly children: ReactNode;
  readonly confirmLabel: string;
  readonly cancelLabel?: string;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
  readonly danger?: boolean;
}

export function Dialog({ title, children, confirmLabel, cancelLabel = 'Cancel', onConfirm, onCancel, danger = false }: DialogProps) {
  const first = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    first.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onCancel]);
  return (
    <div className="dialog-backdrop" role="presentation">
      <div className="dialog" role="alertdialog" aria-modal="true" aria-labelledby="dialog-h" aria-describedby="dialog-d">
        <h2 id="dialog-h" className="dialog-title">
          {title}
        </h2>
        <div id="dialog-d" className="dialog-body">
          {children}
        </div>
        <div className="dialog-actions">
          <button type="button" className="btn" ref={first} onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className={danger ? 'btn btn-danger' : 'btn btn-primary'} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Legend({ allowed }: { readonly allowed: readonly CrewLetter[] }) {
  return (
    <ul className="legend" aria-label="Legend">
      {allowed.map((l) => (
        <li key={`f-${l}`}>
          <Flame letter={l} size={20} /> {CREW_LABEL[l]} fire
        </li>
      ))}
      {allowed.map((l) => (
        <li key={`c-${l}`}>
          <Helmet letter={l} size={20} /> {CREW_LABEL[l]} crew
        </li>
      ))}
    </ul>
  );
}
