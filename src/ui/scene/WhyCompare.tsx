/**
 * WhyCompare — "Your spray" next to "The other way" (R10): two scenes playing the same timeline semantics on the
 * same board, side by side (stacked on phones), under one clock. The alternative's result (`mine.alternative`) was
 * evaluated by the engine when the player committed (src/game/machine confirmDispatch), so this component never
 * reads the true error itself — it only draws what the reducer already holds.
 *
 * Explanation rules (codes with stations):
 *   identical crews      "Your spray is exactly the smallest correction for these alarms."
 *   both succeed         stabilizer-equivalent corrections ("differ only by a harmless pattern")
 *   undecidable          both residuals ring nothing yet the verdicts differ → "alarms alone cannot decide"
 *   otherwise            the district's short why-line
 * Bare wires have no alarms: the alternative is "crews where the fires really ended" and the why-line explains the path.
 */
import { useMemo } from 'react';
import { getCode, type Circuit, type CodeId } from '../../quantum';
import { buildEffects, type Debrief, type EffectTimeline } from '../../game';
import { useT, type MissionCopy } from '../i18n';
import { announcementAt, captionAt } from './captions';
import type { SceneKind } from './geometry';
import { SprayStage } from './SprayStage';
import { alternativeDebrief } from './stageModel';
import { useSprayClock } from './useSprayClock';

/** @deprecated The alternative is read from `mine.alternative` (computed by the reducer); kept so older callers still type-check. */
export interface WhyAlternative {
  readonly crews: string;
  readonly verdict: Debrief['verdict'];
  readonly label: string;
}

export interface WhyCompareProps {
  readonly codeId: CodeId;
  readonly circuit: Circuit;
  readonly sceneKind?: SceneKind | undefined;
  readonly mine: Debrief;
  /** Ignored: the alternative comes from `mine.alternative`. */
  readonly alternative?: WhyAlternative | undefined;
  readonly reducedMotion: boolean;
  readonly missionCopy: MissionCopy;
}

/** Combined timeline for the shared clock: both replays run on the longer duration / step count. */
function sharedTimeline(a: EffectTimeline, b: EffectTimeline): EffectTimeline {
  return a.durationMs >= b.durationMs ? a : b;
}

const VERDICT_KEY = { success: 'result.outcome.success', 'logical-error': 'result.outcome.logicalError', detectable: 'result.outcome.detectable' } as const;
const WIRES_VERDICT_KEY = { success: 'result.outcome.success', 'logical-error': 'result.outcome.propagationMiss', detectable: 'result.outcome.detectable' } as const;

const allQuiet = (s: readonly number[]): boolean => s.every((b) => b === 0);

export function WhyCompare(props: WhyCompareProps) {
  const t = useT();
  const { mine } = props;
  const alt = useMemo(() => alternativeDebrief(mine), [mine]);
  // No propagation prelude here: the comparison is about the sprays, so both panels start with the fires in the houses.
  const mineTimeline = useMemo(() => buildEffects(mine, props.reducedMotion, { propagation: false }), [mine, props.reducedMotion]);
  const altTimeline = useMemo(() => buildEffects(alt, props.reducedMotion, { propagation: false }), [alt, props.reducedMotion]);
  const shared = sharedTimeline(mineTimeline, altTimeline);
  const clock = useSprayClock(shared, props.reducedMotion);
  const hasChecks = getCode(props.codeId).checks.length > 0;
  const ctx = { district: props.missionCopy.districtName, hasChecks };
  const verdictKeys = hasChecks ? VERDICT_KEY : WIRES_VERDICT_KEY;

  const identical = alt.crews === mine.crews;
  const equivalent = hasChecks && !identical && mine.verdict === 'success' && alt.verdict === 'success';
  const undecidable = hasChecks && !identical && mine.verdict !== alt.verdict && allQuiet(mine.syndromeOfResidual) && allQuiet(alt.syndromeOfResidual);
  const explanation = identical
    ? t(hasChecks ? 'why.identical' : 'why.identicalWires')
    : equivalent
      ? t('why.equivalent')
      : undecidable
        ? `${t('why.sameAlarms')} ${t('why.cannotDecide')}`
        : props.missionCopy.whyShort;
  const altLabel = mine.alternative.kind === 'true-fires' ? t('why.trueFires') : hasChecks ? t('why.decoder') : t('why.trueEnd');

  const pane = (title: string, debrief: Debrief, timeline: EffectTimeline, testId: string) => (
    <div className="why-pane" data-testid={testId}>
      <h3 className="why-pane-title">{title}</h3>
      <SprayStage codeId={props.codeId} circuit={props.circuit} sceneKind={props.sceneKind} debrief={debrief} timeline={timeline} time={clock.time} strict={props.reducedMotion} ariaLabel={title} />
      <p className="why-caption">{captionAt(t, timeline, clock.time, ctx, props.reducedMotion)}</p>
      <p className="spray-sr" role="status" aria-live="polite" aria-atomic="true" data-testid={`${testId}-announcer`}>
        {announcementAt(t, timeline, clock.time, ctx, props.reducedMotion)}
      </p>
      <p className="why-verdict">{t('why.verdict', { verdict: t(verdictKeys[debrief.verdict]) })}</p>
    </div>
  );

  return (
    <section
      className="why-compare"
      aria-label={t('why.title')}
      data-testid="why-compare"
      data-finished={clock.finished ? 'true' : 'false'}
      data-alternative={mine.alternative.kind}
      data-relation={identical ? 'identical' : equivalent ? 'equivalent' : undecidable ? 'undecidable' : 'other'}
    >
      <div className="why-panes">
        {pane(t('why.yours'), mine, mineTimeline, 'why-mine')}
        {pane(`${t('why.alternative')} · ${altLabel}`, alt, altTimeline, 'why-alt')}
      </div>
      <p className="why-explanation" data-testid="why-explanation">
        {explanation}
      </p>
      {undecidable && mine.verdict === 'logical-error' ? <p className="why-noblame">{t('why.noBlame')}</p> : null}
      <div className="why-controls" role="group" aria-label={t('why.title')}>
        {props.reducedMotion ? (
          <>
            <button type="button" className="btn" data-testid="why-prev" onClick={clock.prev} disabled={clock.step <= 0}>
              {t('motion.stepper.prev')}
            </button>
            <span className="spray-step-label">{t('motion.stepper.frame', { n: clock.step + 1, total: clock.steps })}</span>
            <button type="button" className="btn btn-primary" data-testid="why-next" onClick={clock.next} disabled={clock.finished}>
              {t('motion.stepper.next')}
            </button>
          </>
        ) : (
          <>
            <button type="button" className="btn" data-testid="why-skip" onClick={clock.skip} disabled={clock.finished}>
              {t('dispatch.skip')}
            </button>
            <button type="button" className="btn btn-primary" data-testid="why-replay" onClick={clock.restart}>
              {t('why.replayBoth')}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
