/** mulberry32: small, fast, deterministic 32-bit PRNG. Same seed ⇒ same sequence on every platform. */
export interface Rng {
  /** Next unsigned 32-bit integer. */
  nextU32(): number;
  /** Uniform float in [0, 1). */
  nextFloat(): number;
  /** Uniform integer in [0, maxExclusive). */
  int(maxExclusive: number): number;
  /** Uniformly chosen element of a non-empty array. */
  pick<T>(items: readonly T[]): T;
}

export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  const nextU32 = (): number => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return (t ^ (t >>> 14)) >>> 0;
  };
  const nextFloat = (): number => nextU32() / 4294967296;
  const int = (maxExclusive: number): number => {
    if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) {
      throw new RangeError(`int() needs a positive integer bound, got ${String(maxExclusive)}`);
    }
    return Math.floor(nextFloat() * maxExclusive);
  };
  const pick = <T>(items: readonly T[]): T => {
    if (items.length === 0) throw new RangeError('pick() needs a non-empty array');
    const v = items[int(items.length)];
    if (v === undefined) throw new RangeError('pick() index out of range');
    return v;
  };
  return { nextU32, nextFloat, int, pick };
}
