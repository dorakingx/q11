/**
 * Clock for the spray showpiece. Full motion: performance.now() + requestAnimationFrame (setTimeout fallback) from
 * mount until the timeline's duration. Reduced motion: no clock at all — a step index over the events.
 * `skip()` jumps to the end in both modes. The hook never calls back; callers read `finished` and guard `onDone`.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { EffectTimeline } from '../../game';

export interface SprayClock {
  /** Full motion: elapsed ms (clamped to the duration). Reduced motion: the step index + 1 (strict frame time). */
  readonly time: number;
  /** Reduced motion: current step (0-based). Full motion: index of the last started event. */
  readonly step: number;
  readonly steps: number;
  readonly finished: boolean;
  readonly skip: () => void;
  readonly restart: () => void;
  readonly next: () => void;
  readonly prev: () => void;
}

function now(): number {
  return typeof performance !== 'undefined' && typeof performance.now === 'function' ? performance.now() : Date.now();
}

function schedule(cb: () => void): () => void {
  if (typeof requestAnimationFrame === 'function') {
    const id = requestAnimationFrame(cb);
    return () => cancelAnimationFrame(id);
  }
  const id = setTimeout(cb, 16);
  return () => clearTimeout(id);
}

/**
 * @param durationMs  full-motion duration (ignored under reduced motion)
 * @param steps       reduced-motion step count (= timeline.events.length)
 */
export function useSprayClock(timeline: EffectTimeline, reducedMotion: boolean): SprayClock {
  const durationMs = timeline.durationMs;
  const steps = Math.max(1, timeline.events.length);
  const [elapsed, setElapsed] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [run, setRun] = useState(0);
  const skipped = useRef(false);

  useEffect(() => {
    if (reducedMotion) return;
    skipped.current = false;
    const start = now();
    let cancel: (() => void) | null = null;
    let alive = true;
    const tick = () => {
      if (!alive || skipped.current) return;
      const e = now() - start;
      if (e >= durationMs) {
        setElapsed(durationMs);
        return;
      }
      setElapsed(e);
      cancel = schedule(tick);
    };
    cancel = schedule(tick);
    return () => {
      alive = false;
      cancel?.();
    };
  }, [durationMs, reducedMotion, run]);

  const skip = useCallback(() => {
    skipped.current = true;
    setElapsed(durationMs);
    setStepIndex(steps - 1);
  }, [durationMs, steps]);

  const restart = useCallback(() => {
    skipped.current = false;
    setElapsed(0);
    setStepIndex(0);
    setRun((r) => r + 1);
  }, []);

  const next = useCallback(() => setStepIndex((i) => Math.min(steps - 1, i + 1)), [steps]);
  const prev = useCallback(() => setStepIndex((i) => Math.max(0, i - 1)), []);

  if (reducedMotion) {
    const i = Math.min(stepIndex, steps - 1);
    return { time: i + 1, step: i, steps, finished: i >= steps - 1, skip, restart, next, prev };
  }
  const time = Math.min(elapsed, durationMs);
  let step = -1;
  timeline.events.forEach((e, index) => {
    if (e.t <= time) step = index;
  });
  return { time, step, steps, finished: time >= durationMs, skip, restart, next, prev };
}
