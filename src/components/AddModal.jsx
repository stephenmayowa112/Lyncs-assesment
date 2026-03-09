import { useState } from "react";
import { CATS } from "../constants";
import { uid } from "../utils/format";

export default function AddModal({ onAdd, onClose, defaultDate }) {
  const [form, setForm] = useState({ category: CATS[0].id, amount: "", description: "", date: defaultDate });
  const [err, setErr] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const cat = CATS.find((c) => c.id === form.category);

  const submit = () => {
    const amount = parseFloat(form.amount);
    if (!amount || amount <= 0) { setErr("Please enter a valid amount."); return; }
    if (!form.date) { setErr("Please select a date."); return; }
    onAdd({ ...form, amount, id: uid() });
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        zIndex: 1000, backdropFilter: "blur(6px)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-body" style={{
        background: "var(--bg-modal)", borderRadius: "22px 22px 0 0",
        padding: "30px 26px 44px", width: "100%", maxWidth: 520,
        border: "1px solid var(--border-hover)", borderBottom: "none",
        animation: "slideUp 0.28s cubic-bezier(.4,0,.2,1)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26 }}>
          <h2 style={{ color: "var(--text)", fontFamily: "'Archivo Black',sans-serif", fontSize: 20, margin: 0 }}>Add Transaction</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 24, lineHeight: 1 }}>×</button>
        </div>

        {/* Category */}
        <div style={{ marginBottom: 22 }}>
          <label style={{ color: "var(--text-muted)", fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: 2, display: "block", marginBottom: 10 }}>CATEGORY</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATS.map((c) => (
              <button
                key={c.id}
                onClick={() => set("category", c.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "8px 13px", borderRadius: 9, cursor: "pointer",
                  fontFamily: "'Archivo',sans-serif", fontWeight: 600, fontSize: 12,
                  border: `1.5px solid ${form.category === c.id ? c.color : "var(--border-hover)"}`,
                  background: form.category === c.id ? c.color + "1a" : "var(--bg-input)",
                  color: form.category === c.id ? c.color : "var(--text-muted)",
                  transition: "all 0.15s",
                }}
              >
                {c.icon} {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: "var(--text-muted)", fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: 2, display: "block", marginBottom: 8 }}>AMOUNT</label>
          <div style={{ position: "relative" }}>
            <span className="modal-dollar" style={{
              position: "absolute", left: 15, top: "50%", transform: "translateY(-50%)",
              color: cat?.color, fontFamily: "'Archivo Black',sans-serif", fontSize: 22,
            }}>$</span>
            <input
              autoFocus
              type="number" min="0" step="0.01" placeholder="0.00"
              value={form.amount}
              onChange={(e) => set("amount", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              className="modal-amount-input"
              style={{
                width: "100%", boxSizing: "border-box",
                background: "var(--bg-input)", borderRadius: 11,
                border: `1.5px solid ${cat?.color}33`,
                color: "var(--text)", padding: "15px 15px 15px 40px",
                fontFamily: "'Archivo Black',sans-serif", fontSize: 26,
                outline: "none", transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = cat?.color)}
              onBlur={(e) => (e.target.style.borderColor = (cat?.color ?? "#fff") + "33")}
            />
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: "var(--text-muted)", fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: 2, display: "block", marginBottom: 8 }}>DESCRIPTION</label>
          <input
            type="text" placeholder="What was this for?"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            style={{
              width: "100%", boxSizing: "border-box",
              background: "var(--bg-input)", border: "1.5px solid var(--border-input)",
              borderRadius: 11, color: "var(--text)", padding: "13px 15px",
              fontFamily: "'Archivo',sans-serif", fontSize: 15, outline: "none",
            }}
          />
        </div>

        {/* Date */}
        <div style={{ marginBottom: 26 }}>
          <label style={{ color: "var(--text-muted)", fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: 2, display: "block", marginBottom: 8 }}>DATE</label>
          <input
            type="date" value={form.date}
            onChange={(e) => set("date", e.target.value)}
            style={{
              width: "100%", boxSizing: "border-box",
              background: "var(--bg-input)", border: "1.5px solid var(--border-input)",
              borderRadius: 11, color: "var(--text)", padding: "13px 15px",
              fontFamily: "'DM Mono',monospace", fontSize: 14,
              outline: "none",
            }}
          />
        </div>

        {err && (
          <div style={{ color: "#FF5050", fontFamily: "'DM Mono',monospace", fontSize: 11, marginBottom: 12 }}>{err}</div>
        )}

        <button
          onClick={submit}
          style={{
            width: "100%", padding: "17px",
            background: cat?.color ?? "#FAFF00", color: "#000",
            border: "none", borderRadius: 12, cursor: "pointer",
            fontFamily: "'Archivo Black',sans-serif", fontSize: 15,
            letterSpacing: 1.5, transition: "opacity 0.15s, transform 0.1s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(0.99)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
        >
          ADD TRANSACTION
        </button>
      </div>
    </div>
  );
}
