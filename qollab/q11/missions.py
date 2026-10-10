"""Mission definitions shared with the web game (``q11/data/missions.json``)."""

from __future__ import annotations

import json

from .codes import MISSIONS_PATH, _read_data, get_code
from .pauli import Pauli

_CACHE = {}


def load_missions():
    if "list" not in _CACHE:
        _CACHE["list"] = json.loads(_read_data(MISSIONS_PATH))
    return _CACHE["list"]


def mission_ids():
    return [m["id"] for m in load_missions()]


def get_mission(mission_id: str) -> dict:
    for m in load_missions():
        if m["id"] == mission_id:
            return m
    raise KeyError("unknown mission %r" % mission_id)


def mission_code(mission: dict):
    return get_code(mission["code"])


def mission_error(mission: dict) -> Pauli:
    return Pauli.from_string(mission["challenge"]["error"])


def mission_circuit(mission: dict):
    return list(mission["challenge"].get("circuit", []))


def allowed_correction(mission: dict, correction: str) -> bool:
    """Respect the mission's palette and crew budget (one letter per block; Y counts as one crew)."""
    code = mission_code(mission)
    if len(correction) != code.n:
        return False
    p = Pauli.from_string(correction)
    for i in range(p.n):
        letter = p.letter(i)
        if letter != "I" and letter not in mission["allowed"]:
            return False
    return p.weight() <= int(mission["budget"])
