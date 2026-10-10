"""Tiny GF(2) linear algebra on lists of 0/1 ints (rows = vectors)."""

from __future__ import annotations


def _copy(rows):
    return [list(r) for r in rows]


def row_reduce(rows):
    """Return (reduced rows, pivot columns). Reduced row echelon form over GF(2)."""
    m = _copy(rows)
    if not m:
        return [], []
    ncols = len(m[0])
    pivots = []
    r = 0
    for c in range(ncols):
        pivot = None
        for i in range(r, len(m)):
            if m[i][c]:
                pivot = i
                break
        if pivot is None:
            continue
        m[r], m[pivot] = m[pivot], m[r]
        for i in range(len(m)):
            if i != r and m[i][c]:
                m[i] = [a ^ b for a, b in zip(m[i], m[r])]
        pivots.append(c)
        r += 1
        if r == len(m):
            break
    return m[:r], pivots


def rank(rows) -> int:
    reduced, _ = row_reduce(rows)
    return len(reduced)


def in_span(rows, vec) -> bool:
    """True iff ``vec`` is a GF(2) combination of ``rows`` (rank does not grow when appended)."""
    if not rows:
        return not any(vec)
    return rank(list(rows) + [list(vec)]) == rank(rows)


def solve(rows, vec):
    """Coefficients c (list of 0/1 over rows) with XOR_i c_i rows_i == vec, or None if unsolvable."""
    k = len(rows)
    if k == 0:
        return [] if not any(vec) else None
    ncols = len(rows[0])
    # augment each row with an identity tag to track combinations
    aug = [list(rows[i]) + [1 if j == i else 0 for j in range(k)] for i in range(k)]
    reduced, pivots = row_reduce(aug)
    # express vec: eliminate using pivot columns < ncols only
    v = list(vec) + [0] * k
    for row, pc in zip(reduced, pivots):
        if pc >= ncols:
            continue
        if v[pc]:
            v = [a ^ b for a, b in zip(v, row)]
    if any(v[:ncols]):
        return None
    return v[ncols:]


def nullspace(rows):
    """Basis of {v : rows · v = 0} over GF(2) (rows as a matrix acting on column vectors)."""
    if not rows:
        return []
    ncols = len(rows[0])
    reduced, pivots = row_reduce(rows)
    free = [c for c in range(ncols) if c not in pivots]
    basis = []
    for f in free:
        v = [0] * ncols
        v[f] = 1
        for row, pc in zip(reduced, pivots):
            if row[f]:
                v[pc] = 1
        basis.append(v)
    return basis
