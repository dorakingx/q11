# Q11 quantum verification report

Generated 2026-10-10T02:01:23Z by `quantum/verify.py` (**PASS**).

Independent Python/Qiskit reference (`qollab/q11`, written from first principles) replayed the fixtures
emitted by the TypeScript engine, then cross-checked itself against `qiskit.quantum_info` and Aer.

| Item | Value |
|---|---|
| python | 3.12.3 |
| qiskit | 2.5.2 |
| qiskit_aer | 0.17.2 |
| qiskit_ionq | 1.1.1 |
| numpy | 2.5.3 |
| q11_python_engine | 1.0.0 |
| model | Clifford+Pauli educational model, perfect syndrome extraction, no measurement noise |
| total comparisons | 4749 |
| mismatches | 0 |

## Per section

| Section | Compared | Mismatches |
|---|---:|---:|
| codeInvariants | 4 | 0 |
| gates-exhaustive.json (symplectic) | 72 | 0 |
| propagation-1000.json (symplectic) | 1000 | 0 |
| rsc3-single.json (symplectic) | 28 | 0 |
| rsc3-logical.json (symplectic) | 52 | 0 |
| verdicts-1000.json (symplectic) | 1000 | 0 |
| missions.json expected (symplectic) | 6 | 0 |
| training captions (symplectic) | 4 | 0 |
| gates-exhaustive.json (qiskit Clifford evolve) | 72 | 0 |
| gates-exhaustive.json (qiskit Operator matrix) | 72 | 0 |
| propagation-1000.json (qiskit Clifford evolve) | 1000 | 0 |
| propagation-1000.json (qiskit Operator matrix) | 1000 | 0 |
| rsc3-single.json (qiskit StabilizerState, 6 eigenstates each) | 28 | 0 |
| rsc3-logical.json (qiskit StabilizerState, 6 eigenstates each) | 52 | 0 |
| verdicts-1000.json sample (every 5th, 200 cases) (qiskit StabilizerState, 6 eigenstates each) | 200 | 0 |
| logical eigenstate preparation (Aer statevector, all generators +1) | 24 | 0 |
| propagation missions (Aer statevector + Operator) | 42 | 0 |
| mission circuits on AerSimulator (shots=2000, deterministic syndrome + logical readout) | 45 | 0 |
| mission circuits serialize with qiskit-ionq (qis gateset, offline, no job) | 42 | 0 |
| mission circuits on qiskit BasicSimulator (Qollab built-in class, 200 shots) | 6 | 0 |

## Code invariants

```json
{
  "rsc3": {
    "n": 9,
    "k": 1,
    "checks": 8,
    "rank": 8,
    "hxHzTzero": true,
    "bruteForceDistance": 3,
    "geometryAgrees": true,
    "rankHx+rankHz": 8,
    "weight1Corrected": 28
  },
  "rep3": {
    "n": 3,
    "k": 1,
    "checks": 2,
    "rank": 2,
    "hxHzTzero": true,
    "xOnlyDistance": 3,
    "fullDistanceBruteForce": 1
  },
  "trivial2": {
    "n": 2,
    "k": 2,
    "checks": 0,
    "rank": 0,
    "hxHzTzero": true
  },
  "trivial3": {
    "n": 3,
    "k": 3,
    "checks": 0,
    "rank": 0,
    "hxHzTzero": true
  }
}
```

## Missions: fixture min-weight correction vs Python reference

| Mission | Syndrome | Fixture correction | Python reference | Exact | Stabilizer-equivalent | Verdict (fixture corr.) |
|---|---|---|---|---|---|---|
| first-alarm | 11 | `IXI` | `IXI` | yes | yes | success |
| red-forward-blue-backward | (none) | `YY` | `YY` | yes | yes | success |
| color-switch | (none) | `XZ` | `XZ` | yes | yes | success |
| blind-dispatch | 11000000 | `IIIIXIIII` | `IIIIXIIII` | yes | yes | success |
| two-kinds-of-trouble | 10100100 | `IXIIIIZII` | `IYIIZIIII` | no | no | success |
| silent-failure | 10000000 | `XIIIIIIII` | `XIIIIIIII` | yes | yes | logical-error |

Where the two decoders disagree the fixture correction was still verified to have minimum weight and the
right syndrome; the difference is tie-breaking between degenerate (and, for `two-kinds-of-trouble`,
*inequivalent*) minimum-weight explanations. Both candidates were run on Aer (see below).

## Mission runs on local ideal simulators (Aer 2000 shots; BasicSimulator 200 shots; seed 20261010)

All measurements at the end of the circuit (ancillas, then data). Source label: **Local (Aer)**. No cloud,
no QPU, no IonQ job was run by this script.

| Mission | Correction | Prep/readout | Qubits | Backend | Syndrome histogram | Logical bits | Predicted verdict | Pass |
|---|---|---|---:|---|---|---|---|---|
| first-alarm | `IXI` (reference (min-weight / predicted frame)) | 0/Z | 5 | AerSimulator | {"11": 2000} | ["0"] | success | yes |
| first-alarm | `IXI` (reference (min-weight / predicted frame)) | +/X | 5 | AerSimulator | {"11": 2000} | ["0"] | success | yes |
| first-alarm | `IXI` (reference (min-weight / predicted frame)) | +i/Y | 5 | AerSimulator | {"11": 2000} | ["0"] | success | yes |
| first-alarm | `III` (identity (no dispatch)) | 0/Z | 5 | AerSimulator | {"11": 2000} | ["0"] | detectable | yes |
| first-alarm | `III` (identity (no dispatch)) | +/X | 5 | AerSimulator | {"11": 2000} | ["0"] | detectable | yes |
| first-alarm | `III` (identity (no dispatch)) | +i/Y | 5 | AerSimulator | {"11": 2000} | ["0"] | detectable | yes |
| red-forward-blue-backward | `YY` (reference (min-weight / predicted frame)) | 0/Z | 2 | AerSimulator | {"": 2000} | ["0", "0"] | success | yes |
| red-forward-blue-backward | `YY` (reference (min-weight / predicted frame)) | +/X | 2 | AerSimulator | {"": 2000} | ["0", "0"] | success | yes |
| red-forward-blue-backward | `YY` (reference (min-weight / predicted frame)) | +i/Y | 2 | AerSimulator | {"": 2000} | ["0", "0"] | success | yes |
| red-forward-blue-backward | `II` (identity (no dispatch)) | 0/Z | 2 | AerSimulator | {"": 2000} | ["1", "0"] | logical-error | yes |
| red-forward-blue-backward | `II` (identity (no dispatch)) | +/X | 2 | AerSimulator | {"": 2000} | ["0", "1"] | logical-error | yes |
| red-forward-blue-backward | `II` (identity (no dispatch)) | +i/Y | 2 | AerSimulator | {"": 2000} | ["1", "1"] | logical-error | yes |
| color-switch | `XZ` (reference (min-weight / predicted frame)) | 0/Z | 2 | AerSimulator | {"": 2000} | ["0", "0"] | success | yes |
| color-switch | `XZ` (reference (min-weight / predicted frame)) | +/X | 2 | AerSimulator | {"": 2000} | ["0", "0"] | success | yes |
| color-switch | `XZ` (reference (min-weight / predicted frame)) | +i/Y | 2 | AerSimulator | {"": 2000} | ["0", "0"] | success | yes |
| color-switch | `II` (identity (no dispatch)) | 0/Z | 2 | AerSimulator | {"": 2000} | ["0", "0"] | logical-error | yes |
| color-switch | `II` (identity (no dispatch)) | +/X | 2 | AerSimulator | {"": 2000} | ["1", "0"] | logical-error | yes |
| color-switch | `II` (identity (no dispatch)) | +i/Y | 2 | AerSimulator | {"": 2000} | ["1", "0"] | logical-error | yes |
| blind-dispatch | `IIIIXIIII` (reference (min-weight / predicted frame)) | 0/Z | 17 | AerSimulator | {"11000000": 2000} | ["0"] | success | yes |
| blind-dispatch | `IIIIXIIII` (reference (min-weight / predicted frame)) | +/X | 17 | AerSimulator | {"11000000": 2000} | ["0"] | success | yes |
| blind-dispatch | `IIIIXIIII` (reference (min-weight / predicted frame)) | +i/Y | 17 | AerSimulator | {"11000000": 2000} | ["0"] | success | yes |
| blind-dispatch | `IIIIIIIII` (identity (no dispatch)) | 0/Z | 17 | AerSimulator | {"11000000": 2000} | ["0"] | detectable | yes |
| blind-dispatch | `IIIIIIIII` (identity (no dispatch)) | +/X | 17 | AerSimulator | {"11000000": 2000} | ["0"] | detectable | yes |
| blind-dispatch | `IIIIIIIII` (identity (no dispatch)) | +i/Y | 17 | AerSimulator | {"11000000": 2000} | ["0"] | detectable | yes |
| two-kinds-of-trouble | `IYIIZIIII` (reference (min-weight / predicted frame)) | 0/Z | 17 | AerSimulator | {"10100100": 2000} | ["0"] | logical-error | yes |
| two-kinds-of-trouble | `IYIIZIIII` (reference (min-weight / predicted frame)) | +/X | 17 | AerSimulator | {"10100100": 2000} | ["1"] | logical-error | yes |
| two-kinds-of-trouble | `IYIIZIIII` (reference (min-weight / predicted frame)) | +i/Y | 17 | AerSimulator | {"10100100": 2000} | ["1"] | logical-error | yes |
| two-kinds-of-trouble | `IIIIIIIII` (identity (no dispatch)) | 0/Z | 17 | AerSimulator | {"10100100": 2000} | ["0"] | detectable | yes |
| two-kinds-of-trouble | `IIIIIIIII` (identity (no dispatch)) | +/X | 17 | AerSimulator | {"10100100": 2000} | ["0"] | detectable | yes |
| two-kinds-of-trouble | `IIIIIIIII` (identity (no dispatch)) | +i/Y | 17 | AerSimulator | {"10100100": 2000} | ["0"] | detectable | yes |
| two-kinds-of-trouble | `IXIIIIIZI` (counterfactual: exact propagated error) | 0/Z | 17 | AerSimulator | {"10100100": 2000} | ["0"] | success | yes |
| two-kinds-of-trouble | `IXIIIIIZI` (counterfactual: exact propagated error) | +/X | 17 | AerSimulator | {"10100100": 2000} | ["0"] | success | yes |
| two-kinds-of-trouble | `IXIIIIIZI` (counterfactual: exact propagated error) | +i/Y | 17 | AerSimulator | {"10100100": 2000} | ["0"] | success | yes |
| two-kinds-of-trouble | `IXIIIIZII` (fixture min-weight correction (TS tie-break)) | 0/Z | 17 | AerSimulator | {"10100100": 2000} | ["0"] | success | yes |
| two-kinds-of-trouble | `IXIIIIZII` (fixture min-weight correction (TS tie-break)) | +/X | 17 | AerSimulator | {"10100100": 2000} | ["0"] | success | yes |
| two-kinds-of-trouble | `IXIIIIZII` (fixture min-weight correction (TS tie-break)) | +i/Y | 17 | AerSimulator | {"10100100": 2000} | ["0"] | success | yes |
| silent-failure | `XIIIIIIII` (reference (min-weight / predicted frame)) | 0/Z | 17 | AerSimulator | {"10000000": 2000} | ["1"] | logical-error | yes |
| silent-failure | `XIIIIIIII` (reference (min-weight / predicted frame)) | +/X | 17 | AerSimulator | {"10000000": 2000} | ["0"] | logical-error | yes |
| silent-failure | `XIIIIIIII` (reference (min-weight / predicted frame)) | +i/Y | 17 | AerSimulator | {"10000000": 2000} | ["1"] | logical-error | yes |
| silent-failure | `IIIIIIIII` (identity (no dispatch)) | 0/Z | 17 | AerSimulator | {"10000000": 2000} | ["0"] | detectable | yes |
| silent-failure | `IIIIIIIII` (identity (no dispatch)) | +/X | 17 | AerSimulator | {"10000000": 2000} | ["0"] | detectable | yes |
| silent-failure | `IIIIIIIII` (identity (no dispatch)) | +i/Y | 17 | AerSimulator | {"10000000": 2000} | ["0"] | detectable | yes |
| silent-failure | `IXXIIIIII` (counterfactual: exact propagated error) | 0/Z | 17 | AerSimulator | {"10000000": 2000} | ["0"] | success | yes |
| silent-failure | `IXXIIIIII` (counterfactual: exact propagated error) | +/X | 17 | AerSimulator | {"10000000": 2000} | ["0"] | success | yes |
| silent-failure | `IXXIIIIII` (counterfactual: exact propagated error) | +i/Y | 17 | AerSimulator | {"10000000": 2000} | ["0"] | success | yes |
| first-alarm | `IXI` (reference (min-weight / predicted frame)) | 0/Z | 5 | qiskit BasicSimulator | {"11": 200} | ["0"] | success | yes |
| red-forward-blue-backward | `YY` (reference (min-weight / predicted frame)) | 0/Z | 2 | qiskit BasicSimulator | {"": 200} | ["0", "0"] | success | yes |
| color-switch | `XZ` (reference (min-weight / predicted frame)) | 0/Z | 2 | qiskit BasicSimulator | {"": 200} | ["0", "0"] | success | yes |
| blind-dispatch | `IIIIXIIII` (reference (min-weight / predicted frame)) | 0/Z | 17 | qiskit BasicSimulator | {"11000000": 200} | ["0"] | success | yes |
| two-kinds-of-trouble | `IYIIZIIII` (reference (min-weight / predicted frame)) | 0/Z | 17 | qiskit BasicSimulator | {"10100100": 200} | ["0"] | logical-error | yes |
| silent-failure | `XIIIIIIII` (reference (min-weight / predicted frame)) | 0/Z | 17 | qiskit BasicSimulator | {"10000000": 200} | ["1"] | logical-error | yes |

## What is NOT verified here

- No IonQ simulator or hardware result: those runs happen inside Qollab (one job per Run) and are recorded separately, labelled Live/Cached.
- No measurement noise, no non-Clifford gates, no coherent errors: the model is Clifford + Pauli with perfect syndrome extraction.
- Counts agreement is evidence under the ideal model, not a proof of circuit equivalence; the exact checks are the algebraic ones above.

## Commands

```
npm run verify:quantum          # gen-fixtures -> sync data -> this script
.venv/bin/python quantum/verify.py
```
