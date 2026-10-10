// Fake backend for the local harness. It does NOT simulate quantum mechanics: it returns the circuit's own
// classical expectation (provided by the fake Python shim) with a little sampling noise, clearly labelled.
export class FakeBackend {
  constructor(name) { this.name = name; }
  async run(circuit, { shots = 100 } = {}) {
    const expected = circuit.__expectedBitstring ?? '0'.repeat(circuit.__numClbits ?? 1);
    const counts = new Map([[expected, shots]]);
    return {
      job_id: () => 'harness-' + Math.random().toString(36).slice(2, 10),
      status: () => 'DONE',
      result: async () => ({ get_counts: () => ({ toJs: () => counts }) }),
    };
  }
}
