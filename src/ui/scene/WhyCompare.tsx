/**
 * WhyCompare — "Your spray" next to "The other way" (R10): two scenes playing the same timeline semantics on the
 * same board, side by side (stacked on phones), under one clock. The alternative's Debrief is computed honestly
 * with `confirmDispatch(missionId, placements)` (the only place the engine reads the true error), so its pictures
 * are the engine's, not ours. Captions explain stabilizer equivalence or why alarms alone cannot decide.
 */
import { useMemo } from 'react';
import { getCode, type Circuit, type CodeId, type VerdictKind } from '../../quantum';
import { buildEffects, confirmDispatch, type Debrief, type EffectTimeline } from '../../game';
import { useT, type MissionCopy } from '../i18n';
import { captionAt } from './captions';
import type { SceneKind } from './geometry';
import { SprayStage } from './SprayStage';
import { placementsFromCrews } from './stageModel';
import { useSprayClock } from './useSprayClock';

export interface WhyAlternative {
  /** Crews as a Pauli string (qubit-0-first), e.g. the decoder dispatch or the true-fire crews. */
  readonly crews: string;
  readonly verdict: VerdictKind;
  /** Short label, e.g. t('why.decoder') or t('why.trueFires'). */
  readonly label: string;
}

export interface WhyCompareProps {
  readonly codeId: CodeId;
  readonly circuit: Circuit;
  readonly sceneKind?: SceneKind | undefined;
  readonly mine: Debrief;
  readonly alternative: WhyAlternative;
  readonly reducedMotion: boolean;
  readonly missionCopy: MissionCopy;
}

/** Combined timeline for the shared clock: both replays run on the longer duration / step count. */
function sharedTimeline(a: EffectTimeline, b: EffectTimeline): EffectTimeline {
  return a.durationMs >= b.durationMs ? a : b;
}

const VERDICT_KEY = { success: 'result.outcome.success', 'logical-error': 'result.outcome.logicalError', detectable: 'result.outcome.detectable' } as const;

export function WhyCompare(props: WhyCompareProps) {
  const t = useT();
  const { mine, alternative } = props;
  const alt = useMemo(() => confirmDispatch(mine.missionId, placementsFromCrews(alternative.crews)), [mine.missionId, alternative.crews]);
  const mineTimeline = useMemo(() => buildEffects(mine, props.reducedMotion), [mine, props.reducedMotion]);
  const altTimeline = useMemo(() => buildEffects(alt, props.reducedMotion), [alt, props.reducedMotion]);
  const shared = sharedTimeline(mineTimeline, altTimeline);
  const clock = useSprayClock(shared, props.reducedMotion);
  const hasChecks = getCode(props.codeId).checks.length > 0;
  const ctx = { district: props.missionCopy.districtName, hasChecks };
  const mineCaption = captionAt(t, mineTimeline, clock.time, ctx, props.reducedMotion);
  const altCaption = captionAt(t, altTimeline, clock.time, ctx, props.reducedMotion);
  // Two corrections are stabilizer-equivalent when their residuals differ by a stabilizer; both residuals being
  // stabilizers (both verdicts 'success') is the honest sufficient case, plus the engine's own decoder flag.
  const equivalent = (mine.verdict === 'success' && alt.verdict === 'success') || (mine.whatIf.equivalentToDecoder && alternative.crews === mine.whatIf.decoderCrews);
  const sameAlarms = mine.syndromeOfFires.join('') === alt.syndromeOfFires.join('');
  const explanation = equivalent ? t('why.equivalent') : mine.verdict !== alt.verdict && sameAlarms ? `${t('why.sameAlarms')} ${t('why.cannotDecide')}` : props.missionCopy.whyShort;

  const pane = (title: string, debrief: Debrief, timeline: EffectTimeline, caption: string, testId: string) => (
    <div className="why-pane" data-testid={testId}>
      <h3 className="why-pane-title">{title}</h3>
      <SprayStage codeId={props.codeId} circuit={props.circuit} sceneKind={props.sceneKind} debrief={debrief} timeline={timeline} time={clock.time} strict={props.reducedMotion} ariaLabel={title} />
      <p className="why-caption" aria-live="polite">
        {caption}
      </p>
      <p className="why-verdict">
        {t('why.verdict', { verdict: t(VERDICT_KEY[debrief.verdict]) })}
      </p>
    </div>
  );

  return (
    <section className="why-compare" aria-label={t('why.title')} data-testid="why-compare" data-finished={clock.finished ? 'true' : 'false'}>
      <div className="why-panes">
        {pane(t('why.yours'), mine, mineTimeline, mineCaption, 'why-mine')}
        {pane(`${t('why.alternative')} · ${alternative.label}`, alt, altTimeline, altCaption, 'why-alt')}
      </div>
      <p className="why-explanation" data-testid="why-explanation">
        {explanation}
      </p>
      {mine.verdict === 'logical-error' && alt.verdict !== mine.verdict ? <p className="why-noblame">{t('why.noBlame')}</p> : null}
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
