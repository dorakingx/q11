/**
 * Side-panel building blocks: alarm list, crew palette, verdict banner, stars, top bar, notice, dialog.
 * Panel titles are h2 (each screen has exactly one h1 in the top bar).
 */
import { useEffect, useLayoutEffect, useRef, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
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
        <h2 id={id === undefined ? undefined : `${id}-h`} className="panel-title">
          Alarms
        </h2>
        <p className="muted" id={id}>
          No alarm stations on bare wires. Predict where the fires end up.
        </p>
      </section>
    );
  }
  return (
    <section className="panel-section" aria-labelledby={id === undefined ? undefined : `${id}-h`}>
      <h2 id={id === undefined ? undefined : `${id}-h`} className="panel-title">
        Alarms
      </h2>
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
                {/* Hidden visually on small screens / compact lists but always read by screen readers. */}
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
const ORDER: readonly CrewLetter[] = ['X', 'Z', 'Y'];

/**
 * Radio group with a roving tabindex: one Tab stop (the selected crew), arrow keys move the selection.
 * The accessible name is the visible text ("X crew puts out red fires") plus hidden colour / key hints.
 */
export function Palette({ allowed, selected, onSelect }: PaletteProps) {
  const letters = ORDER.filter((l) => allowed.includes(l));
  const onKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>, l: CrewLetter) => {
    const i = letters.indexOf(l);
    if (i < 0 || letters.length === 0) return;
    let next: CrewLetter | undefined;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = letters[(i + 1) % letters.length];
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = letters[(i - 1 + letters.length) % letters.length];
    else if (e.key === 'Home') next = letters[0];
    else if (e.key === 'End') next = letters[letters.length - 1];
    if (next === undefined) return;
    e.preventDefault();
    onSelect(next);
    const root = e.currentTarget.closest('[role="radiogroup"]');
    root?.querySelector<HTMLElement>(`[data-letter="${next}"]`)?.focus();
  };
  return (
    <section className="panel-section" aria-labelledby="palette-h">
      <h2 id="palette-h" className="panel-title">
        Crews
      </h2>
      <div className="palette" role="radiogroup" aria-label="Crew colour">
        {letters.map((l) => (
          <button
            key={l}
            type="button"
            role="radio"
            aria-checked={selected === l}
            tabIndex={selected === l ? 0 : -1}
            className={`palette-btn palette-${l} ${selected === l ? 'is-selected' : ''}`}
            onClick={() => onSelect(l)}
            onKeyDown={(e) => onKeyDown(e, l)}
            data-letter={l}
            data-testid={`palette-${l}`}
          >
            <Helmet letter={l} size={30} />
            <span className="palette-text">
              <span className="palette-name">
                {l} crew<span className="sr-only">, {CREW_LABEL[l]},</span>
              </span>
              <span className="palette-hint">{PUTS_OUT[l]}</span>
            </span>
            <kbd className="palette-key" aria-hidden="true">
              {KEY_FOR[l]}
            </kbd>
            <span className="sr-only">, key {KEY_FOR[l]}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function VerdictBanner({ verdict, label }: { readonly verdict: VerdictKind; readonly label?: string }) {
  return (
    <div className={`verdict verdict-${verdict}`} role="status" data-testid="verdict" tabIndex={-1} data-focus-target>
      <span className="verdict-icon" aria-hidden="true">
        {verdict === 'success' ? <OkMark /> : verdict === 'detectable' ? <Flame letter="X" size={26} /> : <WarnMark />}
      </span>
      <span className="verdict-text">{label ?? OUTCOME_LABEL[verdict]}</span>
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

export interface StarsProps {
  readonly count: number;
  /** Highest rating available (mission maxStars); the row draws this many stars. */
  readonly max?: number;
  readonly size?: number;
  readonly label?: string;
}

export function Stars({ count, max = 3, size = 22, label }: StarsProps) {
  return (
    <span className="stars" role="img" aria-label={label ?? `${String(count)} of ${String(max)} stars`}>
      {Array.from({ length: Math.max(1, max) }, (_, i) => (
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
  /** Accessible name of the gear button ("Settings" or, on the settings screen itself, "Close settings"). */
  readonly settingsLabel?: string;
  readonly onTitle?: () => void;
}

export function TopBar({ title, subtitle, onMissions, onSettings, settingsLabel = 'Settings', onTitle }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="topbar-title">
        {onTitle === undefined ? (
          <span className="brand">Q11</span>
        ) : (
          <button type="button" className="btn btn-ghost brand-btn" onClick={onTitle} aria-label="Q11 — back to title">
            Q11
          </button>
        )}
        <div className="topbar-text">
          <h1 className="topbar-h" tabIndex={-1} data-focus-target>
            {title}
          </h1>
          {subtitle !== undefined ? <p className="topbar-sub">{subtitle}</p> : null}
        </div>
      </div>
      <nav className="topbar-actions" aria-label="Game">
        {onMissions !== undefined ? (
          <button type="button" className="btn btn-ghost" onClick={onMissions}>
            Missions
          </button>
        ) : null}
        <button type="button" className="btn btn-ghost btn-icon" onClick={onSettings} aria-label={settingsLabel} data-testid="topbar-settings">
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

/** Elements that must be made inert while a dialog is open (the app's main content wrapper). */
export const INERT_ROOT_SELECTOR = '[data-inert-root]';

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Truly modal confirm dialog, rendered in a portal on document.body:
 *  - the app content (`[data-inert-root]`) gets the `inert` attribute while open,
 *  - Tab / Shift+Tab cycle inside the dialog, Escape cancels,
 *  - the cancel button receives focus once on open (not on every render), and focus returns to the opener on close.
 */
export function Dialog({ title, children, confirmLabel, cancelLabel = 'Cancel', onConfirm, onCancel, danger = false }: DialogProps) {
  const first = useRef<HTMLButtonElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const onCancelRef = useRef(onCancel);
  useEffect(() => {
    onCancelRef.current = onCancel;
  }, [onCancel]);

  // Mount-only: remember the opener, make the app inert, focus the dialog; undo everything on unmount.
  useLayoutEffect(() => {
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const roots = Array.from(document.querySelectorAll<HTMLElement>(INERT_ROOT_SELECTOR));
    const previouslyInert = roots.map((r) => r.hasAttribute('inert'));
    roots.forEach((r) => r.setAttribute('inert', ''));
    first.current?.focus();
    return () => {
      roots.forEach((r, i) => {
        if (!(previouslyInert[i] ?? false)) r.removeAttribute('inert');
      });
      if (opener !== null && opener.isConnected) opener.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancelRef.current();
        return;
      }
      if (e.key !== 'Tab') return;
      const root = box.current;
      if (root === null) return;
      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (firstEl === undefined || lastEl === undefined) return;
      const active = document.activeElement;
      const inside = active instanceof Node && root.contains(active);
      if (!inside) {
        e.preventDefault();
        (e.shiftKey ? lastEl : firstEl).focus();
      } else if (e.shiftKey && active === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && active === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const dialog = (
    <div className="dialog-backdrop" role="presentation">
      <div className="dialog" role="alertdialog" aria-modal="true" aria-labelledby="dialog-h" aria-describedby="dialog-d" ref={box}>
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
  return createPortal(dialog, document.body);
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
