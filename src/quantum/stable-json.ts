/**
 * Deterministic JSON formatting for fixtures: keys sorted, 2-space indentation, "flat" containers
 * (whose members are all primitives) on one line, trailing newline. Regenerating a fixture yields
 * byte-identical output.
 */

export type JsonPrimitive = null | boolean | number | string;
export type JsonObject = { [key: string]: JsonValue };
export type JsonValue = JsonPrimitive | JsonValue[] | JsonObject;

function isPrimitive(v: JsonValue): v is JsonPrimitive {
  return v === null || typeof v !== 'object';
}

function isObject(v: JsonValue): v is JsonObject {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function isFlat(v: JsonValue): boolean {
  if (isPrimitive(v)) return true;
  if (Array.isArray(v)) return v.every(isPrimitive);
  return Object.values(v).every(isPrimitive);
}

function formatPrimitive(v: JsonValue): string {
  if (typeof v === 'number' && !Number.isFinite(v)) throw new Error('stableStringify: non-finite number');
  return JSON.stringify(v);
}

function format(v: JsonValue, indent: string): string {
  if (isPrimitive(v)) return formatPrimitive(v);
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]';
    if (isFlat(v)) return `[${v.map(formatPrimitive).join(', ')}]`;
    const inner = indent + '  ';
    return `[\n${v.map((item) => inner + format(item, inner)).join(',\n')}\n${indent}]`;
  }
  if (!isObject(v)) return formatPrimitive(v);
  const obj: JsonObject = v;
  const keys = Object.keys(obj).sort();
  if (keys.length === 0) return '{}';
  if (isFlat(obj)) {
    return `{${keys.map((k) => `${JSON.stringify(k)}: ${formatPrimitive(obj[k] ?? null)}`).join(', ')}}`;
  }
  const inner = indent + '  ';
  return `{\n${keys.map((k) => `${inner}${JSON.stringify(k)}: ${format(obj[k] ?? null, inner)}`).join(',\n')}\n${indent}}`;
}

/** Stable text for a JSON value (ends with a newline). */
export function stableStringify(v: JsonValue): string {
  return format(v, '') + '\n';
}

/** Re-serialise any JSON-parsed value through the stable formatter. */
export function restringify(text: string): string {
  return stableStringify(JSON.parse(text) as JsonValue);
}
