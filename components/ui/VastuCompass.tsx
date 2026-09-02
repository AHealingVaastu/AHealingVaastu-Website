/* 3D Vastu scene: an 8-direction compass lying flat (CSS-tilted, slowly rotating)
 * with the purchased isometric house image hovering above it. */

const DIRS = [
  { label: "N", angle: -90, major: true },
  { label: "NE", angle: -45, major: false },
  { label: "E", angle: 0, major: true },
  { label: "SE", angle: 45, major: false },
  { label: "S", angle: 90, major: true },
  { label: "SW", angle: 135, major: false },
  { label: "W", angle: 180, major: true },
  { label: "NW", angle: -135, major: false },
];

const R = (deg: number) => (deg * Math.PI) / 180;
const r2 = (n: number) => Math.round(n * 100) / 100; // deterministic → no SSR/CSR hydration drift
const onCircle = (cx: number, cy: number, r: number, deg: number): [number, number] => [
  r2(cx + r * Math.cos(R(deg))),
  r2(cy + r * Math.sin(R(deg))),
];

function Compass() {
  const cx = 200;
  const cy = 200;
  const octagon = DIRS.map((d) => onCircle(cx, cy, 176, d.angle).join(",")).join(" ");
  const starOuter = 150;
  const starInner = 42;

  return (
    <svg viewBox="0 0 400 400" aria-hidden="true">
      <defs>
        <radialGradient id="vc-disc" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDEFCB" stopOpacity="0.32" />
          <stop offset="60%" stopColor="#6E2BA6" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#1E0838" stopOpacity="0.42" />
        </radialGradient>
        <linearGradient id="vc-nstar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF0C4" />
          <stop offset="100%" stopColor="#C9A84C" />
        </linearGradient>
      </defs>

      <circle cx={cx} cy={cy} r="190" fill="url(#vc-disc)" stroke="#F2DDA6" strokeWidth="1.6" strokeOpacity="0.75" />
      <circle cx={cx} cy={cy} r="180" fill="none" stroke="#F2DDA6" strokeWidth="0.7" strokeOpacity="0.4" />
      <circle cx={cx} cy={cy} r="120" fill="none" stroke="#F2DDA6" strokeWidth="0.7" strokeOpacity="0.45" />

      <polygon points={octagon} fill="none" stroke="#F2DDA6" strokeWidth="1.3" strokeOpacity="0.8" />

      {/* Vastu 9-grid hint */}
      <g stroke="#F2DDA6" strokeWidth="0.5" strokeOpacity="0.25">
        {[-60, -20, 20, 60].map((o) => (
          <line key={`v${o}`} x1={cx + o} y1={cy - 90} x2={cx + o} y2={cy + 90} />
        ))}
        {[-60, -20, 20, 60].map((o) => (
          <line key={`h${o}`} x1={cx - 90} y1={cy + o} x2={cx + 90} y2={cy + o} />
        ))}
      </g>

      {/* spokes */}
      {DIRS.map((d) => {
        const [x2, y2] = onCircle(cx, cy, 176, d.angle);
        return <line key={`sp${d.label}`} x1={cx} y1={cy} x2={x2} y2={y2} stroke="#F2DDA6" strokeWidth={d.major ? 1 : 0.6} strokeOpacity={d.major ? 0.55 : 0.32} />;
      })}
      {/* ticks */}
      {Array.from({ length: 72 }).map((_, i) => {
        const a = i * 5;
        const [x1, y1] = onCircle(cx, cy, 186, a);
        const [x2, y2] = onCircle(cx, cy, i % 2 === 0 ? 176 : 181, a);
        return <line key={`t${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F2DDA6" strokeWidth="0.6" strokeOpacity="0.45" />;
      })}

      {/* 8-point compass star */}
      {DIRS.map((d, i) => {
        const [tx, ty] = onCircle(cx, cy, d.major ? starOuter : starOuter * 0.6, d.angle);
        const [lx, ly] = onCircle(cx, cy, starInner, d.angle - 22.5);
        const [rx, ry] = onCircle(cx, cy, starInner, d.angle + 22.5);
        return (
          <polygon
            key={`star${i}`}
            points={`${tx},${ty} ${lx},${ly} ${cx},${cy} ${rx},${ry}`}
            fill={d.label === "N" ? "url(#vc-nstar)" : "#C9A84C"}
            fillOpacity={d.major ? 0.42 : 0.2}
            stroke="#F2DDA6"
            strokeWidth="0.8"
            strokeOpacity="0.65"
          />
        );
      })}

      {/* North arrow */}
      {(() => {
        const [nx, ny] = onCircle(cx, cy, 158, -90);
        return <polygon points={`${nx},${ny} ${cx - 10},${cy - 116} ${cx + 10},${cy - 116}`} fill="url(#vc-nstar)" />;
      })()}

      {/* hub */}
      <circle cx={cx} cy={cy} r="10" fill="#C9A84C" fillOpacity="0.6" stroke="#F4E3B0" strokeWidth="1.2" />
      <circle cx={cx} cy={cy} r="3.5" fill="#FFF6DC" />

      {/* labels */}
      {DIRS.map((d) => {
        const [lx, ly] = onCircle(cx, cy, 165, d.angle);
        return (
          <text
            key={`lb${d.label}`}
            x={lx}
            y={ly}
            fill={d.label === "N" ? "#FFF6DC" : "#F2DDA6"}
            fillOpacity={d.major ? 1 : 0.7}
            fontSize={d.major ? 17 : 12}
            fontWeight="700"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="var(--font-hanken), sans-serif"
          >
            {d.label}
          </text>
        );
      })}
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
        <img src="/iso-home.png" alt="A modern home aligned to Vastu directional principles" />
      </div>
    </div>
  );
}
