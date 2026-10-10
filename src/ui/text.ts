import { getCode, type CodeId } from '../quantum';

/** Live alarm summary text (also used as the board's aria-describedby). */
export function alarmSummary(codeId: CodeId, syndrome: readonly number[] | null): string {
  const code = getCode(codeId);
  if (code.checks.length === 0) return 'This district has no alarm stations.';
  if (syndrome === null) return 'Alarms not read yet.';
  const ringing = code.checks.filter((_, i) => (syndrome[i] ?? 0) === 1).map((c) => c.id);
  if (ringing.length === 0) return `All ${String(code.checks.length)} stations quiet.`;
  return `${String(ringing.length)} of ${String(code.checks.length)} stations ringing: ${ringing.join(', ')}.`;
}
