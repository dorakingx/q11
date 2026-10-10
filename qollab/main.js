// Q11 — Quantum Emergency Response · Qollab entry (JS/Qiskit project).
// The game itself is a self-contained ES module bundle (./game/q11-game.js) built from the same TypeScript
// source as the web version. Quantum circuits are built and analysed in Python (q11/*.py, Qiskit) and run on
// whatever backend the person pressing Run selected in the Select QPU dialog — never a hard-coded one.
import { mountQ11 } from './game/q11-game.js';
import * as circuits from 'q11.circuits';

const root = document.getElementById('q11-root');
const backendLine = document.getElementById('q11-backend');

function toPlain(value) {
  // Pyodide proxies → plain JS (Map → object), recursively.
  if (value && typeof value.toJs === 'function') value = value.toJs({ dict_converter: Object.fromEntries, create_proxies: false });
  if (value instanceof Map) value = Object.fromEntries(value);
  if (Array.isArray(value)) return value.map(toPlain);
  if (value && typeof value === 'object' && !(value instanceof Uint8Array)) {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = toPlain(v);
    return out;
  }
  return value;
}

async function detectBackendName() {
  try {
    const n = typeof backend.name === 'function' ? backend.name() : backend.name;
    return String(n);
  } catch {
    return 'unknown backend';
  }
}

const backendName = await detectBackendName();
backendLine.textContent = `Backend selected in the Run dialog: ${backendName}`;

// One job per run on IonQ backends (Qollab rule). We enforce one cloud verification per Run for every backend
// except the local simulators, where more are allowed; the UI explains this.
const isLocal = /basic|aer|braket|local|fake/i.test(backendName) && !/ionq/i.test(backendName);
let jobsThisRun = 0;

const bridge = {
  kind: 'qollab',
  backendName,
  isLocalSimulator: isLocal,
  jobsRemaining: () => (isLocal ? Infinity : Math.max(0, 1 - jobsThisRun)),
  /**
   * request: { missionId, correction, shots, prep: '0'|'+', readoutBasis: 'Z'|'X' }
   * returns: { status: 'ok', source: 'live-cloud'|'local-simulator', backendName, shots, counts, analysis, prediction, startedAt, finishedAt, jobId }
   *       or { status: 'error', message }
   */
  async run(request) {
    if (!isLocal && jobsThisRun >= 1) {
      return { status: 'error', message: 'Qollab allows one IonQ job per Run. Press Stop, then Run again to verify another mission.' };
    }
    const startedAt = new Date().toISOString();
    try {
      const qc = await circuits.build_mission_circuit.callPromisingKwargs({
        mission_id: request.missionId,
        correction: request.correction,
        prep: request.prep ?? '0',
        readout_basis: request.readoutBasis ?? 'Z',
      });
      jobsThisRun += 1;
      const job = await backend.run(qc, { shots: request.shots });
      let jobId = null;
      try { jobId = String(typeof job.job_id === 'function' ? job.job_id() : job.job_id); } catch { jobId = null; }
      const result = await job.result();
      const counts = toPlain(result.get_counts());
      const analysis = toPlain(await circuits.analyze_counts.callPromisingKwargs({
        counts: result.get_counts(),
        mission_id: request.missionId,
        correction: request.correction,
        readout_basis: request.readoutBasis ?? 'Z',
        prep: request.prep ?? '0',
      }));
      const prediction = toPlain(await circuits.predict.callPromisingKwargs({
        mission_id: request.missionId,
        correction: request.correction,
        prep: request.prep ?? '0',
        readout_basis: request.readoutBasis ?? 'Z',
      }));
      return {
        status: 'ok',
        source: isLocal ? 'local-simulator' : 'live-cloud',
        backendName,
        shots: request.shots,
        counts,
        analysis,
        prediction,
        jobId,
        startedAt,
        finishedAt: new Date().toISOString(),
      };
    } catch (err) {
      console.log('Q11 verification failed: ' + (err && err.message ? err.message : String(err)));
      return { status: 'error', message: err && err.message ? err.message : String(err) };
    }
  },
};

mountQ11(root, { bridge, storage: 'memory' });
