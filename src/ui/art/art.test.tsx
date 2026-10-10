import { renderToStaticMarkup } from 'react-dom/server';
import type { ReactElement } from 'react';
import { getLayout } from '../../quantum';
import { CityBackdrop } from './CityBackdrop';
import { CITY_H, CITY_W, DISTRICTS, DISTRICT_ORDER, ROADS, ROAD_START, STATION, type DistrictId, type DistrictVisualState } from './cityLayout';
import { Detector } from './detector';
import { CheckMark, Flame, Smoke, SteamPuff } from './fire';
import { nozzleAt } from './crewGeometry';
import { Firefighter, HelmetChip } from './firefighter';
import { BridgeSpan, ConversionLab, FireStation, House, MemoryTower, MirrorMachine, type HouseState } from './houses';
import { BridgeLanes, Coupler, Dial, LabLanes, LaneToken, SceneGround } from './scene';
import { REP3_SCENE, RSC3_CHECKS, RSC3_SCENE, laneGeometry } from './sceneLayout';
import { ChapterBadge, Cloud, Flag, FogPatch, RoadCurve, RoadStraight, Roadblock, SmokePlume, StreetLight, Tree } from './tiles';
import { FireTruck } from './truck';
import { Drop, Splash, Stream } from './water';

function svg(el: ReactElement): string {
  return renderToStaticMarkup(<svg>{el}</svg>);
}

function textOf(markup: string): string {
  return markup
    .replace(/<title>[^<]*<\/title>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, '');
}

const HOUSE_STATES: readonly HouseState[] = [
  { kind: 'normal' },
  { kind: 'fog' },
  { kind: 'fire', letter: 'X' },
  { kind: 'fire', letter: 'Z' },
  { kind: 'fire', letter: 'Y' },
  { kind: 'out' },
  { kind: 'restored' },
  { kind: 'ghost', letter: 'X' },
  { kind: 'residual', letter: 'Z' },
];

const ALL_PARTS: readonly { name: string; el: ReactElement }[] = [
  ...(['X', 'Z', 'Y'] as const).flatMap((l) => [
    { name: `flame ${l}`, el: <Flame letter={l} x={0} y={0} /> },
    { name: `flame ${l} residual`, el: <Flame letter={l} x={0} y={0} residual /> },
    { name: `flame ${l} ghost`, el: <Flame letter={l} x={0} y={0} ghost /> },
    ...(['idle', 'run1', 'run2', 'spray'] as const).map((p) => ({ name: `crew ${l} ${p}`, el: <Firefighter letter={l} pose={p} x={0} y={0} /> })),
    { name: `chip ${l}`, el: <HelmetChip letter={l} x={0} y={0} /> },
    { name: `token ${l}`, el: <LaneToken letter={l} x={0} y={0} /> },
    { name: `tower ${l}`, el: <MemoryTower x={0} y={0} anomaly={l} /> },
  ]),
  { name: 'smoke', el: <Smoke x={0} y={0} /> },
  { name: 'steam', el: <SteamPuff x={0} y={0} /> },
  { name: 'check', el: <CheckMark x={0} y={0} /> },
  { name: 'stream', el: <Stream from={{ x: 0, y: 0 }} to={{ x: 100, y: 20 }} /> },
  { name: 'splash', el: <Splash x={0} y={0} /> },
  { name: 'drop', el: <Drop x={0} y={0} /> },
  { name: 'truck', el: <FireTruck x={0} y={0} lights /> },
  ...(['X', 'Z'] as const).flatMap((t) => [
    { name: `detector ${t}`, el: <Detector type={t} x={0} y={0} /> },
    { name: `detector ${t} ringing`, el: <Detector type={t} x={0} y={0} ringing highlighted /> },
  ]),
  ...(['small', 'tall', 'shop'] as const).flatMap((v) => HOUSE_STATES.map((s) => ({ name: `house ${v} ${s.kind}`, el: <House variant={v} state={s} x={0} y={0} /> }))),
  { name: 'tower', el: <MemoryTower x={0} y={0} lit /> },
  { name: 'station', el: <FireStation x={0} y={0} open /> },
  { name: 'lab', el: <ConversionLab x={0} y={0} active /> },
  { name: 'mirror', el: <MirrorMachine x={0} y={0} /> },
  { name: 'bridge', el: <BridgeSpan x={0} y={0} /> },
  { name: 'tree', el: <Tree x={0} y={0} /> },
  { name: 'light', el: <StreetLight x={0} y={0} lit /> },
  { name: 'flag', el: <Flag x={0} y={0} /> },
  { name: 'roadblock', el: <Roadblock x={0} y={0} /> },
  { name: 'fog', el: <FogPatch x={0} y={0} width={100} height={80} /> },
  { name: 'plume', el: <SmokePlume x={0} y={0} /> },
  { name: 'cloud', el: <Cloud x={0} y={0} /> },
  { name: 'badge', el: <ChapterBadge x={0} y={0} /> },
  { name: 'road', el: <RoadStraight x1={0} y1={0} x2={100} y2={0} /> },
  { name: 'curve', el: <RoadCurve x1={0} y1={0} cx={50} cy={0} x2={50} y2={50} /> },
  { name: 'ground rsc3', el: <SceneGround layout={RSC3_SCENE} /> },
  { name: 'ground rep3', el: <SceneGround layout={REP3_SCENE} /> },
  { name: 'bridge lanes', el: <BridgeLanes geometry={laneGeometry(2)} /> },
  { name: 'lab lanes', el: <LabLanes geometry={laneGeometry(3)} /> },
  { name: 'coupler', el: <Coupler x={10} controlY={0} targetY={50} active /> },
  { name: 'dial', el: <Dial x={0} y={0} /> },
];

describe('art parts', () => {
  it.each(ALL_PARTS.map((p) => [p.name, p.el] as const))('%s renders a plain <g> with flat colours and only X/Z/Y/!/?/H/S text', (_name, el) => {
    const m = svg(el);
    expect(m).toMatch(/<(g|path|rect|ellipse|circle|line|polygon)/);
    expect(m).not.toMatch(/Gradient|<filter|<image|<foreignObject|url\(#/);
    expect(m).not.toMatch(/\p{Extended_Pictographic}/u);
    expect(textOf(m)).toMatch(/^[XZY!?HS]*$/);
  });

  it('fog houses carry no letter and are identical across variants of the hidden fire (no hidden prop exists)', () => {
    const fog = svg(<House state={{ kind: 'fog' }} x={0} y={0} tint={0} />);
    expect(textOf(fog)).toBe('?');
    expect(fog).not.toMatch(/data-|aria-/);
  });

  it('flame halves are split along x = 0 so Y is red left / blue right without ids', () => {
    const y = svg(<Flame letter="Y" x={0} y={0} />);
    expect(y).toContain('#e8432f');
    expect(y).toContain('#2f7fe6');
    expect(y).not.toContain('clipPath');
  });

  it('water never uses the Z-fire blue', () => {
    for (const el of [<Stream key="s" from={{ x: 0, y: 0 }} to={{ x: 50, y: 50 }} />, <Splash key="p" x={0} y={0} />, <Drop key="d" x={0} y={0} />]) {
      expect(svg(el)).not.toContain('#2f7fe6');
    }
  });

  it('a stream below full progress has no impact disc', () => {
    expect(svg(<Stream from={{ x: 0, y: 0 }} to={{ x: 50, y: 50 }} progress={0.5} />)).not.toContain('r="8"');
    expect(svg(<Stream from={{ x: 0, y: 0 }} to={{ x: 50, y: 50 }} progress={1} />)).toContain('r="8"');
  });

  it('nozzleAt mirrors with facing and scales', () => {
    expect(nozzleAt(100, 200)).toEqual({ x: 134, y: 166 });
    expect(nozzleAt(100, 200, 0.5, -1)).toEqual({ x: 83, y: 183 });
  });

  it('the mirror machine hides its H label inside the city (only lane boards show gate letters)', () => {
    expect(textOf(svg(<MirrorMachine x={0} y={0} />))).toBe('H');
    expect(textOf(svg(<ConversionLab x={0} y={0} />))).toBe('');
  });

  it('a titled part exposes role=img + <title>', () => {
    const m = svg(<Flame letter="X" x={0} y={0} title="red fire" />);
    expect(m).toContain('role="img"');
    expect(m).toContain('<title>red fire</title>');
  });
});

describe('scene geometry', () => {
  it('rsc3 detector positions match fixtures/codes.json', () => {
    const layout = getLayout('rsc3');
    if (layout.kind !== 'grid') throw new Error('rsc3 layout should be a grid');
    for (const c of RSC3_CHECKS) expect(layout.checkPositions[c.id]).toEqual({ row: c.row, col: c.col });
    expect(RSC3_SCENE.detectors.map((d) => d.id).sort()).toEqual(Object.keys(layout.checkPositions).sort());
  });

  it('rsc3 houses sit on a 100-unit grid with q = 3·row + col inside the scene box', () => {
    for (const h of RSC3_SCENE.houses) {
      expect(h.q).toBe(h.row * 3 + h.col);
      expect(h.x).toBe(RSC3_SCENE.origin.x + h.col * 100);
      expect(h.x).toBeGreaterThan(0);
      expect(h.x).toBeLessThan(RSC3_SCENE.width);
      expect(h.y).toBeLessThan(RSC3_SCENE.height);
    }
    for (const d of RSC3_SCENE.detectors) {
      expect(d.x).toBeGreaterThanOrEqual(40);
      expect(d.x).toBeLessThanOrEqual(RSC3_SCENE.width - 40);
      expect(d.lamp.y).toBeGreaterThan(0);
    }
  });

  it('rep3 has three houses and the two Z detectors between them', () => {
    expect(REP3_SCENE.houses.map((h) => h.q)).toEqual([0, 1, 2]);
    expect(REP3_SCENE.detectors.map((d) => [d.id, d.col])).toEqual([
      ['Z0', 0.5],
      ['Z1', 1.5],
    ]);
  });

  it('lane geometry spaces wires evenly', () => {
    const g = laneGeometry(3, 600, 260);
    expect(g.laneY(0)).toBeLessThan(g.laneY(1));
    expect(g.laneY(1)).toBeLessThan(g.laneY(2));
    expect(g.laneY(2) - g.laneY(1)).toBeCloseTo(g.laneY(1) - g.laneY(0));
    expect(g.stepX(0, 2)).toBeLessThan(g.stepX(1, 2));
  });
});

/** Walks an absolute M/H/V/L/Q path and returns its end point. */
function pathEnd(d: string): { x: number; y: number } {
  const tokens = d.match(/[MHVLQ]|-?\d+(\.\d+)?/g) ?? [];
  let x = 0;
  let y = 0;
  let i = 0;
  while (i < tokens.length) {
    const cmd = tokens[i++];
    const num = () => Number(tokens[i++]);
    switch (cmd) {
      case 'M':
      case 'L':
        x = num();
        y = num();
        break;
      case 'H':
        x = num();
        break;
      case 'V':
        y = num();
        break;
      case 'Q':
        num();
        num();
        x = num();
        y = num();
        break;
      default:
        throw new Error(`unsupported path token ${String(cmd)}`);
    }
  }
  return { x, y };
}

describe('city layout', () => {
  it('lists the six districts in mission order inside the 1600×1000 map', () => {
    expect(DISTRICTS.map((d) => d.id)).toEqual(DISTRICT_ORDER);
    expect(DISTRICTS.map((d) => d.missionId)).toEqual(['first-alarm', 'red-forward-blue-backward', 'color-switch', 'blind-dispatch', 'two-kinds-of-trouble', 'silent-failure']);
    for (const d of DISTRICTS) {
      expect(d.x).toBeGreaterThanOrEqual(0);
      expect(d.y).toBeGreaterThanOrEqual(0);
      expect(d.x + d.w).toBeLessThanOrEqual(CITY_W);
      expect(d.y + d.h).toBeLessThanOrEqual(CITY_H);
    }
  });

  it('districts do not overlap each other or the station', () => {
    const boxes = [...DISTRICTS.map((d) => ({ id: d.id, x: d.x, y: d.y, w: d.w, h: d.h })), { id: 'station', ...STATION }];
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i]!;
        const b = boxes[j]!;
        const overlap = a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
        expect(overlap, `${a.id} overlaps ${b.id}`).toBe(false);
      }
    }
  });

  it('flag and roadblock spots sit inside or at the edge of their district box', () => {
    for (const d of DISTRICTS) {
      for (const p of [d.gate, d.block, d.smoke]) {
        expect(p.x, `${d.id} x`).toBeGreaterThanOrEqual(d.x - 40);
        expect(p.x, `${d.id} x`).toBeLessThanOrEqual(d.x + d.w + 40);
        expect(p.y, `${d.id} y`).toBeGreaterThanOrEqual(d.y - 40);
        expect(p.y, `${d.id} y`).toBeLessThanOrEqual(d.y + d.h + 40);
      }
    }
  });

  it('every road starts at the station driveway and ends at its district entry', () => {
    for (const d of DISTRICTS) {
      const road = ROADS[d.id];
      expect(road.startsWith(`M${String(ROAD_START.x)} ${String(ROAD_START.y)}`)).toBe(true);
      expect(pathEnd(road)).toEqual(d.entry);
    }
  });

  it('CityBackdrop draws all six districts with their state and no text', () => {
    const states = Object.fromEntries(DISTRICT_ORDER.map((id, i) => [id, (['solved', 'selected', 'available', 'locked', 'locked', 'locked'] as const)[i]])) as Record<DistrictId, DistrictVisualState>;
    const m = svg(<CityBackdrop states={states} />);
    for (const id of DISTRICT_ORDER) expect(m).toContain(`data-district="${id}"`);
    expect(m).toContain('data-state="selected"');
    expect(m).not.toMatch(/Gradient|<filter|<image/);
    expect(textOf(m)).toBe('');
  });
});
