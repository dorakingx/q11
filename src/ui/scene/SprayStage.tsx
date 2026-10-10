/**
 * SprayStage — a Scene showing the spray frame of a timeline at one clock reading. Shared by SprayPlayer and
 * WhyCompare. Every picture comes from `computeFrame` over the engine-built timeline and the Debrief strings.
 */
import { useMemo } from 'react';
import { fromString, type Circuit, type CodeId } from '../../quantum';
import { hasPrelude, type Debrief, type EffectTimeline, type MissionKind } from '../../game';
import { computeFrame } from './frame';
import { Scene } from './Scene';
import type { SceneKind } from './geometry';
import { frameOptionsFor, missionKindOf, outcomeFor } from './stageModel';

export interface SprayStageProps {
  readonly codeId: CodeId;
  readonly circuit: Circuit;
  readonly sceneKind?: SceneKind | undefined;
  readonly debrief: Debrief;
  readonly timeline: EffectTimeline;
  /** Clock reading (ms) or, with `strict`, the reduced-motion step + 1. */
  readonly time: number;
  readonly strict?: boolean | undefined;
  /** Override for synthetic debriefs whose id is not a mission (defaults to the mission's kind). */
  readonly missionKind?: MissionKind | undefined;
  readonly ariaLabel?: string | undefined;
  readonly ariaDescribedBy?: string | undefined;
  readonly className?: string | undefined;
}

export function SprayStage(props: SprayStageProps) {
  const n = fromString(props.debrief.fires).n;
  const kind = missionKindOf(props.debrief.missionId, props.missionKind);
  const prelude = hasPrelude(props.timeline);
  const opts = useMemo(() => frameOptionsFor(props.debrief, n, kind, prelude), [props.debrief, n, kind, prelude]);
  const frame = useMemo(() => computeFrame(props.timeline, props.time, { ...opts, strict: props.strict ?? false }), [props.timeline, props.time, opts, props.strict]);
  const outcome = outcomeFor(props.debrief, frame);
  const isLanes = props.codeId === 'trivial2' || props.codeId === 'trivial3';
  // With a prelude the gate cursor follows the travelling tokens (frame.lanes); otherwise the fires already sit in the houses.
  const gateCursor = frame.lanes !== null ? frame.lanes.cursor : props.circuit.length;
  return (
    <Scene
      codeId={props.codeId}
      circuit={props.circuit}
      sceneKind={props.sceneKind}
      fires={props.debrief.fires}
      crews={null}
      residual={null}
      syndrome={frame.syndrome}
      interactive={false}
      gateCursor={isLanes ? gateCursor : undefined}
      inputFires={isLanes ? props.debrief.startFires : null}
      frame={frame}
      outcome={outcome}
      ariaLabel={props.ariaLabel}
      ariaDescribedBy={props.ariaDescribedBy}
      className={props.className}
    />
  );
}
