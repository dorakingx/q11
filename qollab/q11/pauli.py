"""Binary symplectic Pauli operators, XOR composition, commutation and Clifford gate propagation.

Written from first principles (Heisenberg conjugation of X and Z by each gate) — deliberately NOT copied
from the TypeScript engine, so that a disagreement between the two is meaningful.

Derivations (each gate U maps a Pauli P to U P U^dagger; a general Pauli is a product of X's and Z's, so
knowing the images of X_i and Z_i fixes the image of everything, phases dropped):

  H:        X -> Z,  Z -> X                        => swap x and z bits
  S:        X -> Y,  Z -> Z                        => z ^= x       (Y = X·Z has both bits)
  CNOT(c,t):X_c -> X_c X_t,  X_t -> X_t,
            Z_c -> Z_c,       Z_t -> Z_c Z_t        => x[t] ^= x[c],  z[c] ^= z[t]
  CZ(a,b):  X_a -> X_a Z_b,  X_b -> Z_a X_b,
            Z_a -> Z_a,       Z_b -> Z_b            => z[b] ^= x[a],  z[a] ^= x[b]
  SWAP(a,b): exchange both bits of a and b
"""

from __future__ import annotations

LETTERS = {(0, 0): "I", (1, 0): "X", (1, 1): "Y", (0, 1): "Z"}
BITS = {"I": (0, 0), "X": (1, 0), "Y": (1, 1), "Z": (0, 1)}


class Pauli:
    """A Pauli operator on ``n`` qubits as two lists of 0/1 ints. Immutable by convention."""

    __slots__ = ("n", "x", "z")

    def __init__(self, x, z):
        x = [int(b) & 1 for b in x]
        z = [int(b) & 1 for b in z]
        if len(x) != len(z):
            raise ValueError("x and z must have the same length")
        self.n = len(x)
        self.x = tuple(x)
        self.z = tuple(z)

    # ---- construction -------------------------------------------------------------------------
    @classmethod
    def identity(cls, n: int) -> "Pauli":
        return cls([0] * n, [0] * n)

    @classmethod
    def from_string(cls, s: str) -> "Pauli":
        """Qubit-0-first string, e.g. ``"XIZ"``."""
        xs, zs = [], []
        for ch in s:
            if ch not in BITS:
                raise ValueError("bad Pauli letter %r in %r" % (ch, s))
            bx, bz = BITS[ch]
            xs.append(bx)
            zs.append(bz)
        return cls(xs, zs)

    @classmethod
    def single(cls, n: int, qubit: int, letter: str) -> "Pauli":
        xs, zs = [0] * n, [0] * n
        xs[qubit], zs[qubit] = BITS[letter]
        return cls(xs, zs)

    @classmethod
    def from_support(cls, n: int, letter: str, qubits) -> "Pauli":
        xs, zs = [0] * n, [0] * n
        bx, bz = BITS[letter]
        for q in qubits:
            xs[q], zs[q] = bx, bz
        return cls(xs, zs)

    # ---- representation -----------------------------------------------------------------------
    def to_string(self) -> str:
        return "".join(LETTERS[(self.x[i], self.z[i])] for i in range(self.n))

    def letter(self, i: int) -> str:
        return LETTERS[(self.x[i], self.z[i])]

    def __str__(self) -> str:
        return self.to_string()

    def __repr__(self) -> str:
        return "Pauli(%r)" % self.to_string()

    def __eq__(self, other) -> bool:
        return isinstance(other, Pauli) and self.x == other.x and self.z == other.z

    def __hash__(self) -> int:
        return hash((self.x, self.z))

    def symplectic(self):
        """Row vector ``x || z`` over GF(2), length 2n (used by gf2 / codes)."""
        return list(self.x) + list(self.z)

    @classmethod
    def from_symplectic(cls, row) -> "Pauli":
        n = len(row) // 2
        return cls(row[:n], row[n:])

    # ---- algebra ------------------------------------------------------------------------------
    def compose(self, other: "Pauli") -> "Pauli":
        """Product up to phase: bitwise XOR (so P·P = I)."""
        if other.n != self.n:
            raise ValueError("size mismatch")
        return Pauli([a ^ b for a, b in zip(self.x, other.x)], [a ^ b for a, b in zip(self.z, other.z)])

    __xor__ = compose
    __mul__ = compose

    def commutes(self, other: "Pauli") -> bool:
        """Symplectic inner product: sum_i (x_i z'_i + z_i x'_i) mod 2 == 0."""
        acc = 0
        for i in range(self.n):
            acc ^= (self.x[i] & other.z[i]) ^ (self.z[i] & other.x[i])
        return acc == 0

    def anticommutes(self, other: "Pauli") -> bool:
        return not self.commutes(other)

    def weight(self) -> int:
        return sum(1 for i in range(self.n) if self.x[i] or self.z[i])

    def is_identity(self) -> bool:
        return not any(self.x) and not any(self.z)

    def support(self):
        return [i for i in range(self.n) if self.x[i] or self.z[i]]

    # ---- Qiskit interop (label order reversed) -------------------------------------------------
    def to_qiskit_label(self) -> str:
        """Qiskit puts qubit 0 at the RIGHT end of a label."""
        return self.to_string()[::-1]

    @classmethod
    def from_qiskit_label(cls, label: str) -> "Pauli":
        label = label.lstrip("+-i")  # drop any phase prefix such as '-' or '-i'
        return cls.from_string(label[::-1])


# ---- gates ---------------------------------------------------------------------------------------

def apply_h(p: Pauli, q: int) -> Pauli:
    x, z = list(p.x), list(p.z)
    x[q], z[q] = z[q], x[q]
    return Pauli(x, z)


def apply_s(p: Pauli, q: int) -> Pauli:
    x, z = list(p.x), list(p.z)
    z[q] ^= x[q]
    return Pauli(x, z)


def apply_cnot(p: Pauli, c: int, t: int) -> Pauli:
    if c == t:
        raise ValueError("CNOT control == target")
    x, z = list(p.x), list(p.z)
    x[t] ^= x[c]
    z[c] ^= z[t]
    return Pauli(x, z)


def apply_cz(p: Pauli, a: int, b: int) -> Pauli:
    if a == b:
        raise ValueError("CZ a == b")
    x, z = list(p.x), list(p.z)
    za = z[a] ^ x[b]
    zb = z[b] ^ x[a]
    z[a], z[b] = za, zb
    return Pauli(x, z)


def apply_swap(p: Pauli, a: int, b: int) -> Pauli:
    x, z = list(p.x), list(p.z)
    x[a], x[b] = x[b], x[a]
    z[a], z[b] = z[b], z[a]
    return Pauli(x, z)


def apply_gate(p: Pauli, gate: dict) -> Pauli:
    """Apply one gate given in the fixtures' JSON form, e.g. ``{"kind":"CNOT","c":0,"t":1}``."""
    kind = gate["kind"]
    if kind == "H":
        return apply_h(p, gate["q"])
    if kind == "S":
        return apply_s(p, gate["q"])
    if kind == "CNOT":
        return apply_cnot(p, gate["c"], gate["t"])
    if kind == "CZ":
        return apply_cz(p, gate["a"], gate["b"])
    if kind == "SWAP":
        return apply_swap(p, gate["a"], gate["b"])
    raise ValueError("unknown gate kind %r" % kind)


def propagate(p: Pauli, circuit) -> Pauli:
    """Push a Pauli frame forward through a whole circuit (list of gate dicts, time order)."""
    for g in circuit:
        p = apply_gate(p, g)
    return p


def propagate_steps(p: Pauli, circuit):
    """Frame after each gate (index 0 = before any gate). Used for training replays."""
    out = [p]
    for g in circuit:
        p = apply_gate(p, g)
        out.append(p)
    return out


def inverse_circuit(circuit):
    """Gate list for U^dagger. H, CNOT, CZ, SWAP are self-inverse; S^dagger acts on Pauli *bits* exactly
    like S (z ^= x; only the dropped phase differs), so the same dict is kept (and `circuits.py` emits sdg)."""
    return [dict(g, inverse=True) if g["kind"] == "S" else dict(g) for g in reversed(list(circuit))]
