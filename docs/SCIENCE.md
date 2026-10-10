# Q11 science notes — what the game computes and why it is correct

## 1. Pauli frames
An n-qubit Pauli operator (up to phase) is a pair of bit vectors (x, z) ∈ GF(2)^n × GF(2)^n:
X_i ↔ x_i = 1, Z_i ↔ z_i = 1, Y_i ↔ x_i = z_i = 1. The product of two Paulis is the **XOR** of their vectors
(phases dropped). Hence applying the same correction twice cancels, and a correction on a burning house puts the fire out:
X·X = I. "Fires overlapping" is therefore XOR, never OR.

Two Paulis commute iff their symplectic product Σ_i (a.x_i b.z_i + a.z_i b.x_i) is 0 mod 2.

## 2. Propagation through Clifford gates
A Pauli frame P before an ideal Clifford gate U becomes U P U† after it (the error is tracked relative to the ideal
computation). In symplectic form:
- H on q: swap x_q ↔ z_q (X ↔ Z; Y stays Y).
- S on q: z_q ^= x_q (X → Y, Y → X, Z → Z).
- CNOT(c→t): x_t ^= x_c (X on the control copies to the target: "red moves forward"), z_c ^= z_t (Z on the target copies to the control: "blue moves backward").
- CZ(a,b): z_a ^= x_b, z_b ^= x_a. SWAP: exchange both bits.
Propagation happens **only** through gates. Entanglement or proximity alone never spreads a Pauli.

## 3. Stabilizer codes used
**Repetition code (rep3)** — generators Z0Z1, Z1Z2; logical X̄ = XXX, Z̄ = Z0. Detects/corrects a single X; a single Z is
*undetectable* (syndrome 0) and acts as logical Z. The game introduces alarms with it and says it protects against X only.

**Distance-3 rotated surface code (rsc3)** — 9 data qubits q = 3·row + col:
```
q0 q1 q2        Z checks: Z0 {0,1,3,4}  Z1 {4,5,7,8}  Z2 {1,2}  Z3 {6,7}
q3 q4 q5        X checks: X0 {1,2,4,5}  X1 {3,4,6,7}  X2 {0,3}  X3 {5,8}
q6 q7 q8        X̄ = X0 X1 X2  (top row)   Z̄ = Z0 Z3 Z6  (left column)
```
Machine-verified properties (src/quantum tests + Python/Qiskit cross-check): every X check shares an even number of
qubits with every Z check (H_X H_Z^T = 0); the 8 generators are independent (rank 8 ⇒ k = 1); X̄ and Z̄ commute with all
checks, anticommute with each other and are not in the group; the minimum weight of a non-trivial logical operator is 3.

A **check rings** iff the error anticommutes with it. For CSS codes: an X error on q flips the Z checks containing q;
a Z error flips the X checks containing q; Y flips both. Weight-1 syndromes:
```
X on q:  q0 Z0 | q1 Z0 Z2 | q2 Z2 | q3 Z0 | q4 Z0 Z1 | q5 Z1 | q6 Z3 | q7 Z1 Z3 | q8 Z1
Z on q:  q0 X2 | q1 X0    | q2 X0 | q3 X1 X2 | q4 X0 X1 | q5 X0 X3 | q6 X1 | q7 X1 | q8 X3
```
Pairs with identical syndromes (X0~X3, X5~X8, Z1~Z2, Z6~Z7) differ by a weight-2 stabilizer, so correcting either
member succeeds. This degeneracy is why the game accepts stabilizer-equivalent dispatches as full success.

## 4. Verdict
Given the true error E and the committed correction C, the residual is R = C·E (XOR). With the generators' symplectic
rows forming a matrix S over GF(2):
- **success** — R ∈ rowspan(S) (R is a stabilizer, acts trivially on the code space up to phase);
- **logical error** — R commutes with every generator but R ∉ rowspan(S); the logical action is read off by
  anticommutation with Z̄ (⇒ logical X flip) and X̄ (⇒ logical Z flip);
- **detectable** — R anticommutes with some generator (alarms still ring).
This is decided by linear algebra, not by a single state's fidelity — a logical Z, for instance, leaves |0̄⟩ untouched
and would be missed by a fidelity test on that state alone. The Python reference additionally checks all six logical
eigenstates (±X̄, ±Ȳ, ±Z̄) with Qiskit's StabilizerState.

## 5. Decoding and Mission 6
The Why? screen compares the player's dispatch with a minimum-weight lookup decoder (brute force over all Paulis, cached).
For syndrome {Z0} alone the minimum-weight explanation is X on q0 (or q3). If the true error was X1X2 (weight 2), that
correction yields R = X0X1X2 = X̄: all alarms silent, logical qubit flipped. A distance-3 code guarantees correction of
one error; two errors can defeat *any* decoder — the game scores the call as optimal and the outcome as unlucky.

## 6. What the circuits on Qollab do
For a mission with error E and chosen correction C: prepare a logical eigenstate (|0̄⟩ via a Clifford that maps Z_i to the
stabilizer generators + Z̄, or |+̄⟩ for Z-type lessons), apply E as X/Y/Z gates, extract every check with one ancilla
(Z check: data→ancilla CNOTs; X check: H–CNOT–H), apply C, then measure ancillas and data. The ancilla bits reproduce the
syndrome of E; the data bits give, for the checks whose qubits were all measured in that check's basis (all four Z checks
under Z-basis readout), the residual's check parities, plus the logical readout — matching the GF(2) verdict.
Counts under IonQ's noise-model simulators deviate statistically; the algebra, not the histogram, is the proof.

## 7. Scope
Clifford + Pauli, perfect syndromes, no measurement noise, no hook-error dynamics in the web game, no QPU runs.
