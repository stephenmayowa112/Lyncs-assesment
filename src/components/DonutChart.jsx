import { CATS } from "../constants";
import { $c } from "../utils/format";

function polar(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function arc(cx, cy, R, r, a, b) {
  const [sx, sy] = polar(cx, cy, R, a);
  const [ex, ey] = polar(cx, cy, R, b);
  const [ix, iy] = polar(cx, cy, r, b);
  const [jx, jy] = polar(cx, cy, r, a);
  const lg = b - a > 180 ? 1 : 0;
  return `M${sx},${sy} A${R},${R} 0 ${lg},1 ${ex},${ey} L${ix},${iy} A${r},${r} 0 ${lg},0 ${jx},${jy}Z`;
}

export default function DonutChart({ catTotals, totalSpent }) {
  const cx = 100, cy = 100, R = 84, r = 58;

  if (totalSpent === 0) {
    return (
      <svg viewBox="0 0 200 200" style={{ width: "100%", maxWidth: 200, display: "block", margin: "0 auto" }}>
        <circle cx={cx} cy={cy} r={(R + r) / 2} fill="none" style={{ stroke: "var(--border)" }} strokeWidth={R - r + 1} />
        <text x={cx} y={cy + 4} textAnchor="middle" style={{ fill: "var(--text-dim)" }} fontSize={10} fontFamily="'DM Mono',monospace">no data yet</text>
      </svg>
    );
  }

  let cursor = 1;
  const segments = [];
  CATS.forEach((cat) => {
    const pct = catTotals[cat.id] / totalSpent;
    if (pct <= 0.001) return;
    const sweep = pct * 354;
    segments.push({ cat, start: cursor, end: cursor + sweep });
    cursor += sweep + 2;
  });

  return (
    <svg viewBox="0 0 200 200" style={{ width: "100%", maxWidth: 200, display: "block", margin: "0 auto" }}>
      <circle cx={cx} cy={cy} r={(R + r) / 2} fill="none" style={{ stroke: "var(--border)" }} strokeWidth={R - r + 2} />
      {segments.map(({ cat, start, end }) => (
        <path key={cat.id} d={arc(cx, cy, R, r, start, end)} fill={cat.color} style={{ transition: "opacity 0.3s" }}>
          <title>{cat.label}: {$c(catTotals[cat.id])}</title>
        </path>
      ))}
      <text x={cx} y={cy - 10} textAnchor="middle" style={{ fill: "var(--text-muted)" }} fontSize={8} fontFamily="'DM Mono',monospace" letterSpacing="2">SPENT</text>
      <text x={cx} y={cy + 13} textAnchor="middle" style={{ fill: "var(--text)" }} fontSize={19} fontFamily="'Archivo Black',sans-serif">{$c(totalSpent)}</text>
    </svg>
  );
}
