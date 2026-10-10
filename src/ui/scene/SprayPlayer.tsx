/**
 * SprayPlayer — the spray showpiece (R7). Plays an EffectTimeline built by src/game/effects.ts from the engine's
 * Debrief on a rAF clock; every house's after-state comes from the timeline, never from this component.
 *
 *   full motion     trucks arrive → crews run → hose streams (the sprayed house shows its true fire) → splash →
 *                   house changes → remaining fires → alarms → outcome → done. A caption line narrates every event;
 *                   a separate live region announces only the trucks, each impact and the outcome. Skip jumps to
 *                   the final frame.
 *   reduced motion  no clock: Prev / Next step through static frames; the last step finishes the replay.
 *
 * `onDone` fires exactly once (natural end, Skip, double Skip, or the last step) and never after unmount.
 */
import { useEffect, useRef } from 'react';
import type { Circuit, CodeId } from '../../quantum';
import { getCode } from '../../quantum';
import type { Debrief, EffectTimeline, MissionKind } from '../../game';
import { useT, type MissionCopy } from '../i18n';
import { announcementAt, captionAt } from './captions';
import type { SceneKind } from './geometry';
import { SprayStage } from './SprayStage';
import { useSprayClock } from './useSprayClock';

export interface SprayPlayerProps {
  readonly codeId: CodeId;
  readonly circuit: Circuit;
  readonly sceneKind?: SceneKind | undefined;
  readonly debrief: Debrief;
  readonly timeline: EffectTimeline;
  readonly reducedMotion: boolean;
  readonly onDone: () => void;
  readonly missionCopy: MissionCopy;
  /** Override for synthetic debriefs (defaults to the mission's kind). */
  readonly missionKind?: MissionKind | undefined;
  /** Hide the header (used inside the Why comparison). */
  readonly compact?: boolean | undefined;
}

export function SprayPlayer(props: SprayPlayerProps) {
  const t = useT();
  const clock = useSprayClock(props.timeline, props.reducedMotion);
  const done = useRef(false);
  const onDone = props.onDone;

  useEffect(() => {
    if (clock.finished && !done.current) {
      done.current = true;
      onDone();
    }
  }, [clock.finished, onDone]);

  const hasChecks = getCode(props.codeId).checks.length > 0;
  const ctx = { district: props.missionCopy.districtName, hasChecks };
  const caption = captionAt(t, props.timeline, clock.time, ctx, props.reducedMotion);
  const announcement = announcementAt(t, props.timeline, clock.time, ctx, props.reducedMotion);
  const stepLabel = t('motion.stepper.frame', { n: clock.step + 1, total: clock.steps });

  return (
    <section
      className={`spray-player${props.compact === true ? ' spray-compact' : ''}`}
      aria-label={t('dispatch.aria.player')}
      data-testid="spray-player"
      data-finished={clock.finished ? 'true' : 'false'}
      data-reduced-motion={props.reducedMotion ? 'true' : 'false'}
    >
      {props.compact === true ? null : (
        <header className="spray-header">
          <h2 className="spray-title">{t('dispatch.answerCheck')}</h2>
          <button type="button" className="btn btn-ghost spray-skip" data-testid="spray-skip" onClick={clock.skip} disabled={clock.finished}>
            {t('dispatch.skip')}
          </button>
        </header>
      )}
      <SprayStage
        codeId={props.codeId}
        circuit={props.circuit}
        sceneKind={props.sceneKind}
        debrief={props.debrief}
        timeline={props.timeline}
        time={clock.time}
        strict={props.reducedMotion}
        missionKind={props.missionKind}
        ariaLabel={t('dispatch.aria.player')}
      />
      <p className="spray-caption" data-testid="spray-caption">
        {caption}
      </p>
      {/* The live region only ever carries the trucks, the impacts and the outcome (not every run / spray line). */}
      <p className="spray-sr" role="status" aria-live="polite" aria-atomic="true" data-testid="spray-announcer">
        {announcement}
      </p>
      {props.reducedMotion ? (
        <div className="spray-stepper" role="group" aria-label={t('motion.stepper.title')}>
          <button type="button" className="btn" data-testid="spray-prev" onClick={clock.prev} disabled={clock.step <= 0}>
            {t('motion.stepper.prev')}
          </button>
          <span className="spray-step-label" data-testid="spray-step">
            {stepLabel}
          </span>
          <button type="button" className="btn btn-primary" data-testid="spray-next" onClick={clock.next} disabled={clock.finished}>
            {clock.step >= clock.steps - 2 ? t('motion.stepper.last') : t('motion.stepper.next')}
          </button>
        </div>
      ) : null}
      {props.compact === true ? null : (
        <p className="spray-rules">
          {t('spray.quantumRules')} <span className="spray-rules-note">{t('spray.oneShot')}</span>
        </p>
      )}
    </section>
  );
}
