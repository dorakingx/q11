"""Minimum-weight lookup decoder: for every syndrome, the lowest-weight Pauli producing it.

Ties are broken by enumeration order (ascending qubit tuples, then letters X, Y, Z). Two min-weight
corrections for the same syndrome may differ by a stabilizer (degenerate pairs such as X0 ~ X3 in rsc3);
the comparison code treats those as equivalent.
"""

from __future__ import annotations

from itertools import combinations, product

from .codes import StabilizerCode
from .pauli import Pauli
from .verdict import syndrome, syndrome_string

_TABLES = {}


def build_lookup(code: StabilizerCode) -> dict:
    """Map syndrome string -> Pauli, filled in increasing weight until all 2^m syndromes are covered
    (or weight n is exhausted; syndromes never produced stay absent)."""
    m = len(code.checks)
    table = {syndrome_string([0] * m): Pauli.identity(code.n)}
    total = 1 << m
    for w in range(1, code.n + 1):
        if len(table) == total:
            break
        for qubits in combinations(range(code.n), w):
            for letters in product("XYZ", repeat=w):
                p = Pauli.identity(code.n)
                xs, zs = [0] * code.n, [0] * code.n
                for q, l in zip(qubits, letters):
                    xs[q], zs[q] = {"X": (1, 0), "Y": (1, 1), "Z": (0, 1)}[l]
                p = Pauli(xs, zs)
                key = syndrome_string(syndrome(code, p))
                if key not in table:
                    table[key] = p
    return table


def lookup_table(code: StabilizerCode) -> dict:
    if code.id not in _TABLES:
        _TABLES[code.id] = build_lookup(code)
    return _TABLES[code.id]


def decode(code: StabilizerCode, syn) -> Pauli:
    """Decoder input is ONLY the syndrome and the public code."""
    key = syndrome_string(syn)
    table = lookup_table(code)
    if key not in table:
        raise KeyError("syndrome %s has no explanation in code %s" % (key, code.id))
    return table[key]


def equivalent_corrections(code: StabilizerCode, a: Pauli, b: Pauli) -> bool:
    """Same action on the code space: a xor b is a stabilizer."""
    return code.in_stabilizer_group(a.compose(b))
