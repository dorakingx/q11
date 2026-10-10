"""Q11 — Quantum Emergency Response: independent Python/Qiskit reference engine.

Pure Python (standard library + numpy + qiskit). This package ships unchanged inside the Qollab project
(``qollab/``) and is also what ``quantum/verify.py`` uses to cross-check the TypeScript engine.

Conventions (shared with ``fixtures/README.md``):
  * Pauli strings are **qubit-0-first**: ``"XIZ"`` = X on q0, I on q1, Z on q2. This is the reverse of
    Qiskit's label order; :func:`q11.pauli.to_qiskit_label` / :func:`q11.pauli.from_qiskit_label` convert.
  * A Pauli is a binary symplectic pair ``(x, z)``; Y has both bits set. Composition is XOR. Global phase
    is dropped for *error frames* but kept for the reference states / stabilizer signs where it matters.
  * Propagation happens only through gates (H, S, CNOT, CZ, SWAP), Heisenberg-style conjugation
    ``E' = U E U^dagger`` so that ``U E |psi> = E' U |psi>`` (up to phase).
  * Perfect-syndrome model; Clifford + Pauli educational simulation. Nothing here claims to model
    non-Clifford, coherent or hardware noise.
"""

__version__ = "1.0.0"
ENGINE_VERSION = "1"
