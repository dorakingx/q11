#!/usr/bin/env node
/**
 * Q11 icon build — renders every raster icon from the two hand-authored SVG sources.
 *
 *   public/icon.svg          transparent variant (ring #8fc1ff + flame #ff5a3c)
 *   public/icon-rounded.svg  navy rounded-square variant
 *
 * Outputs (public/): favicon-16/32/64.png, favicon.ico (16/32/48 PNG entries), apple-touch-icon.png (180),
 * icon-192.png, icon-512.png, icon-512-maskable.png, og-image.png (1200x630).
 * Outputs (reports/icons/): preview-dark.png, preview-light.png.
 *
 * Usage: node scripts/build-icons.mjs
 * Exit code 1 on any failure, including the pixel sanity checks and the ICO read-back.
 */
import sharp from 'sharp';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(root, 'public');
const reportDir = path.join(root, 'reports', 'icons');

const NAVY = '#0b1a33';
const RING = '#8fc1ff';
const FLAME = '#ff5a3c';
const TEXT = '#e8eefc';
const MUTED = '#9fb3d9';
const TITLE = 'Q11 — Quantum Emergency Response';
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

// Bounding box of the drawn content inside icon.svg (viewBox units): ring outer edge + tail cap.
const ICON_BBOX = { x0: 50, y0: 42, x1: 452, y1: 444 };

const png = { compressionLevel: 9, adaptiveFiltering: true };

function innerSvg(svgText) {
  // strip the outer <svg> element so the content can be nested in another document
  return svgText.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
}

async function renderPng(svgBuffer, size, opts = {}) {
  let img = sharp(svgBuffer).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });
  if (opts.flatten) img = img.flatten({ background: opts.flatten });
  return img.png(png).toBuffer();
}

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

async function pixelAt(buffer, x, y) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const i = (y * info.width + x) * info.channels;
  return [data[i], data[i + 1], data[i + 2], data[i + 3]];
}

function near(rgb, hex, tol = 24) {
  const [r, g, b] = hexToRgb(hex);
  return Math.abs(rgb[0] - r) <= tol && Math.abs(rgb[1] - g) <= tol && Math.abs(rgb[2] - b) <= tol;
}

async function sanityCheck(transparent512) {
  // Guard against a silent renderer change (e.g. librsvg ignoring a colour): sample known points.
  const ringTop = await pixelAt(transparent512, 248, 70); // on the ring stroke (cy - r)
  const flameCore = await pixelAt(transparent512, 238, 262); // inside the flame body
  const corner = await pixelAt(transparent512, 8, 8); // outside everything
  const hole = await pixelAt(transparent512, 160, 150); // inside the ring, left of the flame
  const problems = [];
  if (!(ringTop[3] > 240 && near(ringTop, RING))) problems.push(`ring pixel at (248,70) is ${ringTop}, expected ${RING}`);
  if (!(flameCore[3] > 240 && near(flameCore, FLAME))) problems.push(`flame pixel at (238,262) is ${flameCore}, expected ${FLAME}`);
  if (corner[3] !== 0) problems.push(`corner pixel at (8,8) is not transparent: ${corner}`);
  if (hole[3] !== 0) problems.push(`ring interior at (160,150) is not transparent: ${hole}`);
  if (problems.length) throw new Error('sanity check failed:\n  ' + problems.join('\n  '));
}

function buildIco(entries) {
  // ICONDIR (6 bytes) + ICONDIRENTRY (16 bytes each) + PNG payloads. PNG-in-ICO is valid for every modern browser.
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(entries.length, 4);
  const dir = Buffer.alloc(16 * entries.length);
  let offset = header.length + dir.length;
  entries.forEach(({ size, data }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o); // width (0 means 256)
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1); // height
    dir.writeUInt8(0, o + 2); // colour count (0 = no palette)
    dir.writeUInt8(0, o + 3); // reserved
    dir.writeUInt16LE(1, o + 4); // colour planes
    dir.writeUInt16LE(32, o + 6); // bits per pixel
    dir.writeUInt32LE(data.length, o + 8); // bytes in resource
    dir.writeUInt32LE(offset, o + 12); // offset of the payload
    offset += data.length;
  });
  return Buffer.concat([header, dir, ...entries.map((e) => e.data)]);
}

export function readIco(buffer) {
  if (buffer.readUInt16LE(0) !== 0 || buffer.readUInt16LE(2) !== 1) throw new Error('not an ICO file');
  const count = buffer.readUInt16LE(4);
  const entries = [];
  for (let i = 0; i < count; i++) {
    const o = 6 + i * 16;
    const w = buffer.readUInt8(o) || 256;
    const h = buffer.readUInt8(o + 1) || 256;
    const bytes = buffer.readUInt32LE(o + 8);
    const offset = buffer.readUInt32LE(o + 12);
    const payload = buffer.subarray(offset, offset + bytes);
    const isPng = payload.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    // IHDR width/height live at bytes 16..24 of a PNG
    const pngW = isPng ? payload.readUInt32BE(16) : null;
    const pngH = isPng ? payload.readUInt32BE(20) : null;
    entries.push({ width: w, height: h, bytes, offset, isPng, pngW, pngH, bitCount: buffer.readUInt16LE(o + 6) });
  }
  return { count, entries };
}

function maskableSvg(iconInner) {
  // Content must stay inside the central 80 % safe zone (radius 0.4 * 512 = 204.8 px).
  // The farthest drawn point from the bbox centre is the tail cap (~273 units) -> scale 0.72 keeps it at ~197 px.
  const cx = (ICON_BBOX.x0 + ICON_BBOX.x1) / 2;
  const cy = (ICON_BBOX.y0 + ICON_BBOX.y1) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="${NAVY}"/>
  <g transform="translate(256 256) scale(0.72) translate(${-cx} ${-cy})">${iconInner}</g>
</svg>`;
}

async function textWidth(text, fontSize, weight) {
  // Measure rendered text by rasterising it alone and trimming the transparent margin.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="${Math.ceil(fontSize * 2)}"><text x="10" y="${Math.round(fontSize * 1.2)}" font-family="${FONT}" font-size="${fontSize}" font-weight="${weight}" fill="#fff">${text}</text></svg>`;
  const { info } = await sharp(Buffer.from(svg)).trim().toBuffer({ resolveWithObject: true });
  return info.width;
}

async function fitFontSize(text, requested, weight, maxWidth) {
  const w = await textWidth(text, requested, weight);
  if (w <= maxWidth) return requested;
  const scaled = Math.floor((requested * maxWidth) / w);
  // re-measure once because glyph hinting is not perfectly linear
  const w2 = await textWidth(text, scaled, weight);
  return w2 <= maxWidth ? scaled : scaled - 1;
}

async function ogSvg(iconInner) {
  const size = 340;
  const x = 84;
  const y = (630 - size) / 2;
  const textX = 470;
  const maxWidth = 1200 - textX - 56;
  const lines = [
    { text: 'Q11', size: 120, weight: 700, fill: TEXT, gapAfter: 10 },
    { text: 'Quantum Emergency Response', size: 52, weight: 700, fill: TEXT, gapAfter: 34 },
    { text: 'Read the alarms. Dispatch the crews.', size: 30, weight: 400, fill: MUTED, gapAfter: 8 },
    { text: 'Protect the logical qubit.', size: 30, weight: 400, fill: MUTED, gapAfter: 30 },
    { text: 'Qollab × IonQ Global Quantum Hackathon 2026', size: 22, weight: 400, fill: MUTED, gapAfter: 0 },
  ];
  for (const l of lines) l.size = await fitFontSize(l.text, l.size, l.weight, maxWidth);
  const total = lines.reduce((acc, l) => acc + l.size + l.gapAfter, 0);
  let baseline = (630 - total) / 2;
  const textEls = lines
    .map((l) => {
      baseline += l.size;
      const el = `<text x="${textX}" y="${Math.round(baseline)}" font-size="${l.size}" font-weight="${l.weight}" fill="${l.fill}">${l.text}</text>`;
      baseline += l.gapAfter;
      return el;
    })
    .join('\n    ');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${NAVY}"/>
  <svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 512 512">${iconInner}</svg>
  <g font-family="${FONT}">
    ${textEls}
  </g>
</svg>`;
}

async function previewSheet({ bg, fg, transparentSvg, roundedSvg }) {
  const sizes = [16, 32, 64, 128];
  const W = 760;
  const tiles = [];
  const labels = [];
  const drawRow = async (svg, top, label) => {
    labels.push({ x: 24, y: top - 10, text: label });
    let left = 24;
    for (const s of sizes) {
      const buf = await renderPng(svg, s);
      tiles.push({ input: buf, left, top: top + (128 - s) }); // bottom-align
      labels.push({ x: left + s / 2, y: top + 128 + 20, text: `${s}`, anchor: 'middle' });
      left += s + 48;
    }
    return left;
  };
  // rows at true size
  await drawRow(transparentSvg, 40, 'icon.svg (transparent) at 16 / 32 / 64 / 128 px, 1:1');
  await drawRow(roundedSvg, 236, 'icon-rounded.svg (navy rounded square) at 16 / 32 / 64 / 128 px, 1:1');
  // zoomed inspection row: 16 and 32 px, nearest-neighbour x4
  const zoomTop = 440;
  labels.push({ x: 24, y: zoomTop - 10, text: '16 px and 32 px rasters magnified 4x (nearest neighbour) — transparent, then rounded' });
  let left = 24;
  for (const svg of [transparentSvg, roundedSvg]) {
    for (const s of [16, 32]) {
      const small = await renderPng(svg, s);
      const big = await sharp(small).resize(s * 4, s * 4, { kernel: 'nearest' }).png().toBuffer();
      tiles.push({ input: big, left, top: zoomTop + (128 - s * 4) });
      labels.push({ x: left + s * 2, y: zoomTop + 128 + 20, text: `${s}×4`, anchor: 'middle' });
      left += s * 4 + 40;
    }
  }
  const H = zoomTop + 128 + 40;
  const labelSvg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">` +
      labels
        .map(
          (l) =>
            `<text x="${l.x}" y="${l.y}" font-family="${FONT}" font-size="13" fill="${fg}"${l.anchor ? ` text-anchor="${l.anchor}"` : ''}>${l.text}</text>`,
        )
        .join('') +
      '</svg>',
  );
  return sharp({ create: { width: W, height: H, channels: 4, background: bg } })
    .composite([...tiles, { input: labelSvg, left: 0, top: 0 }])
    .png(png)
    .toBuffer();
}

async function main() {
  await mkdir(pub, { recursive: true });
  await mkdir(reportDir, { recursive: true });

  const transparentSvg = await readFile(path.join(pub, 'icon.svg'));
  const roundedSvg = await readFile(path.join(pub, 'icon-rounded.svg'));
  const iconInner = innerSvg(transparentSvg.toString('utf8'));

  const outputs = [];
  const write = async (name, data, dir = pub) => {
    const file = path.join(dir, name);
    await writeFile(file, data);
    const meta = name.endsWith('.ico') ? null : await sharp(data).metadata();
    outputs.push({ file: path.relative(root, file), bytes: data.length, dims: meta ? `${meta.width}x${meta.height}` : 'ico' });
    return data;
  };

  // Transparent variant: favicon PNGs + a 512 reference used for the sanity check
  const transparent512 = await renderPng(transparentSvg, 512);
  await sanityCheck(transparent512);
  await write('favicon-16.png', await renderPng(transparentSvg, 16));
  await write('favicon-32.png', await renderPng(transparentSvg, 32));
  await write('favicon-64.png', await renderPng(transparentSvg, 64));

  // favicon.ico: 16/32/48 transparent PNG entries
  const icoEntries = [];
  for (const size of [16, 32, 48]) icoEntries.push({ size, data: await renderPng(transparentSvg, size) });
  const ico = buildIco(icoEntries);
  const parsed = readIco(ico);
  for (const [i, e] of parsed.entries.entries()) {
    if (!e.isPng || e.pngW !== icoEntries[i].size || e.pngH !== icoEntries[i].size || e.width !== icoEntries[i].size) {
      throw new Error(`ICO entry ${i} failed read-back: ${JSON.stringify(e)}`);
    }
  }
  await write('favicon.ico', ico);

  // Rounded variant: PWA + apple-touch
  await write('icon-192.png', await renderPng(roundedSvg, 192));
  await write('icon-512.png', await renderPng(roundedSvg, 512));
  await write('apple-touch-icon.png', await renderPng(roundedSvg, 180, { flatten: NAVY }));

  // Maskable (full-bleed navy, content inside the 80 % safe zone)
  await write('icon-512-maskable.png', await renderPng(Buffer.from(maskableSvg(iconInner)), 512));

  // Open Graph image 1200x630
  const og = await sharp(Buffer.from(await ogSvg(iconInner))).png(png).toBuffer();
  await write('og-image.png', og);

  // Review sheets
  await write('preview-dark.png', await previewSheet({ bg: NAVY, fg: TEXT, transparentSvg, roundedSvg }), reportDir);
  await write('preview-light.png', await previewSheet({ bg: '#f4f6fa', fg: NAVY, transparentSvg, roundedSvg }), reportDir);

  for (const o of outputs) console.log(`${o.file.padEnd(34)} ${o.dims.padEnd(10)} ${String(o.bytes).padStart(7)} bytes`);
  console.log(`favicon.ico entries: ${parsed.entries.map((e) => `${e.width}x${e.height} png=${e.isPng} ${e.bytes}B`).join(', ')}`);
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  main().catch((err) => {
    console.error('build-icons failed:', err.message);
    process.exit(1);
  });
}
