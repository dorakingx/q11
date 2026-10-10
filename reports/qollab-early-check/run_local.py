# Local rehearsal of main.py with Qiskit's BasicSimulator (same engine as Qollab's built-in simulator).
import runpy
from qiskit.providers.basic_provider import BasicSimulator
g = runpy.run_path("reports/qollab-early-check/main.py", init_globals={"backend": BasicSimulator()})
g["main"](shots=200, error_qubit=1, correct=True)
print("---- uncorrected variant ----")
g["main"](shots=200, error_qubit=1, correct=False)
