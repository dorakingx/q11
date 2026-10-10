/**
 * Alarm detector: a short pole with a lamp on top.
 *   Z detector (notices red/X fires) = DIAMOND lamp, red outline, "Z" on the lamp.
 *   X detector (notices blue/Z fires) = SQUARE lamp, blue outline, "X" on the lamp.
 * Ringing = amber lamp + "!" badge + concentric rings. Highlighted = thick orange outline (selected detector).
 * Anchor = base of the pole. Height ≈ 64 units.
 */
import { ART, OUTLINE } from './palette';
import { GroundShadow, LetterBadge, Part, type PartProps } from './primitives';
import { FONT } from './util';

export interface DetectorProps extends PartProps {
  readonly type: 'X' | 'Z';
  readonly ringing?: boolean;
  readonly highlighted?: boolean;
}

const LAMP_Y = -44;
const R = 16;

/** The lamp shape centred at (0, 0). */
function Lamp({ type, ringing, highlighted }: { readonly type: 'X' | 'Z'; readonly ringing: boolean; readonly highlighted: boolean }) {
  const typeColour = type === 'Z' ? ART.fireX : ART.fireZ;
  const fill = ringing ? ART.alarm : ART.paper;
  const stroke = ringing ? ART.alarmDark : typeColour;
  return (
    <g>
      {highlighted ? <circle cx={0} cy={0} r={R + 9} fill="none" stroke={ART.highlight} strokeWidth={OUTLINE * 1.6} /> : null}
      {ringing ? (
        <>
          <circle cx={0} cy={0} r={R + 7} fill="none" stroke={ART.alarmRing} strokeWidth={2.4} />
          <circle cx={0} cy={0} r={R + 13} fill="none" stroke={ART.alarmRing} strokeWidth={1.6} />
        </>
      ) : null}
      {type === 'Z' ? (
        <polygon points={`0,${String(-R)} ${String(R)},0 0,${String(R)} ${String(-R)},0`} fill={fill} stroke={stroke} strokeWidth={OUTLINE} strokeLinejoin="round" />
      ) : (
        <rect x={-R * 0.85} y={-R * 0.85} width={R * 1.7} height={R * 1.7} rx={3} fill={fill} stroke={stroke} strokeWidth={OUTLINE} />
      )}
      {ringing ? (
        <LetterBadge cx={0} cy={0} r={9} letter="!" fill={ART.paper} ink={ART.alarmDark} stroke={ART.alarmDark} />
      ) : (
        <text x={0} y={6.5} textAnchor="middle" fontSize={18} fontWeight={800} fill={typeColour} fontFamily={FONT} style={{ userSelect: 'none' }}>
          {type}
        </text>
      )}
    </g>
  );
}

export function Detector({ type, ringing = false, highlighted = false, ...part }: DetectorProps) {
  return (
    <Part {...part}>
      <GroundShadow cx={0} cy={1} rx={10} ry={3} />
      {highlighted ? <line x1={0} y1={LAMP_Y + R + 9} x2={0} y2={0} stroke={ART.highlight} strokeWidth={9} strokeLinecap="round" /> : null}
      <rect x={-3} y={LAMP_Y + R - 4} width={6} height={-(LAMP_Y + R - 4)} fill={ART.lampPost} stroke={ART.ink} strokeWidth={1.2} />
      <rect x={-9} y={-5} width={18} height={5} rx={1.5} fill={ART.lampPost} stroke={ART.ink} strokeWidth={1.2} />
      <g transform={`translate(0 ${String(LAMP_Y)})`}>
        <Lamp type={type} ringing={ringing} highlighted={highlighted} />
      </g>
    </Part>
  );
}

/** Lamp only (legends, alarm lists). Anchor = lamp centre. */
export function DetectorLamp({ type, ringing = false, highlighted = false, ...part }: DetectorProps) {
  return (
    <Part {...part}>
      <Lamp type={type} ringing={ringing} highlighted={highlighted} />
    </Part>
  );
}
