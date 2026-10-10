/**
 * Dev-only gallery (gallery.html via gallery-entry.tsx): every art part in every state at 100% and 50% on the
 * cream ground. Not part of the production build (vite only builds index.html).
 */
import type { ReactNode } from 'react';
import type { CrewLetter } from '../../game';
import { CityBackdrop } from './CityBackdrop';
import { CITY_H, CITY_W, DISTRICT_ORDER, type DistrictId, type DistrictVisualState } from './cityLayout';
import { Detector, DetectorLamp } from './detector';
import { CheckMark, Flame, Smoke, SteamPuff } from './fire';
import { nozzleAt } from './crewGeometry';
import { Firefighter, HelmetChip, type CrewPose } from './firefighter';
import { BridgeSpan, ConversionLab, FireStation, House, MemoryTower, MirrorMachine, type HouseState, type HouseVariant } from './houses';
import { ART } from './palette';
import { BridgeLanes, Coupler, Dial, LabLanes, LaneToken, SceneGround, WatchLines, WatchTint } from './scene';
import { REP3_SCENE, RSC3_SCENE, laneGeometry, type SceneLayout } from './sceneLayout';
import { ChapterBadge, Cloud, Flag, FogPatch, Ground, RoadCurve, RoadStraight, Roadblock, SmokePlume, StreetLight, Tree } from './tiles';
import { FireTruck } from './truck';
import { Drop, Splash, Stream } from './water';

interface Spec {
  readonly name: string;
  readonly w: number;
  readonly h: number;
  /** Children positioned with the ground anchor at (w/2, h-10) unless the spec draws its own scene. */
  readonly draw: () => ReactNode;
  readonly scene?: boolean;
}

const LETTERS: readonly CrewLetter[] = ['X', 'Z', 'Y'];
const POSES: readonly CrewPose[] = ['idle', 'run1', 'run2', 'spray'];
const HOUSE_STATES: readonly { label: string; state: HouseState }[] = [
  { label: 'normal', state: { kind: 'normal' } },
  { label: 'fog', state: { kind: 'fog' } },
  { label: 'fire X', state: { kind: 'fire', letter: 'X' } },
  { label: 'fire Z', state: { kind: 'fire', letter: 'Z' } },
  { label: 'fire Y', state: { kind: 'fire', letter: 'Y' } },
  { label: 'out', state: { kind: 'out' } },
  { label: 'restored', state: { kind: 'restored' } },
  { label: 'ghost X', state: { kind: 'ghost', letter: 'X' } },
  { label: 'residual Z', state: { kind: 'residual', letter: 'Z' } },
];

function part(name: string, w: number, h: number, draw: () => ReactNode): Spec {
  return { name, w, h, draw };
}

const SECTIONS: readonly { id: string; title: string; specs: readonly Spec[] }[] = [
  {
    id: 'fire',
    title: 'Fire (X red / Z blue / Y split) · smoke · steam · check',
    specs: [
      ...LETTERS.map((l) => part(`flame ${l}`, 100, 120, () => <Flame letter={l} x={50} y={110} />)),
      part('flame X residual', 100, 120, () => <Flame letter="X" x={50} y={110} residual />),
      part('flame Z ghost', 100, 120, () => <Flame letter="Z" x={50} y={110} ghost />),
      part('smoke', 100, 120, () => <Smoke x={50} y={110} />),
      part('steam', 100, 120, () => <SteamPuff x={50} y={110} />),
      part('check', 100, 120, () => <CheckMark x={50} y={110} />),
    ],
  },
  {
    id: 'water',
    title: 'Water (pale cyan, round drops) · stream · splash',
    specs: [
      part('stream 50%', 220, 120, () => <Stream from={{ x: 20, y: 70 }} to={{ x: 200, y: 108 }} progress={0.5} />),
      part('stream 100%', 220, 120, () => <Stream from={{ x: 20, y: 70 }} to={{ x: 200, y: 108 }} />),
      part('splash', 120, 120, () => <Splash x={60} y={100} />),
      part('splash spread .4', 120, 120, () => <Splash x={60} y={100} spread={0.4} />),
      part('drop', 100, 120, () => <Drop x={50} y={100} />),
    ],
  },
  {
    id: 'crews',
    title: 'Crews (helmet letter) · idle / run 1 / run 2 / spray',
    specs: [
      ...LETTERS.flatMap((l) => POSES.map((p) => part(`${l} ${p}`, 100, 120, () => <Firefighter letter={l} pose={p} x={50} y={110} />))),
      part('Z spray facing left', 100, 120, () => <Firefighter letter="Z" pose="spray" facing={-1} x={50} y={110} />),
      ...LETTERS.map((l) => part(`chip ${l}`, 100, 120, () => <HelmetChip letter={l} x={50} y={100} />)),
    ],
  },
  {
    id: 'truck',
    title: 'Fire truck',
    specs: [
      part('truck', 200, 120, () => <FireTruck x={100} y={110} />),
      part('truck lights', 200, 120, () => <FireTruck x={100} y={110} lights wheelFrame={1} />),
      part('truck left', 200, 120, () => <FireTruck x={100} y={110} facing={-1} />),
    ],
  },
  {
    id: 'detectors',
    title: 'Detectors (Z = diamond, X = square) · quiet / ringing / highlighted',
    specs: [
      ...(['Z', 'X'] as const).flatMap((t) => [
        part(`${t} quiet`, 100, 120, () => <Detector type={t} x={50} y={110} />),
        part(`${t} ringing`, 100, 120, () => <Detector type={t} x={50} y={110} ringing />),
        part(`${t} highlighted`, 100, 120, () => <Detector type={t} x={50} y={110} highlighted />),
        part(`${t} ringing+hl`, 100, 120, () => <Detector type={t} x={50} y={110} ringing highlighted />),
      ]),
      part('lamp Z', 100, 120, () => <DetectorLamp type="Z" x={50} y={60} />),
      part('lamp X ringing', 100, 120, () => <DetectorLamp type="X" x={50} y={60} ringing />),
    ],
  },
  {
    id: 'houses',
    title: 'Houses · small / tall / shop × states',
    specs: (['small', 'tall', 'shop'] as const).flatMap((v: HouseVariant) => [
      ...HOUSE_STATES.map((s, i) => part(`${v} ${s.label}`, 130, 180, () => <House variant={v} state={s.state} tint={i} x={60} y={166} />)),
      part(`${v} selected`, 130, 180, () => <House variant={v} selected tint={1} x={60} y={166} />),
    ]),
  },
  {
    id: 'special',
    title: 'Memory tower · fire station · conversion lab · bridge',
    specs: [
      part('tower', 140, 220, () => <MemoryTower x={64} y={210} />),
      part('tower lit', 140, 220, () => <MemoryTower x={64} y={210} lit />),
      part('tower anomaly X', 140, 220, () => <MemoryTower x={64} y={210} anomaly="X" />),
      part('tower anomaly Z', 140, 220, () => <MemoryTower x={64} y={210} anomaly="Z" />),
      part('tower anomaly Y', 140, 220, () => <MemoryTower x={64} y={210} anomaly="Y" />),
      part('station', 200, 150, () => <FireStation x={94} y={140} />),
      part('station open', 200, 150, () => <FireStation x={94} y={140} open />),
      part('lab', 180, 150, () => <ConversionLab x={84} y={140} />),
      part('lab active', 180, 150, () => <ConversionLab x={84} y={140} active />),
      part('mirror machine', 100, 120, () => <MirrorMachine x={50} y={100} />),
      part('bridge span', 220, 100, () => <BridgeSpan x={110} y={80} width={180} />),
    ],
  },
  {
    id: 'tiles',
    title: 'Tiles · tree · street light · flag · roadblock · fog · smoke plume · cloud · badge · roads',
    specs: [
      part('tree', 100, 120, () => <Tree x={50} y={110} />),
      part('street light', 100, 120, () => <StreetLight x={50} y={110} />),
      part('street light lit', 100, 120, () => <StreetLight x={50} y={110} lit />),
      part('flag', 100, 120, () => <Flag x={40} y={110} />),
      part('roadblock', 100, 120, () => <Roadblock x={50} y={110} />),
      part('fog patch', 140, 120, () => <FogPatch x={10} y={20} width={120} height={80} />),
      part('smoke plume', 120, 160, () => <SmokePlume x={50} y={150} />),
      part('cloud', 140, 100, () => <Cloud x={70} y={70} />),
      part('badge', 100, 120, () => <ChapterBadge x={50} y={100} />),
      part('badge unearned', 100, 120, () => <ChapterBadge x={50} y={100} earned={false} />),
      part('road straight', 200, 100, () => <RoadStraight x1={0} y1={50} x2={200} y2={50} />),
      part('road curve', 160, 160, () => <RoadCurve x1={0} y1={80} cx={80} cy={80} x2={80} y2={160} />),
    ],
  },
  {
    id: 'scenes',
    title: 'Scenes · rsc3 (detector Z0 tapped) · rep3 · bridge lanes (CNOT) · lab lanes (H, S)',
    specs: [
      { name: 'rsc3 challenge (fog)', w: RSC3_SCENE.width, h: RSC3_SCENE.height, scene: true, draw: () => <Rsc3Demo layout={RSC3_SCENE} mode="challenge" /> },
      { name: 'rsc3 result mix', w: RSC3_SCENE.width, h: RSC3_SCENE.height, scene: true, draw: () => <Rsc3Demo layout={RSC3_SCENE} mode="result" /> },
      { name: 'rep3 training', w: REP3_SCENE.width, h: REP3_SCENE.height, scene: true, draw: () => <Rep3Demo /> },
      { name: 'bridge lanes', w: 600, h: 260, scene: true, draw: () => <BridgeDemo /> },
      { name: 'lab lanes', w: 600, h: 260, scene: true, draw: () => <LabDemo /> },
      { name: 'spray moment', w: 320, h: 200, scene: true, draw: () => <SprayDemo /> },
    ],
  },
];

const RSC3_WATCH_Z0 = [0, 1, 3, 4];

function Rsc3Demo({ layout, mode }: { readonly layout: SceneLayout; readonly mode: 'challenge' | 'result' }) {
  const z0 = layout.detectors.find((d) => d.id === 'Z0');
  const stateFor = (q: number): HouseState => {
    if (mode === 'challenge') return { kind: 'fog' };
    const table: Record<number, HouseState> = { 0: { kind: 'out' }, 1: { kind: 'fire', letter: 'X' }, 2: { kind: 'ghost', letter: 'Z' }, 4: { kind: 'residual', letter: 'Y' }, 7: { kind: 'restored' } };
    return table[q] ?? { kind: 'normal' };
  };
  const ringing = new Set(mode === 'challenge' ? ['Z0', 'Z1'] : ['Z0', 'Z2', 'X0', 'X1']);
  return (
    <g>
      <SceneGround layout={layout} />
      {mode === 'challenge' && z0 !== undefined ? layout.houses.filter((h) => RSC3_WATCH_Z0.includes(h.q)).map((h) => <WatchTint key={h.q} x={h.x} y={h.y} />) : null}
      {layout.houses.map((h) => (
        <House key={h.q} x={h.x} y={h.y} tint={h.q} state={stateFor(h.q)} scale={0.85} />
      ))}
      {mode === 'challenge' && z0 !== undefined ? <WatchLines from={z0.lamp} to={layout.houses.filter((h) => RSC3_WATCH_Z0.includes(h.q))} /> : null}
      {layout.detectors.map((d) => (
        <Detector key={d.id} type={d.type} x={d.x} y={d.y} ringing={ringing.has(d.id)} highlighted={mode === 'challenge' && d.id === 'Z0'} scale={0.8} />
      ))}
      {mode === 'result' ? <Firefighter letter="X" pose="spray" x={layout.houses[0]!.x - 70} y={layout.houses[0]!.y} scale={0.75} /> : null}
    </g>
  );
}

function Rep3Demo() {
  const l = REP3_SCENE;
  return (
    <g>
      <SceneGround layout={l} />
      {l.houses.map((h) => (
        <House key={h.q} x={h.x} y={h.y} tint={h.q} state={h.q === 0 ? { kind: 'fire', letter: 'X' } : { kind: 'normal' }} scale={0.85} />
      ))}
      {l.detectors.map((d) => (
        <Detector key={d.id} type={d.type} x={d.x} y={d.y} ringing={d.id === 'Z0'} scale={0.8} />
      ))}
    </g>
  );
}

function BridgeDemo() {
  const g = laneGeometry(2);
  return (
    <g>
      <BridgeLanes geometry={g} />
      <Coupler x={g.stepX(0, 1)} controlY={g.laneY(0)} targetY={g.laneY(1)} active />
      <LaneToken letter="X" x={g.inX} y={g.laneY(0) - 6} />
      <LaneToken letter="Z" x={g.inX} y={g.laneY(1) - 6} />
      <LaneToken letter="Y" x={g.outX} y={g.laneY(0) - 6} />
      <LaneToken letter="Y" x={g.outX} y={g.laneY(1) - 6} />
    </g>
  );
}

function LabDemo() {
  const g = laneGeometry(2);
  return (
    <g>
      <LabLanes geometry={g} />
      <MirrorMachine x={g.stepX(0, 3)} y={g.laneY(0) + 24} scale={0.9} active />
      <Coupler x={g.stepX(1, 3)} controlY={g.laneY(0)} targetY={g.laneY(1)} />
      <MirrorMachine x={g.stepX(2, 3)} y={g.laneY(1) + 24} scale={0.9} />
      <Dial x={g.stepX(2, 3)} y={g.laneY(0)} />
      <LaneToken letter="Z" x={g.inX} y={g.laneY(0) - 6} />
      <LaneToken letter="X" x={g.outX} y={g.laneY(0) - 6} />
      <LaneToken letter="Z" x={g.outX} y={g.laneY(1) - 6} />
    </g>
  );
}

function SprayDemo() {
  const ff = { x: 70, y: 180 };
  const target = { x: 220, y: 92 };
  return (
    <g>
      <Ground width={320} height={200} rx={18} />
      <House x={220} y={180} tint={2} state={{ kind: 'fire', letter: 'X' }} />
      <Firefighter letter="X" pose="spray" x={ff.x} y={ff.y} />
      <Stream from={nozzleAt(ff.x, ff.y)} to={target} />
      <Splash x={target.x} y={target.y} spread={0.8} />
    </g>
  );
}

const CITY_SETS: readonly { label: string; states: Readonly<Record<DistrictId, DistrictVisualState>> }[] = [
  { label: 'start: station-row available, rest locked', states: cityStates(['available', 'locked', 'locked', 'locked', 'locked', 'locked']) },
  { label: 'mid: three solved, central selected, two locked', states: cityStates(['solved', 'solved', 'solved', 'selected', 'locked', 'locked']) },
  { label: 'late: five solved, old-town available', states: cityStates(['solved', 'solved', 'solved', 'solved', 'solved', 'available']) },
  { label: 'all solved', states: cityStates(['solved', 'solved', 'solved', 'solved', 'solved', 'solved']) },
];

function cityStates(list: readonly DistrictVisualState[]): Readonly<Record<DistrictId, DistrictVisualState>> {
  const out = {} as Record<DistrictId, DistrictVisualState>;
  DISTRICT_ORDER.forEach((id, i) => {
    out[id] = list[i] ?? 'locked';
  });
  return out;
}

function Tile({ spec, scale }: { readonly spec: Spec; readonly scale: number }) {
  return (
    <figure style={{ margin: 0, display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg width={spec.w * scale} height={spec.h * scale} viewBox={`0 0 ${String(spec.w)} ${String(spec.h)}`} style={{ background: spec.scene ? 'transparent' : ART.sand, border: `1px dashed ${ART.sandDark}`, borderRadius: 6, display: 'block' }}>
        {spec.draw()}
      </svg>
      <figcaption style={{ fontSize: 11, color: ART.inkSoft }}>{spec.name}</figcaption>
    </figure>
  );
}

export function Gallery() {
  return (
    <main style={{ padding: 16, maxWidth: 1700, margin: '0 auto' }}>
      <h1 style={{ fontSize: 20, margin: '0 0 4px' }}>Q11 art gallery (dev only)</h1>
      <p style={{ margin: '0 0 16px', color: ART.inkSoft, fontSize: 13 }}>Every part in every state at 100% (left group) and 50% (right group). Cream ground = the scene floor.</p>
      {SECTIONS.map((s) => (
        <section key={s.id} data-section={s.id} style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 15, margin: '0 0 8px' }}>{s.title}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'flex-end' }}>
            {s.specs.map((sp) => (
              <Tile key={sp.name} spec={sp} scale={1} />
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'flex-end', marginTop: 8 }}>
            {s.specs.map((sp) => (
              <Tile key={`${sp.name}-50`} spec={sp} scale={0.5} />
            ))}
          </div>
        </section>
      ))}
      <section data-section="city" style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 15, margin: '0 0 8px' }}>City backdrop (1600 × 1000) · locked / available / selected / solved</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {CITY_SETS.map((c) => (
            <figure key={c.label} data-city={c.label} style={{ margin: 0 }}>
              <svg width={800} height={500} viewBox={`0 0 ${String(CITY_W)} ${String(CITY_H)}`} style={{ display: 'block', borderRadius: 8, border: `1px solid ${ART.sandDark}` }}>
                <CityBackdrop states={c.states} />
              </svg>
              <figcaption style={{ fontSize: 12, color: ART.inkSoft }}>{c.label}</figcaption>
            </figure>
          ))}
          <figure style={{ margin: 0 }}>
            <svg width={400} height={250} viewBox={`0 0 ${String(CITY_W)} ${String(CITY_H)}`} style={{ display: 'block', borderRadius: 8, border: `1px solid ${ART.sandDark}` }}>
              <CityBackdrop states={CITY_SETS[1]!.states} />
            </svg>
            <figcaption style={{ fontSize: 12, color: ART.inkSoft }}>mid set at 25% (phone width)</figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}
