import { CATS } from "../constants";

export default function TxRow({ tx, onDelete, fmt }) {
  const cat = CATS.find((c) => c.id === tx.category);
  const d = new Date(tx.date + "T00:00:00");
  const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "10px 0", borderBottom: "1px solid var(--border-light)",
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
        background: (cat?.color ?? "#888") + "18",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
      }}>
        {cat?.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          color: "var(--text-body)", fontSize: 13, fontFamily: "'Archivo',sans-serif", fontWeight: 500,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {tx.description || cat?.label}
        </div>
        <div style={{ color: "var(--text-dim)", fontSize: 10, fontFamily: "'DM Mono',monospace", marginTop: 2 }}>
          {dateStr} ·{" "}
          <span style={{ color: (cat?.color ?? "#888") + "cc" }}>{cat?.label}</span>
        </div>
      </div>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#FF5050", fontWeight: 700, flexShrink: 0 }}>
        −{fmt(tx.amount, 2)}
      </div>
      <button
        onClick={() => onDelete(tx.id)}
        title="Delete"
        style={{
          background: "none", border: "none", color: "var(--text-faint)", cursor: "pointer",
          fontSize: 18, lineHeight: 1, padding: "3px 5px", borderRadius: 4,
          transition: "color 0.15s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#FF5050")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-faint)")}
      >
        ×
      </button>
    </div>
  );
}
