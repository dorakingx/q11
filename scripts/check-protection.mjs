#!/usr/bin/env node
/**
 * Verifies that the Vercel project q11 is protected (Vercel Authentication = all deployments)
 * and that an unauthenticated HTTP client cannot read the app. Writes reports/protection-check.json.
 * Never prints or stores tokens. Usage: node scripts/check-protection.mjs <deployment-or-alias-url> [...more urls]
 */
import { spawnSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';

const TEAM = 'team_SbNwzYVsNb0NXjlFkKvPjcQT';
const urls = process.argv.slice(2);
if (urls.length === 0) { console.error('usage: node scripts/check-protection.mjs <url> [url...]'); process.exit(2); }

const api = spawnSync('npx', ['-y', 'vercel@latest', 'api', `/v9/projects/q11?teamId=${TEAM}`, '--raw'], { encoding: 'utf8' });
const raw = api.stdout || '';
const project = JSON.parse(raw.slice(raw.indexOf('{')));
const sso = project.ssoProtection?.deploymentType ?? null;
const protectionOk = sso === 'all' && project.passwordProtection == null && project.trustedIps == null;

const results = [];
let allBlocked = true;
for (const url of urls) {
  for (const p of ['/', '/index.html', '/manifest.webmanifest', '/assets/']) {
    const target = new URL(p, url).toString();
    const r = spawnSync('curl', ['-sS', '-o', '/dev/null', '-w', '%{http_code} %{redirect_url} %{content_type}', '--max-time', '20', target], { encoding: 'utf8' });
    const [status, redirect, ...ct] = (r.stdout || '').trim().split(' ');
    // Body probe: must not contain the app shell when unauthenticated
    const body = spawnSync('curl', ['-sS', '-L', '--max-time', '20', target], { encoding: 'utf8' }).stdout || '';
    const leaksApp = /Quantum Emergency Response|id="root"/.test(body) && !/Authentication Required|vercel\.com\/login|Log in to Vercel|sso-api/i.test(body);
    const blocked = (status === '401' || status === '403' || status === '307' || status === '302') && !leaksApp;
    if (!blocked) allBlocked = false;
    const redirectHost = redirect ? (() => { try { const u = new URL(redirect); return u.origin + u.pathname; } catch { return 'invalid'; } })() : null;
    results.push({ url: target, status, redirect: redirectHost, contentType: ct.join(' ') || null, bodyLeaksApp: leaksApp, blocked });
  }
}
const report = { checkedAt: new Date().toISOString(), projectId: project.id, ssoProtectionDeploymentType: sso, passwordProtection: project.passwordProtection ?? null, trustedIps: project.trustedIps ?? null, protectionBypassConfigured: Object.keys(project.protectionBypass ?? {}).length, protectionOk, unauthenticated: results, allBlocked, passed: protectionOk && allBlocked };
mkdirSync('reports', { recursive: true });
writeFileSync('reports/protection-check.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
process.exit(report.passed ? 0 : 1);
