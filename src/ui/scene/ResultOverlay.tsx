/**
 * ResultOverlay — the four readable results (R9) as a card beside/below the scene: big title, the district's
 * reaction line, the one-line quantum-rules note, stars out of max, Why? / Try again / Next and a Details fold.
 * It is a region whose heading receives focus (tabIndex -1, data-focus-target), not a dialog: the scene behind it
 * stays readable and reachable.
 */
import { useId, type ReactNode } from 'react';
import { fromString, support } from '../../quantum';
import type { Debrief, ResultType } from '../../game';
import { CheckMark, Flame, MemoryTower } from '../art';
import { reactionFor, useT, type MissionCopy } from '../i18n';
import { RESULT_BODY_KEY, RESULT_TITLE_KEY } from './captions';
import { anomalyLetter, letterOf } from './houseState';

export interface ResultOverlayProps {
  readonly debrief: Debrief;
  readonly result: ResultType;
  readonly missionCopy: MissionCopy;
  readonly stars: number;
  readonly maxStars: number;
  readonly onWhy: () => void;
  readonly onRetry: () => void;
  readonly onNext: () => void;
  readonly nextLabel: string;
  /** Details content (raw residual, alarms, decision quality, cloud panel…). */
  readonly children?: ReactNode | undefined;
  readonly className?: string | undefined;
}

export function ResultOverlay(props: ResultOverlayProps) {
  const t = useT();
  const headingId = useId();
  const { result, debrief } = props;
  const residual = fromString(debrief.residual);
  const pattern = support(residual);
  const anomaly = result === 'logical-failure' ? anomalyLetter(debrief.logicalFlip) : null;
  const starsText = props.maxStars === 1 ? t('result.starsOf.one', { stars: props.stars }) : t('result.starsOf.other', { stars: props.stars, max: props.maxStars });
  const beaconText = anomaly === 'Y' ? t('result.beacon.logicalXZ') : anomaly === 'X' ? t('result.beacon.logicalX') : anomaly === 'Z' ? t('result.beacon.logicalZ') : null;
  const firstLetter = letterOf(debrief.residual, pattern[0] ?? 0);
  return (
    <section
      className={`result-overlay result-${result}${props.className === undefined ? '' : ` ${props.className}`}`}
      aria-labelledby={headingId}
      data-testid="result-overlay"
      data-result={result}
    >
      <div className="result-head">
        <span className="result-icon" aria-hidden="true">
          <svg viewBox="-40 -100 80 100" width="56" height="70" focusable="false">
            {result === 'restored' ? <CheckMark x={0} y={-20} scale={1.4} /> : null}
            {result === 'safe-pattern' ? <Flame letter={firstLetter === 'I' ? 'X' : firstLetter} x={0} y={-4} scale={0.95} ghost /> : null}
            {result === 'still-burning' ? <Flame letter={firstLetter === 'I' ? 'X' : firstLetter} x={0} y={-4} scale={0.95} residual /> : null}
            {result === 'logical-failure' ? <MemoryTower x={0} y={0} scale={0.5} anomaly={anomaly} /> : null}
          </svg>
        </span>
        <div className="result-titles">
          <h2 id={headingId} className="result-title" tabIndex={-1} data-focus-target data-testid="result-title">
            {t(RESULT_TITLE_KEY[result])}
          </h2>
          <p className="result-stars" data-testid="result-stars" aria-label={starsText}>
            <span aria-hidden="true">
              {Array.from({ length: props.maxStars }, (_, i) => (
                <span key={i} className={i < props.stars ? 'star star-on' : 'star'}>
                  {i < props.stars ? '★' : '☆'}
                </span>
              ))}
            </span>{' '}
            <span className="result-stars-text">{starsText}</span>
          </p>
        </div>
      </div>
      <p className="result-reaction" data-testid="result-reaction">
        {reactionFor(props.missionCopy, result)}
      </p>
      <p className="result-body">{t(RESULT_BODY_KEY[result])}</p>
      {beaconText !== null ? (
        <p className="result-beacon" data-testid="result-beacon">
          <strong>{beaconText}</strong> {t('result.beacon.pattern', { pattern: debrief.residual })}
        </p>
      ) : null}
      <p className="result-rules">{t('spray.quantumRules')}</p>
      <div className="result-actions">
        <button type="button" className="btn" data-testid="result-why" onClick={props.onWhy}>
          {t('dispatch.why')}
        </button>
        <button type="button" className="btn" data-testid="result-retry" onClick={props.onRetry}>
          {t('result.tryAgain')}
        </button>
        <button type="button" className="btn btn-primary" data-testid="result-next" onClick={props.onNext}>
          {props.nextLabel}
        </button>
      </div>
      <details className="result-details" data-testid="result-details">
        <summary>{t('details.show')}</summary>
        <div className="result-details-body">
          {result === 'safe-pattern' ? <p>{t('result.type.safePattern.details', { residual: debrief.residual })}</p> : null}
          {props.children}
        </div>
      </details>
    </section>
  );
}
