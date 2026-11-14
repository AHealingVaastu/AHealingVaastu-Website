/* 3D Vastu scene: a 16-zone Vastu compass lying flat (CSS-tilted, slowly rotating)
 * with the purchased isometric house image hovering above it. Drawn in black ink
 * like a printed Vastu compass: a degree scale, the 16 zones with what each
 * governs, the 16 direction names, and the 32 padas, with spokes to the centre. */

// the 16 zones clockwise from North, each 22.5° wide and centred on its bearing
const ZONES = [
  { name: "NORTH", governs: ["MONEY", "OPPORTUNITIES"] },
  { name: "NNE", governs: ["HEALTH", "IMMUNITY"] },
  { name: "NE", governs: ["CLARITY", "MIND"] },
  { name: "ENE", governs: ["RECREATION", "FUN"] },
  { name: "EAST", governs: ["SOCIAL", "ASSOCIATIONS"] },
  { name: "ESE", governs: ["ANXIETY", "CHURNING"] },
  { name: "SE", governs: ["FIRE", "CASH LIQUIDITY"] },
  { name: "SSE", governs: ["POWER", "CONFIDENCE"] },
  { name: "SOUTH", governs: ["RELAXATION", "FAME"] },
  { name: "SSW", governs: ["EXPENDITURE", "DISPOSAL"] },
  { name: "SW", governs: ["RELATIONSHIP", "SKILL"] },
  { name: "WSW", governs: ["EDUCATION", "SAVINGS"] },
  { name: "WEST", governs: ["GAIN", "PROFITS"] },
  { name: "WNW", governs: ["DEPRESSION", "DETOXIFY"] },
  { name: "NW", governs: ["SUPPORT", "BANKING"] },
  { name: "NNW", governs: ["SEX", "ATTRACTION"] },
];

// the 32 padas, each 11.25° wide, clockwise from N1 at 315°
const PADAS = ["N", "E", "S", "W"].flatMap((d) => Array.from({ length: 8 }, (_, i) => `${d}${i + 1}`));

const INK = "#1C1410"; // the same near-black as the hero paragraph

const R = (deg: number) => (deg * Math.PI) / 180;
const r2 = (n: number) => Math.round(n * 100) / 100; // deterministic → no SSR/CSR hydration drift
// bearing: 0 = North, clockwise, as on a compass
const atBearing = (cx: number, cy: number, r: number, bearing: number): [number, number] => [
  r2(cx + r * Math.cos(R(bearing - 90))),
  r2(cy + r * Math.sin(R(bearing - 90))),
];

/** The flat compass drawing on its own, for layouts that place and animate it themselves. */
export function Compass() {
  const cx = 200;
  const cy = 200;
  // ring radii, outside in
  const rim = 196;
  const scale = 172; // degree scale: rim to here
  const zone = 142; // what each zone governs: scale to here
  const dir = 114; // direction names: zone to here
  const pada = 96; // padas: dir to here

  const radial = (bearing: number, r1: number, r2_: number, w: number, o: number, key: string) => {
    const [x1, y1] = atBearing(cx, cy, r1, bearing);
    const [x2, y2] = atBearing(cx, cy, r2_, bearing);
    return <line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={w} strokeOpacity={o} />;
  };
  // text sits on the ring with its top facing outward
  const label = (text: string, bearing: number, r: number, size: number, weight: number, key: string, o = 1) => (
    <text
      key={key}
      x={cx}
      y={r2(cy - r)}
      transform={`rotate(${bearing} ${cx} ${cy})`}
      fill={INK}
      fillOpacity={o}
      fontSize={size}
      fontWeight={weight}
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily="var(--font-sans), sans-serif"
    >
      {text}
    </text>
  );

  return (
    <svg viewBox="0 0 400 400" aria-hidden="true">
      <defs>
        <radialGradient id="vc-disc" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#F4EDF7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#DED4EF" stopOpacity="0.6" />
        </radialGradient>
      </defs>

      <circle cx={cx} cy={cy} r={rim} fill="url(#vc-disc)" stroke={INK} strokeWidth="1.4" strokeOpacity="0.85" />
      {[scale, zone, dir, pada, 74, 52].map((r) => (
        <circle key={`ring${r}`} cx={cx} cy={cy} r={r} fill="none" stroke={INK} strokeWidth="0.8" strokeOpacity="0.7" />
      ))}

      {/* degree scale: a tick every 2°, longer every 10°, numbered every 10° */}
      {Array.from({ length: 180 }, (_, i) => {
        const b = i * 2;
        return radial(b, rim, b % 10 === 0 ? rim - 7 : rim - 3.5, b % 10 === 0 ? 0.7 : 0.45, 0.7, `tk${b}`);
      })}
      {Array.from({ length: 36 }, (_, i) => label(String(i * 10), i * 10, rim - 15, 7.5, 700, `deg${i}`, 0.85))}

      {/* zone boundaries across the governs and direction rings */}
      {ZONES.map((_, i) => radial(i * 22.5 + 11.25, scale, dir, 0.8, 0.7, `zb${i}`))}
      {ZONES.map((z, i) => (
        <g key={`z${i}`}>
          {label(z.governs[0], i * 22.5, zone + 19, 5.2, 700, `zg0${i}`, 0.85)}
          {label(z.governs[1], i * 22.5, zone + 11, 5.2, 700, `zg1${i}`, 0.85)}
          {label(z.name, i * 22.5, dir + 14, z.name.length > 3 ? 8 : 7.5, 800, `zn${i}`)}
        </g>
      ))}

      {/* padas, and spokes from their boundaries to the centre */}
      {PADAS.map((_, i) => radial(315 + i * 11.25, dir, 0, 0.6, 0.6, `sp${i}`))}
      {PADAS.map((p, i) => label(p, 315 + i * 11.25 + 5.625, pada + 9, 5.6, 700, `pd${i}`))}

      <circle cx={cx} cy={cy} r="5" fill={INK} />
    </svg>
  );
}

export default function VastuCompass({ className = "" }: { className?: string }) {
  return (
    <div className={`vc-scene ${className}`}>
      <div className="vc-compass">
        <Compass />
      </div>
      <div className="vc-shadow" />
      <div className="vc-house">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/iso-home.png" width={500} height={500} alt="A modern home aligned to Vastu directional principles" />
      </div>
    </div>
  );
}
