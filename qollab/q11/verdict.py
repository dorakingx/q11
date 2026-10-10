"""Syndromes, verdicts and logical flips. Pure GF(2) reasoning — never 'syndrome == 0' alone."""

from __future__ import annotations

from .codes import StabilizerCode
from .pauli import Pauli

SUCCESS = "success"
LOGICAL_ERROR = "logical-error"
DETECTABLE = "detectable"


def syndrome(code: StabilizerCode, p: Pauli):
    """0/1 per check in ``code.checks`` order; 1 iff the check anticommutes with ``p``."""
    return [0 if c.pauli.commutes(p) else 1 for c in code.checks]


def syndrome_string(bits) -> str:
    return "".join(str(int(b)) for b in bits)


def logical_flips(code: StabilizerCode, r: Pauli):
    """x[i] = True iff r anticommutes with logical Z_i (r acts like logical X_i);
    z[i] = True iff r anticommutes with logical X_i (acts like logical Z_i). Only meaningful when r
    commutes with every check (otherwise the state is not in the code space any more)."""
    return {
        "x": [r.anticommutes(lz) for lz in code.logical_z],
        "z": [r.anticommutes(lx) for lx in code.logical_x],
    }


def classify(code: StabilizerCode, residual: Pauli):
    """Return (kind, syndromeR, logicalFlip)."""
    syn = syndrome(code, residual)
    if any(syn):
        return DETECTABLE, syn, logical_flips(code, residual)
    if code.in_stabilizer_group(residual):
        return SUCCESS, syn, {"x": [False] * code.k, "z": [False] * code.k}
    return LOGICAL_ERROR, syn, logical_flips(code, residual)


def evaluate(code: StabilizerCode, error: Pauli, correction: Pauli, circuit=None) -> dict:
    """Full verdict of a dispatch: E (optionally propagated through ``circuit``), C, R = C xor E'."""
    from .pauli import propagate

    propagated = propagate(error, circuit) if circuit else error
    residual = correction.compose(propagated)
    kind, syn_r, flips = classify(code, residual)
    return {
        "error": str(error),
        "propagated": str(propagated),
        "correction": str(correction),
        "residual": str(residual),
        "residualWeight": residual.weight(),
        "syndromeE": syndrome(code, propagated),
        "syndromeR": syn_r,
        "verdict": kind,
        "logicalFlip": flips,
    }
