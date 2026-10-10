/**
 * Global teardown: merges the per-project input-latency samples written by perf.spec.ts
 * (reports/perf/<project>.json) into reports/perf.json.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

export default function teardown(): void {
  const dir = path.resolve(process.cwd(), 'reports/perf');
  if (!existsSync(dir)) return;
  const projects: Record<string, unknown> = {};
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.json')).sort()) {
    try {
      projects[f.replace(/\.json$/, '')] = JSON.parse(readFileSync(path.join(dir, f), 'utf8')) as unknown;
    } catch {
      /* skip unreadable sample */
    }
  }
  mkdirSync(path.resolve(process.cwd(), 'reports'), { recursive: true });
  writeFileSync(path.resolve(process.cwd(), 'reports/perf.json'), `${JSON.stringify({ generatedAt: new Date().toISOString(), thresholdMs: 100, projects }, null, 2)}\n`);
}
