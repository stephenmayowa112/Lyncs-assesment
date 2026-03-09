import { useState } from "react";
import { $c } from "../utils/format";

export default function BudgetCard({ cat, spent, budget, onBudgetChange }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(String(budget));

  const pct = budget > 0 ? Math.min(spent / budget, 1) : 0;
  const over = spent > budget && budget > 0;
  const remaining = budget - spent;

  const commit = () => {
    const n = parseFloat(val);
    if (!isNaN(n) && n > 0) onBudgetChange(cat.id, n);
    setEditing(false);
  };

  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderLeft: `4px solid ${cat.color}`,
      borderRadius: 12,
      padding: "16px 18px",
      marginBottom: 10,
      transition: "border-color 0.2s",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 17 }}>{cat.icon}</span>
          <span style={{ color: "var(--text-secondary)", fontFamily: "'Archivo',sans-serif", fontWeight: 600, fontSize: 13 }}>{cat.label}</span>
          {over && (
            <span style={{
              background: "#FF505025", color: "#FF5050", fontSize: 9,
              fontFamily: "'DM Mono',monospace", padding: "2px 6px", borderRadius: 20, letterSpacing: 1,
            }}>OVER</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "'DM Mono',monospace", fontSize: 12 }}>
          <span style={{ color: over ? "#FF5050" : cat.color, fontWeight: 700 }}>{$c(spent)}</span>
          <span style={{ color: "var(--text-dimmer)" }}>/</span>
          {editing ? (
            <input
              autoFocus
              type="number"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onBlur={commit}
              onKeyDown={(e) => e.key === "Enter" && commit()}
              style={{
                width: 64, background: "var(--bg-bar)", border: `1px solid ${cat.color}`,
                borderRadius: 4, color: "var(--text)", padding: "2px 5px",
                fontFamily: "'DM Mono',monospace", fontSize: 12, outline: "none",
              }}
            />
          ) : (
            <span
              onClick={() => { setVal(String(budget)); setEditing(true); }}
              title="Click to edit budget"
              style={{ color: "var(--text-muted)", cursor: "pointer", textDecoration: "underline dotted", textUnderlineOffset: 3 }}
            >{$c(budget)}</span>
          )}
        </div>
      </div>

      {/* Bar */}
      <div style={{ height: 5, background: "var(--bg-bar)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct * 100}%`,
          background: over ? "#FF5050" : cat.color,
          borderRadius: 99,
          transition: "width 0.7s cubic-bezier(.4,0,.2,1)",
        }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 7, fontFamily: "'DM Mono',monospace", fontSize: 10, color: "var(--text-dim)" }}>
        <span>{Math.round(pct * 100)}% used</span>
        <span style={{ color: over ? "#FF5050" : "var(--text-dim)" }}>
          {over ? `${$c(Math.abs(remaining))} over` : `${$c(remaining)} remaining`}
        </span>
      </div>
    </div>
  );
}
