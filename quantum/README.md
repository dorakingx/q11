# quantum/ — independent Python/Qiskit reference and comparison

This directory holds the **independent** reference implementation that the TypeScript engine
(`src/quantum`) is checked against. The Python engine lives in `qollab/q11/` (pure Python + numpy +
qiskit, the same package that ships inside the Qollab project); `quantum/verify.py` drives it.

## Run

```bash
npm run verify:quantum                 # gen-fixtures (TS) → sync data → .venv → quantum/verify.py
.venv/bin/python quantum/verify.py     # comparison only (fixtures must already exist)
node scripts/sync-qollab-data.mjs      # copy fixtures/*.json → qollab/q11/data and verify byte equality
node scripts/sync-qollab-data.mjs --check
```

Environment: `uv venv --python 3.12 .venv && uv pip install --python .venv/bin/python -r quantum/requirements.txt`
(qiskit 2.5.2, qiskit-aer 0.17.2, qiskit-ionq 1.1.1, numpy 2.x). `verify-quantum.mjs` creates the venv if missing.

Outputs: `reports/quantum-verification.json` (machine-readable: versions, totals, per-section counts, Aer
runs with circuit hashes) and `reports/QUANTUM_VERIFICATION.md` (summary). Exit code 1 on any mismatch.

## What is compared

| Layer | Input | Independent check |
|---|---|---|
| Code definitions | `fixtures/codes.json` | Hard-coded plaquette geometry of the d=3 rotated surface code must reproduce every check, the logical operators, `H_X H_Z^T = 0`, rank 8, brute-force distance 3, 28/28 weight-≤1 patterns corrected. rep3: distance 3 against X noise only, distance 1 overall (documented). |
| Gate propagation | `cases/gates-exhaustive.json` (72), `cases/propagation-1000.json` (1000, seed 20261010) | (1) pure-Python symplectic rules derived from Heisenberg conjugation; (2) `qiskit.quantum_info.Pauli.evolve(Clifford(U), frame='s')`; (3) dense matrices `U·E·U†` vs `E'` up to global phase. |
| Verdicts | `cases/rsc3-single.json` (28), `cases/rsc3-logical.json` (52), `cases/verdicts-1000.json` (1000) | GF(2): syndrome of E, residual `R = C ⊕ E`, syndrome of R, group membership, logical flips, weight — every field in the fixture. |
| Verdicts on real states | same files; the 1000 random verdicts sampled every 5th (200) | `StabilizerState` of **all six** logical eigenstates (0, 1, +, −, +i, −i): evolve by E, read the syndrome from check expectation values, evolve by C, confirm residual syndrome and that the state's own logical operator flips exactly as predicted. |
| Missions | `fixtures/missions.json` `expected` | Syndrome, propagated error, verdict of the fixture's min-weight correction, that correction's weight and syndrome; training captions of the form "XI becomes XX" are checked as science claims. |
| State preparation | — | Clifford synthesis of each logical eigenstate; Aer statevector confirms every generator (checks + signed logical) has expectation +1 (4 codes × 6 states). |
| Propagation missions | missions 2, 3 (challenge + training) | Aer statevector: `U·E|ψ⟩ ≡ E'·U|ψ⟩` up to phase for all six eigenstates; plus the operator identity. |
| Full mission circuits | all 6 missions | `build_mission_circuit` on `AerSimulator`, 2000 shots (plus the reference correction on qiskit's `BasicSimulator`, the class behind Qollab's built-in backend, and an offline `qiskit_ionq` qis-gateset serialization of every circuit: no job, no network), for the reference correction, the identity, the exact-error counterfactual and (mission 5) the TS tie-break candidate; prep/readout (0,Z), (+,X), (+i,Y). The ancilla syndrome histogram must be a single key equal to the prediction and the logical readout deterministic and equal to the predicted bit. |

Totals are printed to stdout and written to the JSON report (4749 comparisons, 51 local simulator runs at the time of writing; ~100 s, of which most is qiskit's pure-Python BasicSimulator on 17 qubits).

## Conventions

- **Qubit order.** All Q11 Pauli strings are qubit-0-first (`"XIZ"` = X on q0). Qiskit labels are the
  reverse; `Pauli.to_qiskit_label()` / `from_qiskit_label()` convert. Counts keys from Qiskit have classical
  bit 0 on the right; `circuits.split_key` reverses them. A mission circuit uses a single classical register:
  bits `0..m-1` = ancilla of `code.checks[j]`, bits `m..m+n-1` = data qubit q.
- **Propagation direction.** `E' = U E U†` so that `U E|ψ⟩ = E' U|ψ⟩`. In Qiskit that is
  `Pauli.evolve(Clifford(U), frame='s')` (Schrödinger); `frame='h'` is the inverse map.
- **Phase.** Error frames drop global phase (bits only). Signs of stabilizer generators are kept where
  they matter: the logical −1 eigenstates are prepared from `-X̄`, `-Z̄`, `-Ȳ`, and `Ȳ = i·X̄·Z̄` is computed
  with qiskit's phase-tracking Pauli (rsc3: `YXXZIIZII`, phase +1).
- **Verdict.** Success ⇔ `R ∈ ⟨checks⟩` over GF(2); logical error ⇔ R commutes with all checks but
  `R ∉ ⟨checks⟩`; detectable ⇔ R anticommutes with some check. Never "syndrome == 0" alone.
- **Decoder.** Minimum-weight lookup over the syndrome only. Ties are broken by enumeration order, which
  differs from the TypeScript decoder; the comparison therefore checks weight, syndrome, verdict of the
  fixture's correction and stabilizer-equivalence, and records exact-string agreement separately. Mission 5's
  syndrome (`Z0, Z2, X1`) has two *inequivalent* weight-2 explanations (`X1·Z6` and `Y1·Z4`); the second is a
  logical-Z error for the true fire `X1·Z7`. Both were run on Aer and behave as predicted.
- **Mission circuit.** prep → E → mission gates U → syndrome extraction (one fresh ancilla per check:
  Z check = CNOT data→ancilla; X check = H, CNOT ancilla→data, H) → correction C → U† (propagation
  missions only, so the readout compares against the known input eigenstate) → measure ancillas, then data.
  No mid-circuit measurement, reset or feed-forward, so it runs unchanged on every Qollab backend.
  The residual seen at readout in propagation missions is R pulled back through U†; `predict()` reports both.

## What is NOT verified

- Nothing here runs on IonQ simulators or hardware; those runs happen inside Qollab (one job per Run) and are
  recorded and labelled separately (Live / Cached). This script's Aer results are **Local**.
- The model is Clifford + Pauli with perfect syndrome extraction. No measurement noise, no non-Clifford
  gates, no coherent or hardware noise is modelled or claimed.
- Shot counts agreeing with a prediction is evidence under the ideal model, not a proof of circuit
  equivalence; the exact statements are the algebraic checks (GF(2), Clifford, Operator, StabilizerState).
- `rep3` is an X-noise-only introduction: a single Z error is a logical error and is reported as such.
