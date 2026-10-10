# Q11 early technical check for Qollab: a small, real Qiskit syndrome-extraction circuit.
# 3-qubit repetition code (X-noise-only intro of the game), one injected X error, two ancilla parity checks,
# optional correction, all measurements at the END (no mid-circuit measurement needed).
# `backend` is pre-created by the Qollab runtime (never hard-code one). Works with one job per run on IonQ.
from qiskit import QuantumCircuit
from qiskit.providers.jobstatus import JobStatus
import time


def build(error_qubit: int, correct: bool) -> QuantumCircuit:
    # qubits 0,1,2 = data (city blocks); 3 = ancilla for Z0Z1 (alarm A); 4 = ancilla for Z1Z2 (alarm B)
    qc = QuantumCircuit(5, 5)
    # logical |0> of the repetition code is |000>: nothing to prepare.
    if 0 <= error_qubit <= 2:
        qc.x(error_qubit)                       # the arsonist: an X fire on one block
    qc.barrier()
    qc.cx(0, 3); qc.cx(1, 3)                   # alarm A = parity of blocks 0,1
    qc.cx(1, 4); qc.cx(2, 4)                   # alarm B = parity of blocks 1,2
    qc.barrier()
    if correct and 0 <= error_qubit <= 2:
        qc.x(error_qubit)                       # the firefighter: X on the same block (X·X = I)
    qc.measure([3, 4], [3, 4])                 # alarms
    qc.measure([0, 1, 2], [0, 1, 2])           # blocks
    return qc


def main(shots: int = 200, error_qubit: int = 1, correct: bool = True):
    qc = build(error_qubit, correct)
    print(qc)
    job = backend.run(qc, shots=shots)
    while job.status() not in (JobStatus.DONE, JobStatus.ERROR, JobStatus.CANCELLED):
        time.sleep(2)
    counts = job.result().get_counts()
    # Qiskit bit order: the string is c4 c3 c2 c1 c0 (little-endian). Alarms are bits 3,4; blocks are bits 0,1,2.
    alarms = {}
    blocks = {}
    for bits, n in counts.items():
        a = bits[0:2][::-1]          # (c3, c4) -> "AB" as alarm A then alarm B
        b = bits[2:5][::-1]          # (c0, c1, c2) -> blocks 0,1,2 left to right
        alarms[a] = alarms.get(a, 0) + n
        blocks[b] = blocks.get(b, 0) + n
    expected_alarms = {0: "10", 1: "11", 2: "01"}.get(error_qubit, "00")
    expected_blocks = "000" if (correct or error_qubit not in (0, 1, 2)) else "".join("1" if i == error_qubit else "0" for i in range(3))
    print("backend:", getattr(backend, "name", backend))
    print("shots:", shots, "| error on block:", error_qubit, "| correction applied:", correct)
    print("alarms (A=blocks 0,1  B=blocks 1,2):", dict(sorted(alarms.items())), "| ideal:", expected_alarms)
    print("blocks after dispatch:", dict(sorted(blocks.items())), "| ideal:", expected_blocks)
    ideal_share = (alarms.get(expected_alarms, 0) / shots, blocks.get(expected_blocks, 0) / shots)
    print("share of shots matching the ideal Pauli-frame prediction: alarms %.3f, blocks %.3f" % ideal_share)
