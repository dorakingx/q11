/**
 * The miniature city: sky, ground, river, roads, fire station and the six districts drawn in their visual
 * states. Pure SVG — the clickable district <button>s and labels are HTML laid over this by src/ui/city.
 */
import { BridgeSpan, ConversionLab, FireStation, House, MemoryTower } from './houses';
import { ART, OUTLINE } from './palette';
import { AVENUE_Y, CITY_H, CITY_W, DISTRICTS, HORIZON_Y, RIVER_W, RIVER_X, ROAD_NETWORK, ROAD_W, STATION, type DistrictBox, type DistrictId, type DistrictVisualState } from './cityLayout';
import { Cloud, Flag, FogPatch, Ground, GrassPatch, River, RoadPath, Roadblock, SmokePlume, StreetLight, Tree } from './tiles';

export interface CityBackdropProps {
  readonly states: Readonly<Record<DistrictId, DistrictVisualState>>;
  /** Draw the per-district highlight for the selected one (default true). */
  readonly showSelection?: boolean;
}

export function CityBackdrop({ states, showSelection = true }: CityBackdropProps) {
  const anySolved = Object.values(states).some((s) => s === 'solved');
  return (
    <g>
      {/* sky + ground */}
      <rect x={0} y={0} width={CITY_W} height={HORIZON_Y} fill={ART.sky} />
      <path d={`M0 ${String(HORIZON_Y)} Q200 110 420 ${String(HORIZON_Y - 20)} T840 ${String(HORIZON_Y - 10)} T1260 ${String(HORIZON_Y - 30)} T1600 ${String(HORIZON_Y - 6)} V${String(HORIZON_Y + 40)} H0 Z`} fill={ART.grassDark} />
      <Ground x={0} y={HORIZON_Y + 30} width={CITY_W} height={CITY_H - HORIZON_Y - 30} />
      <Cloud x={260} y={80} size={0.9} />
      <Cloud x={1180} y={70} size={1.1} />
      <Cloud x={1480} y={110} size={0.7} />
      <GrassPatch cx={300} cy={880} rx={200} ry={70} />
      <GrassPatch cx={1140} cy={900} rx={160} ry={50} />
      <GrassPatch cx={620} cy={400} rx={150} ry={60} />
      {/* river */}
      <River d={`M${String(RIVER_X)} ${String(HORIZON_Y + 10)} V${String(CITY_H)}`} width={RIVER_W} />
      {/* roads */}
      {ROAD_NETWORK.map((d) => (
        <RoadPath key={d} d={d} width={ROAD_W} />
      ))}
      {/* park */}
      <Tree x={240} y={880} />
      <Tree x={300} y={920} size={0.8} />
      <Tree x={380} y={870} size={1.1} />
      <Tree x={460} y={930} size={0.9} />
      <Tree x={560} y={880} />
      <Tree x={630} y={340} size={0.8} />
      <Tree x={700} y={420} />
      {[320, 560, 860, 1240, 1520].map((x) => (
        <StreetLight key={x} x={x} y={AVENUE_Y + 50} lit={anySolved} />
      ))}
      {/* station */}
      <FireStation x={STATION.x + STATION.w / 2} y={STATION.y + STATION.h} open />
      {/* districts */}
      {DISTRICTS.map((d) => (
        <District key={d.id} box={d} state={states[d.id]} showSelection={showSelection} />
      ))}
    </g>
  );
}

function District({ box, state, showSelection }: { readonly box: DistrictBox; readonly state: DistrictVisualState; readonly showSelection: boolean }) {
  const solved = state === 'solved';
  return (
    <g data-district={box.id} data-state={state}>
      {state === 'selected' && showSelection ? <rect x={box.x - 8} y={box.y - 8} width={box.w + 16} height={box.h + 16} rx={18} fill={ART.alarmRing} fillOpacity={0.25} stroke={ART.highlight} strokeWidth={OUTLINE * 2} strokeDasharray="14 8" /> : null}
      <DistrictArt id={box.id} box={box} solved={solved} />
      {state === 'available' || state === 'selected' ? (
        <>
          <SmokePlume x={box.smoke.x} y={box.smoke.y} scale={0.9} />
          <Flag x={box.gate.x} y={box.gate.y} />
        </>
      ) : null}
      {state === 'locked' ? (
        <>
          <FogPatch x={box.x} y={box.y} width={box.w} height={box.h} />
          <Roadblock x={box.block.x} y={box.block.y} />
        </>
      ) : null}
    </g>
  );
}

function DistrictArt({ id, box, solved }: { readonly id: DistrictId; readonly box: DistrictBox; readonly solved: boolean }) {
  const st = solved ? ({ kind: 'restored' } as const) : ({ kind: 'normal' } as const);
  const base = box.y + box.h - 20;
  switch (id) {
    case 'station-row':
      return (
        <g>
          <House x={box.x + 65} y={base} tint={0} state={st} scale={0.9} />
          <House x={box.x + 145} y={base} tint={1} state={st} scale={0.9} />
          <House x={box.x + 225} y={base} tint={2} state={st} scale={0.9} />
          {solved ? <Tree x={box.x + 24} y={base + 6} size={0.7} /> : null}
        </g>
      );
    case 'bridge':
      return <BridgeSpan x={RIVER_X} y={AVENUE_Y + ROAD_W / 2 + 2} width={170} />;
    case 'lab':
      return (
        <g>
          <ConversionLab x={box.x + 120} y={base} active={solved} />
          <House x={box.x + 220} y={base} variant="small" tint={5} state={st} scale={0.8} />
        </g>
      );
    case 'central':
      return (
        <g>
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => <House key={`${String(r)}-${String(c)}`} x={box.x + 70 + c * 82} y={box.y + 92 + r * 70} tint={(r * 3 + c) % 6} state={st} scale={0.62} />),
          )}
        </g>
      );
    case 'market':
      return (
        <g>
          <House x={box.x + 80} y={base} variant="shop" tint={2} state={st} scale={0.9} />
          <House x={box.x + 182} y={base} variant="shop" tint={4} state={st} scale={0.9} />
          {solved ? <Tree x={box.x + 24} y={base - 60} size={0.7} /> : null}
        </g>
      );
    case 'old-town':
      return (
        <g>
          <MemoryTower x={box.x + 60} y={base + 4} lit={solved} />
          <House x={box.x + 152} y={base} variant="tall" tint={3} state={st} />
          <House x={box.x + 232} y={base} variant="tall" tint={5} state={st} />
        </g>
      );
  }
}
