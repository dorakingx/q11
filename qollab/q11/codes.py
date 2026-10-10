"""Stabilizer codes used by Q11, loaded from ``q11/data/codes.json`` and cross-checked against an
independent, hard-coded geometric construction of the distance-3 rotated surface code.

Data-file paths are plain string literals (a Qollab requirement for bundled project files).
"""

from __future__ import annotations

import json
import os

from . import gf2
from .pauli import Pauli

CODES_PATH = "q11/data/codes.json"
MISSIONS_PATH = "q11/data/missions.json"


def _read_data(literal_path: str) -> str:
    """Open a bundled data file. In Qollab the project root is the working directory so the literal
    relative path works; when imported from elsewhere (quantum/verify.py) fall back to the package dir."""
    try:
        with open(literal_path, "r", encoding="utf-8") as fh:
            return fh.read()
    except OSError:
        here = os.path.dirname(os.path.abspath(__file__))
        with open(os.path.join(here, "data", os.path.basename(literal_path)), "r", encoding="utf-8") as fh:
            return fh.read()


class Check:
    __slots__ = ("id", "type", "qubits", "pauli")

    def __init__(self, cid: str, ctype: str, qubits, n: int):
        if ctype not in ("X", "Z"):
            raise ValueError("check type must be X or Z")
        self.id = cid
        self.type = ctype
        self.qubits = tuple(sorted(int(q) for q in qubits))
        self.pauli = Pauli.from_support(n, ctype, self.qubits)

    def __repr__(self):
        return "Check(%s %s %s)" % (self.id, self.type, list(self.qubits))


class StabilizerCode:
    """CSS stabilizer code given by independent generators (Z checks first, then X checks)."""

    def __init__(self, cid: str, name: str, n: int, k: int, distance: int, checks, logical_x, logical_z, noise_note=""):
        self.id = cid
        self.name = name
        self.n = int(n)
        self.k = int(k)
        self.distance = int(distance)
        self.checks = list(checks)
        self.logical_x = [Pauli.from_string(s) if isinstance(s, str) else s for s in logical_x]
        self.logical_z = [Pauli.from_string(s) if isinstance(s, str) else s for s in logical_z]
        self.noise_note = noise_note
        self._stab_rows = [c.pauli.symplectic() for c in self.checks]
        self.validate()

    # ---- invariants ----------------------------------------------------------------------------
    def validate(self) -> None:
        n = self.n
        for c in self.checks:
            if c.pauli.n != n:
                raise ValueError("check %s has wrong size" % c.id)
        for a in self.checks:
            for b in self.checks:
                if not a.pauli.commutes(b.pauli):
                    raise ValueError("checks %s and %s anticommute" % (a.id, b.id))
        r = gf2.rank(self._stab_rows) if self.checks else 0
        if r != len(self.checks):
            raise ValueError("checks are not independent (rank %d of %d)" % (r, len(self.checks)))
        if n - r != self.k:
            raise ValueError("k mismatch: n - rank = %d, declared %d" % (n - r, self.k))
        if len(self.logical_x) != self.k or len(self.logical_z) != self.k:
            raise ValueError("need k logical X and k logical Z operators")
        for i in range(self.k):
            for j in range(self.k):
                lx, lz = self.logical_x[i], self.logical_z[j]
                for c in self.checks:
                    if not lx.commutes(c.pauli) or not lz.commutes(c.pauli):
                        raise ValueError("logical operator anticommutes with check %s" % c.id)
                want_anti = i == j
                if lx.anticommutes(lz) != want_anti:
                    raise ValueError("logical X%d / Z%d commutation wrong" % (i, j))
                if i != j and not self.logical_x[i].commutes(self.logical_x[j]):
                    raise ValueError("logical X operators must commute")
            if self.in_stabilizer_group(self.logical_x[i]) or self.in_stabilizer_group(self.logical_z[i]):
                raise ValueError("logical operator is a stabilizer")

    def css_matrices(self):
        """(H_X, H_Z) as lists of rows over data qubits; H_X · H_Z^T = 0 is a validate() consequence."""
        hx = [[1 if q in c.qubits else 0 for q in range(self.n)] for c in self.checks if c.type == "X"]
        hz = [[1 if q in c.qubits else 0 for q in range(self.n)] for c in self.checks if c.type == "Z"]
        return hx, hz

    # ---- group membership -----------------------------------------------------------------------
    def in_stabilizer_group(self, p: Pauli) -> bool:
        """R in <checks> over GF(2) (phases ignored). For codes with no checks the group is {I}."""
        return gf2.in_span(self._stab_rows, p.symplectic())

    def stabilizer_decomposition(self, p: Pauli):
        """Which generators multiply to ``p`` (list of 0/1 per check), or None."""
        return gf2.solve(self._stab_rows, p.symplectic())

    def min_distance_bruteforce(self) -> int:
        """Smallest weight of a Pauli that commutes with every check but is not in the group."""
        from itertools import combinations, product

        from .verdict import syndrome

        for w in range(1, self.n + 1):
            for qubits in combinations(range(self.n), w):
                for letters in product("XYZ", repeat=w):
                    xs, zs = [0] * self.n, [0] * self.n
                    for q, l in zip(qubits, letters):
                        xs[q], zs[q] = {"X": (1, 0), "Y": (1, 1), "Z": (0, 1)}[l]
                    p = Pauli(xs, zs)
                    if not any(syndrome(self, p)) and not self.in_stabilizer_group(p):
                        return w
        return self.n + 1

    def __repr__(self):
        return "StabilizerCode(%s n=%d k=%d d=%d checks=%d)" % (self.id, self.n, self.k, self.distance, len(self.checks))


# ---- JSON loading -------------------------------------------------------------------------------------

_CACHE = {}


def load_codes_json() -> dict:
    return json.loads(_read_data(CODES_PATH))


def code_from_json(cid: str, obj: dict) -> StabilizerCode:
    n = int(obj["n"])
    checks = [Check(c["id"], c["type"], c["qubits"], n) for c in obj["checks"]]
    return StabilizerCode(cid, obj.get("name", cid), n, obj["k"], obj["distance"], checks, obj["logicalX"], obj["logicalZ"], obj.get("noiseNote", ""))


def get_code(cid: str) -> StabilizerCode:
    if cid not in _CACHE:
        data = load_codes_json()
        if cid not in data:
            raise KeyError("unknown code %r" % cid)
        _CACHE[cid] = code_from_json(cid, data[cid])
        if cid == "rsc3":
            assert_rsc3_matches_geometry(_CACHE[cid])
    return _CACHE[cid]


def all_codes():
    return {cid: get_code(cid) for cid in load_codes_json()}


# ---- independent geometric construction of the d=3 rotated surface code --------------------------------

def rotated_surface_code_geometry(d: int = 3):
    """Build the rotated surface code of odd distance ``d`` from its plaquette geometry.

    Data qubit at (row, col) has index ``d*row + col``. Faces are indexed by their top-left corner
    (i, j) with i, j in {-1, ..., d-1}; face (i, j) touches the in-bounds qubits among rows i, i+1 and
    cols j, j+1. Bulk faces alternate like a checkerboard: (i + j) even -> Z plaquette, odd -> X plaquette.
    Boundary half-plaquettes are kept only where their type matches the boundary: top/bottom edges carry
    Z-type weight-2 checks and left/right edges carry X-type weight-2 checks (the corner faces, weight 1,
    are never checks). Logical Z = a Z string down the first column (links the two Z boundaries),
    logical X = an X string along the first row (links the two X boundaries).
    Returns (checks as (type, qubits, is_boundary, i, j) tuples, logical_x string, logical_z string).
    """
    checks = []
    for i in range(-1, d):
        for j in range(-1, d):
            qubits = []
            for r in (i, i + 1):
                for c in (j, j + 1):
                    if 0 <= r < d and 0 <= c < d:
                        qubits.append(d * r + c)
            ctype = "Z" if (i + j) % 2 == 0 else "X"
            bulk = len(qubits) == 4
            if bulk:
                checks.append((ctype, tuple(sorted(qubits)), False, i, j))
                continue
            if len(qubits) != 2:
                continue  # corner (weight 1) or outside: not a check
            on_top_or_bottom = i == -1 or i == d - 1
            on_left_or_right = j == -1 or j == d - 1
            if on_top_or_bottom and ctype == "Z":
                checks.append((ctype, tuple(sorted(qubits)), True, i, j))
            elif on_left_or_right and ctype == "X":
                checks.append((ctype, tuple(sorted(qubits)), True, i, j))
    # Order like the shared JSON: Z before X, bulk before boundary, then row-major by face corner.
    checks.sort(key=lambda t: (0 if t[0] == "Z" else 1, 1 if t[2] else 0, t[3], t[4]))
    lx = "".join("X" if q < d else "I" for q in range(d * d))
    lz = "".join("Z" if q % d == 0 else "I" for q in range(d * d))
    return checks, lx, lz


def rsc3_from_geometry() -> StabilizerCode:
    geo, lx, lz = rotated_surface_code_geometry(3)
    counters = {"Z": 0, "X": 0}
    checks = []
    for ctype, qubits, _b, _i, _j in geo:
        checks.append(Check("%s%d" % (ctype, counters[ctype]), ctype, qubits, 9))
        counters[ctype] += 1
    return StabilizerCode("rsc3", "Distance-3 rotated surface code (geometry)", 9, 1, 3, checks, [lx], [lz])


def assert_rsc3_matches_geometry(code: StabilizerCode) -> None:
    """The JSON definition must agree with the geometric construction, check by check and as a group."""
    geo = rsc3_from_geometry()
    if len(geo.checks) != len(code.checks):
        raise AssertionError("rsc3: %d checks in JSON, %d from geometry" % (len(code.checks), len(geo.checks)))
    for a, b in zip(code.checks, geo.checks):
        if (a.id, a.type, a.qubits) != (b.id, b.type, b.qubits):
            raise AssertionError("rsc3 check mismatch: JSON %r vs geometry %r" % (a, b))
    for p in geo.checks:
        if not code.in_stabilizer_group(p.pauli):
            raise AssertionError("geometry check %s not in JSON group" % p.id)
    if [str(p) for p in code.logical_x] != [str(p) for p in geo.logical_x]:
        raise AssertionError("rsc3 logical X mismatch")
    if [str(p) for p in code.logical_z] != [str(p) for p in geo.logical_z]:
        raise AssertionError("rsc3 logical Z mismatch")
    hx, hz = code.css_matrices()
    for rx in hx:
        for rz in hz:
            if sum(a & b for a, b in zip(rx, rz)) % 2:
                raise AssertionError("H_X H_Z^T != 0")
    if gf2.rank(hx) + gf2.rank(hz) != 8:
        raise AssertionError("rank(H_X) + rank(H_Z) != 8")
