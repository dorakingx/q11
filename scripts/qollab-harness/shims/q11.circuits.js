// Shim of qollab/q11/circuits.py for the local harness. Mirrors the Pyodide proxy calling convention
// (.callPromisingKwargs) and returns objects with .toJs(). Values are FAKE and labelled as such by the harness.
const mk = (fn) => ({ callPromisingKwargs: async (kw) => wrap(await fn(kw)), callPromising: async (...a) => wrap(await fn(...a)) });
const wrap = (v) => (v && typeof v === 'object' && !('toJs' in v) ? Object.assign(v, { toJs: () => v }) : v);
export const build_mission_circuit = mk(async ({ mission_id, correction }) => ({ __numClbits: 17, __expectedBitstring: '0'.repeat(17), mission_id, correction }));
export const analyze_counts = mk(async ({ counts, mission_id, correction, readout_basis }) => ({ harness: true, mission_id, correction, readout_basis, syndromeHistogram: { '00000000': 1 }, logicalOutcome: 'fake' }));
export const predict = mk(async ({ mission_id, correction }) => ({ harness: true, mission_id, correction, syndrome: [], verdict: 'fake' }));
