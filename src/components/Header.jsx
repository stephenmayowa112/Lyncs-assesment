import { MONTHS } from "../constants";
import { $c } from "../utils/format";

export default function Header({ mo, yr, data, editingIncome, incomeVal, setIncomeVal, setEditingIncome, commitIncome, navMonth, isDark, toggleTheme }) {
  return (
    <header className="app-header" style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "18px 28px", borderBottom: "1px solid var(--border-light)",
      position: "sticky", top: 0, zIndex: 50, background: "var(--bg)",
      gap: 16,
    }}>
      {/* Logo */}
      <div className="header-logo">
        <div className="header-logo-text" style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 21, letterSpacing: 2 }}>
          <span style={{ color: "#FAFF00" }}>FIN</span>
          <span style={{ color: "var(--text)" }}>SNAP</span>
        </div>
        <div style={{ color: "var(--text-dimmer)", fontSize: 9, fontFamily: "'DM Mono',monospace", letterSpacing: 3, marginTop: 1 }}>PERSONAL FINANCE</div>
      </div>

      {/* Month nav */}
      <div className="header-nav" style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button
          onClick={() => navMonth(-1)}
          style={{ background: "var(--bg-input)", border: "1px solid var(--border-hover)", color: "var(--text)", borderRadius: 8, width: 34, height: 34, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bg-input)")}
        >‹</button>
        <div style={{ textAlign: "center", minWidth: 140 }}>
          <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 16 }}>{MONTHS[mo]}</div>
          <div style={{ color: "var(--text-dim)", fontSize: 11, fontFamily: "'DM Mono',monospace" }}>{yr}</div>
        </div>
        <button
          onClick={() => navMonth(1)}
          style={{ background: "var(--bg-input)", border: "1px solid var(--border-hover)", color: "var(--text)", borderRadius: 8, width: 34, height: 34, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bg-input)")}
        >›</button>
      </div>

      {/* Theme toggle + Income */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button
          onClick={toggleTheme}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            background: "var(--bg-input)", border: "1px solid var(--border-hover)",
            borderRadius: 8, width: 34, height: 34, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, transition: "background 0.15s", color: "var(--text)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bg-input)")}
        >
          {isDark ? "☀" : "🌙"}
        </button>
        <div className="header-income" style={{ textAlign: "right" }}>
          <div style={{ color: "var(--text-dim)", fontSize: 9, fontFamily: "'DM Mono',monospace", letterSpacing: 2 }}>MONTHLY INCOME</div>
          {editingIncome ? (
            <input
              autoFocus
              type="number"
              value={incomeVal}
              onChange={(e) => setIncomeVal(e.target.value)}
              onBlur={commitIncome}
              onKeyDown={(e) => e.key === "Enter" && commitIncome()}
              style={{
                background: "var(--bg-input)", border: "1px solid #00FFB2",
                borderRadius: 7, color: "#00FFB2", padding: "4px 10px",
                fontFamily: "'Archivo Black',sans-serif", fontSize: 20,
                outline: "none", width: 130, textAlign: "right", marginTop: 2,
              }}
            />
          ) : (
            <div
              onClick={() => { setIncomeVal(String(data.income)); setEditingIncome(true); }}
              title="Click to edit income"
              className="header-income-value"
              style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 22, color: "#00FFB2", cursor: "pointer", marginTop: 2 }}
            >
              {$c(data.income)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
