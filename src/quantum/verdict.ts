/**
 * Syndromes and verdicts. A verdict is decided by GF(2) algebra on the residual R = C·E, never by
 * "syndrome == 0" alone and never by the fidelity of one particular state.
 */
import type { Pauli, StabilizerCode, Syndrome, Verdict, VerdictKind } from './types';
import { anticommutes, isIdentity, multiply, symplecticProduct, toSymplecticRow, weight } from './pauli';
import { inSpan } from './gf2';
import { stabilizerBasis } from './codes';

/** Bit i = 1 iff p anticommutes with code.checks[i] (the alarm at station i rings). */
export function syndrome(code: StabilizerCode, p: Pauli): Syndrome {
  if (p.n !== code.n) throw new RangeError(`Pauli on ${String(p.n)} qubits does not fit code ${code.id} (n=${String(code.n)})`);
  const s = new Uint8Array(code.checks.length);
  code.checks.forEach((c, i) => {
    s[i] = symplecticProduct(c.pauli, p);
  });
  return s;
}

export function syndromeIsZero(s: Syndrome): boolean {
  for (let i = 0; i < s.length; i++) if ((s[i] ?? 0) !== 0) return false;
  return true;
}

/** Stable string key, e.g. "10000000". */
export function syndromeKey(s: Syndrome): string {
  let k = '';
  for (let i = 0; i < s.length; i++) k += (s[i] ?? 0) === 0 ? '0' : '1';
  return k;
}

export function syndromeToArray(s: Syndrome): number[] {
  return Array.from(s, (b) => (b === 0 ? 0 : 1));
}

export function syndromeFromArray(bits: readonly number[]): Syndrome {
  return Uint8Array.from(bits, (b) => (b === 0 ? 0 : 1));
}

/** Ids of the checks whose alarm rings. */
export function ringingChecks(code: StabilizerCode, s: Syndrome): string[] {
  const out: string[] = [];
  code.checks.forEach((c, i) => {
    if ((s[i] ?? 0) !== 0) out.push(c.id);
  });
  return out;
}

/** Residual R = C·E (XOR). */
export function residual(correction: Pauli, error: Pauli): Pauli {
  return multiply(correction, error);
}

/** Membership in the stabilizer group (up to phase): [x|z] in the GF(2) span of the generators. */
export function inStabilizerGroup(code: StabilizerCode, p: Pauli): boolean {
  if (p.n !== code.n) throw new RangeError(`Pauli on ${String(p.n)} qubits does not fit code ${code.id}`);
  if (code.checks.length === 0) return isIdentity(p);
  return inSpan(stabilizerBasis(code), toSymplecticRow(p));
}

/** Which logical operators the residual acts as. x[i] ⇔ anticommutes with logical Z_i; z[i] ⇔ anticommutes with logical X_i. */
export function logicalFlips(code: StabilizerCode, r: Pauli): { readonly x: boolean[]; readonly z: boolean[] } {
  return {
    x: code.logicalZ.map((l) => anticommutes(r, l.pauli)),
    z: code.logicalX.map((l) => anticommutes(r, l.pauli)),
  };
}

/** Classify a residual operator R. */
export function classify(code: StabilizerCode, r: Pauli): Verdict {
  const s = syndrome(code, r);
  const flips = logicalFlips(code, r);
  let kind: VerdictKind;
  if (!syndromeIsZero(s)) kind = 'detectable';
  else if (inStabilizerGroup(code, r)) kind = 'success';
  else kind = 'logical-error';
  return { kind, residual: r, syndrome: s, logicalFlip: flips, weight: weight(r) };
}

/** Convenience: verdict of correction C applied to (propagated) error E. */
export function evaluate(code: StabilizerCode, error: Pauli, correction: Pauli): Verdict {
  return classify(code, residual(correction, error));
}
