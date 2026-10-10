/**
 * Shared building blocks: art icons (flame / helmet / detector lamp / water drop), alarm list, crew palette (big
 * chips), stars, top bar, language pill, Details fold, notice and the modal dialog. Panel titles are h2 (each screen
 * has exactly one h1 in the top bar). Every string goes through useT().
 */
import { useEffect, useLayoutEffect, useRef, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { getCode, type CodeId } from '../quantum';
import type { CrewLetter, Language } from '../game';
import { DetectorLamp, Drop, Flame, HelmetChip } from './art';
import { GearIcon, Q11Mark, StarIcon } from './glyphs';
import { LANGUAGE_NAMES, useT } from './i18n';
import { alarmSummary, CREW_KEY, PUTS_OUT_KEY } from './text';

/* ------------------------------------------------------------------ art icons (decorative) */

export function FlameIcon({ letter, size = 28, ghost = false, residual = false }: { readonly letter: CrewLetter; readonly size?: number; readonly ghost?: boolean; readonly residual?: boolean }) {
  return (
    <svg className={`icon icon-flame icon-${letter}`} width={size} height={size} viewBox="-34 -100 68 104" aria-hidden="true" focusable="false">
      <Flame letter={letter} x={0} y={0} ghost={ghost} residual={residual} />
    </svg>
  );
}

export function HelmetIcon({ letter, size = 28 }: { readonly letter: CrewLetter; readonly size?: number }) {
  return (
    <svg className={`icon icon-helmet icon-${letter}`} width={size} height={size * 0.8} viewBox="-30 -44 60 48" aria-hidden="true" focusable="false">
      <HelmetChip letter={letter} x={0} y={0} />
    </svg>
  );
}

export function DetectorIcon({ type, ringing = false, size = 26 }: { readonly type: 'X' | 'Z'; readonly ringing?: boolean; readonly size?: number }) {
  return (
    <svg className={`icon icon-detector icon-detector-${type}${ringing ? ' is-ringing' : ''}`} width={size} height={size} viewBox="-30 -30 60 60" aria-hidden="true" focusable="false">
      <DetectorLamp type={type} ringing={ringing} x={0} y={0} />
    </svg>
  );
}

export function WaterIcon({ size = 26 }: { readonly size?: number }) {
  return (
    <svg className="icon icon-water" width={size} height={size} viewBox="-22 -44 44 48" aria-hidden="true" focusable="false">
      <Drop x={0} y={0} />
    </svg>
  );
}

/* ------------------------------------------------------------------ alarms */

export interface AlarmListProps {
  readonly codeId: CodeId;
  /** null = not read yet */
  readonly syndrome: readonly number[] | null;
  readonly id?: string | undefined;
  readonly compact?: boolean | undefined;
  /** Optional hint line under the title (e.g. "Tap a station to see the houses it watches."). */
  readonly hint?: string | undefined;
}

export function AlarmList({ codeId, syndrome, id, compact = false, hint }: AlarmListProps) {
  const t = useT();
  const code = getCode(codeId);
  if (code.checks.length === 0) {
    return (
      <section className="panel-section" aria-labelledby={id === undefined ? undefined : `${id}-h`}>
        <h2 id={id === undefined ? undefined : `${id}-h`} className="panel-title">
          {t('alarms.title')}
        </h2>
        <p className="muted" id={id}>
          {t('alarms.noneBareWires')}
        </p>
      </section>
    );
  }
  return (
    <section className={`panel-section alarms${compact ? ' is-compact' : ''}`} aria-labelledby={id === undefined ? undefined : `${id}-h`}>
      <h2 id={id === undefined ? undefined : `${id}-h`} className="panel-title">
        {t('alarms.title')}
      </h2>
      <p className="sr-only" id={id} aria-live="polite">
        {alarmSummary(t, codeId, syndrome)}
      </p>
      <ul className={`alarm-list${code.checks.length > 4 ? ' is-grid' : ''}${compact ? ' is-compact' : ''}`} aria-label={t('alarms.stations')}>
        {code.checks.map((c, i) => {
          const ringing = syndrome !== null && (syndrome[i] ?? 0) === 1;
          return (
            <li key={c.id} className={ringing ? 'alarm is-ringing' : 'alarm'} data-check={c.id} data-ringing={ringing ? '1' : '0'}>
              <DetectorIcon type={c.type} ringing={ringing} size={26} />
              <span className="alarm-main">
                <span className="alarm-id">{c.id}</span>
                {/* Hidden visually in compact lists but always read by screen readers. */}
                <span className="alarm-blocks">{t('alarms.houses', { list: c.qubits.join(', ') })}</span>
              </span>
              <span className="alarm-state">{syndrome === null ? t('alarms.notRead') : ringing ? t('alarms.ringing') : t('alarms.quiet')}</span>
            </li>
          );
        })}
      </ul>
      {hint !== undefined ? <p className="muted small alarm-hint">{hint}</p> : null}
    </section>
  );
}

/* ------------------------------------------------------------------ palette */

export interface PaletteProps {
  readonly allowed: readonly CrewLetter[];
  readonly selected: CrewLetter;
  readonly onSelect: (l: CrewLetter) => void;
  /** Rendered after the title (tutorial callout). */
  readonly callout?: ReactNode;
}

const KEY_FOR: Readonly<Record<CrewLetter, string>> = { X: '1', Z: '2', Y: '3' };
const ORDER: readonly CrewLetter[] = ['X', 'Z', 'Y'];

/**
 * Radio group with a roving tabindex: one Tab stop (the selected crew), arrow keys move the selection.
 * Big chips with the helmet art; the accessible name is the visible text plus hidden colour / key hints.
 */
export function Palette({ allowed, selected, onSelect, callout }: PaletteProps) {
  const t = useT();
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
    <section className="panel-section palette-section" aria-labelledby="palette-h">
      <h2 id="palette-h" className="panel-title">
        {t('palette.title')}
      </h2>
      {callout}
      <div className="palette" role="radiogroup" aria-label={t('palette.group')}>
        {letters.map((l) => (
          <button
            key={l}
            type="button"
            role="radio"
            aria-checked={selected === l}
            tabIndex={selected === l ? 0 : -1}
            className={`palette-btn palette-${l}${selected === l ? ' is-selected' : ''}`}
            onClick={() => onSelect(l)}
            onKeyDown={(e) => onKeyDown(e, l)}
            data-letter={l}
            data-testid={`palette-${l}`}
          >
            <HelmetIcon letter={l} size={44} />
            <span className="palette-text">
              <span className="palette-name">
                {t('palette.crew', { letter: l })}
                {/* list separator per language (", " / "、"), see Scene.tsx HouseButton */}
                <span className="sr-only">{`${t('spray.list.comma', { a: '', b: '' })}${t(CREW_KEY[l])}${t('spray.list.comma', { a: '', b: '' })}`}</span>
              </span>
              <span className="palette-hint">{t(PUTS_OUT_KEY[l])}</span>
            </span>
            <kbd className="palette-key" aria-hidden="true">
              {KEY_FOR[l]}
            </kbd>
            <span className="sr-only">{t('palette.key', { key: KEY_FOR[l] })}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ stars */

export interface StarsProps {
  readonly count: number;
  /** Highest rating available (mission maxStars); the row draws this many stars. */
  readonly max?: number;
  readonly size?: number;
  readonly label?: string;
}

export function Stars({ count, max = 3, size = 22, label }: StarsProps) {
  const t = useT();
  return (
    <span className="stars" role="img" aria-label={label ?? t('mission.starsOf', { stars: count, max })}>
      {Array.from({ length: Math.max(1, max) }, (_, i) => (
        <StarIcon key={i} filled={i < count} size={size} />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ top bar */

export interface TopBarProps {
  readonly title: ReactNode;
  readonly subtitle?: ReactNode;
  readonly onMissions?: () => void;
  readonly onSettings: () => void;
  /** Accessible name of the gear button ("Settings" or, on the settings screen itself, "Close settings"). */
  readonly settingsLabel?: string;
  readonly onTitle?: () => void;
}

/** The app name as the brand chips show it ("Q11 Emergency" / "11Q Emergency"). */
export function BrandName() {
  const t = useT();
  return <>{t('app.name')}</>;
}

/**
 * The brand lockup: the mark (fluid, cropped to the drawn truck + flames) above the app name, the name set in the
 * title-screen face. The mark is exactly as wide as the name because the lockup shrink-wraps the name.
 * `nameAs` lets the title screen render the name as its h1.
 */
export function BrandLockup({ size = 'small', nameAs = 'span', nameProps }: { readonly size?: 'small' | 'title'; readonly nameAs?: 'span' | 'h1'; readonly nameProps?: Record<string, unknown> }) {
  const t = useT();
  const Name = nameAs;
  return (
    <span className={`brand-lockup brand-lockup-${size}`}>
      <span className="brand-mark brand-mark-fluid" aria-hidden={nameAs === 'span' ? 'true' : undefined}>
        <Q11Mark fluid lettering={t('app.lettering')} label={nameAs === 'span' ? undefined : t('a11y.q11mark')} />
      </span>
      <Name className={`brand-lockup-name${nameAs === 'h1' ? ' title-h' : ''}`} {...(nameProps ?? {})}>
        <BrandName />
      </Name>
    </span>
  );
}

export function TopBar({ title, subtitle, onMissions, onSettings, settingsLabel, onTitle }: TopBarProps) {
  const t = useT();
  // The brand lockup is the way back: to the city map on mission screens, to the title elsewhere.
  const brand =
    onMissions !== undefined ? (
      <button type="button" className="btn btn-ghost brand-btn" onClick={onMissions} aria-label={t('a11y.backToCity')} data-testid="topbar-city">
        <BrandLockup />
      </button>
    ) : onTitle !== undefined ? (
      <button type="button" className="btn btn-ghost brand-btn" onClick={onTitle} aria-label={t('a11y.backToTitle')}>
        <BrandLockup />
      </button>
    ) : (
      <span className="brand">
        <BrandLockup />
      </span>
    );
  return (
    <header className="topbar">
      <div className="topbar-title">
        {brand}
        <div className="topbar-text">
          <h1 className="topbar-h" tabIndex={-1} data-focus-target>
            {title}
          </h1>
          {subtitle !== undefined ? <p className="topbar-sub">{subtitle}</p> : null}
        </div>
      </div>
      <nav className="topbar-actions" aria-label={t('a11y.gameNav')}>
        <button type="button" className="btn btn-ghost btn-icon" onClick={onSettings} aria-label={settingsLabel ?? t('title.settings')} data-testid="topbar-settings">

          <GearIcon />
        </button>
      </nav>
    </header>
  );
}

/* ------------------------------------------------------------------ language pill */

export function LangToggle({ language, onChange, testId = 'lang-toggle' }: { readonly language: Language; readonly onChange: (l: Language) => void; readonly testId?: string }) {
  const t = useT();
  const other: Language = language === 'en' ? 'ja' : 'en';
  return (
    <button
      type="button"
      className="lang-pill"
      onClick={() => onChange(other)}
      aria-label={t('a11y.langPill', { lang: LANGUAGE_NAMES[other] })}
      title={t('title.language', { lang: LANGUAGE_NAMES[language] })}
      data-testid={testId}
      data-language={language}
    >
      {/* visible text "EN / JA" comes first in the accessible name ("Language: EN / JA, switch to …") */}
      <span className={language === 'en' ? 'lang-opt is-on' : 'lang-opt'}>EN</span>
      <span className="lang-sep" aria-hidden="true">
        /
      </span>
      <span className={language === 'ja' ? 'lang-opt is-on' : 'lang-opt'}>JA</span>
    </button>
  );
}

/* ------------------------------------------------------------------ details fold */

export function Details({ summary, children, testId, className }: { readonly summary?: string; readonly children: ReactNode; readonly testId?: string; readonly className?: string }) {
  const t = useT();
  return (
    <details className={`details-fold${className === undefined ? '' : ` ${className}`}`} data-testid={testId}>
      <summary>{summary ?? t('details.show')}</summary>
      <div className="details-body">{children}</div>
    </details>
  );
}

/* ------------------------------------------------------------------ notice */

export function Notice({ text, onDismiss }: { readonly text: string; readonly onDismiss: () => void }) {
  const t = useT();
  return (
    <div className="notice" role="status" data-testid="notice">
      <span>{text}</span>
      <button type="button" className="btn btn-ghost btn-small" onClick={onDismiss} aria-label={t('a11y.dismissNotice')}>
        {t('notice.dismiss')}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ dialog */

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
export function Dialog({ title, children, confirmLabel, cancelLabel, onConfirm, onCancel, danger = false }: DialogProps) {
  const t = useT();
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
            {cancelLabel ?? t('common.cancel')}
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

/* ------------------------------------------------------------------ legend */

export function Legend({ allowed, alarms = false, water = false }: { readonly allowed: readonly CrewLetter[]; readonly alarms?: boolean; readonly water?: boolean }) {
  const t = useT();
  return (
    <ul className="legend" aria-label={t('legend.title')}>
      {allowed.map((l) => (
        <li key={`f-${l}`}>
          <FlameIcon letter={l} size={24} /> {t('legend.fire', { crew: t(CREW_KEY[l]) })}
        </li>
      ))}
      {allowed.map((l) => (
        <li key={`c-${l}`}>
          <HelmetIcon letter={l} size={24} /> {t('legend.crew', { crew: t(CREW_KEY[l]) })}
        </li>
      ))}
      {alarms ? (
        <>
          <li>
            <DetectorIcon type="Z" size={24} /> {t('legend.alarmZ')}
          </li>
          <li>
            <DetectorIcon type="X" size={24} /> {t('legend.alarmX')}
          </li>
        </>
      ) : null}
      {water ? (
        <li>
          <WaterIcon size={24} /> {t('legend.water')}
        </li>
      ) : null}
    </ul>
  );
}
