#!/usr/bin/env node
// Serves the repo root on http://localhost:4174 so scripts/qollab-harness/index.html can load /qollab/* and shims.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' };
createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const p = url.pathname === '/' ? '/scripts/qollab-harness/index.html' : url.pathname;
  try {
    const data = await readFile(path.join(root, p));
    res.writeHead(200, { 'content-type': types[path.extname(p)] ?? 'application/octet-stream' });
    res.end(data);
  } catch { res.writeHead(404); res.end('not found'); }
}).listen(4174, () => console.log('Q11 Qollab harness: http://localhost:4174/'));
