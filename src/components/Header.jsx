import { MONTHS } from "../constants";
import { $c } from "../utils/format";

export default function Header({ mo, yr, data, editingIncome, incomeVal, setIncomeVal, setEditingIncome, commitIncome, navMonth }) {
  return (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "18px 28px", borderBottom: "1px solid #161616",
      position: "sticky", top: 0, zIndex: 50, background: "#080808",
      gap: 16,
    }}>
      {/* Logo */}
      <div>
        <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 21, letterSpacing: 2 }}>
          <span style={{ color: "#FAFF00" }}>FIN</span>
          <span style={{ color: "#fff" }}>SNAP</span>
        </div>
        <div style={{ color: "#333", fontSize: 9, fontFamily: "'DM Mono',monospace", letterSpacing: 3, marginTop: 1 }}>PERSONAL FINANCE</div>
      </div>

      {/* Month nav */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button
          onClick={() => navMonth(-1)}
          style={{ background: "#161616", border: "1px solid #222", color: "#fff", borderRadius: 8, width: 34, height: 34, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#222")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#161616")}
        >‹</button>
        <div style={{ textAlign: "center", minWidth: 140 }}>
          <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 16 }}>{MONTHS[mo]}</div>
          <div style={{ color: "#444", fontSize: 11, fontFamily: "'DM Mono',monospace" }}>{yr}</div>
        </div>
        <button
          onClick={() => navMonth(1)}
          style={{ background: "#161616", border: "1px solid #222", color: "#fff", borderRadius: 8, width: 34, height: 34, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#222")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#161616")}
        >›</button>
      </div>

      {/* Income */}
      <div style={{ textAlign: "right" }}>
        <div style={{ color: "#444", fontSize: 9, fontFamily: "'DM Mono',monospace", letterSpacing: 2 }}>MONTHLY INCOME</div>
        {editingIncome ? (
          <input
            autoFocus
            type="number"
            value={incomeVal}
            onChange={(e) => setIncomeVal(e.target.value)}
            onBlur={commitIncome}
            onKeyDown={(e) => e.key === "Enter" && commitIncome()}
            style={{
              background: "#161616", border: "1px solid #00FFB2",
              borderRadius: 7, color: "#00FFB2", padding: "4px 10px",
              fontFamily: "'Archivo Black',sans-serif", fontSize: 20,
              outline: "none", width: 130, textAlign: "right", marginTop: 2,
            }}
          />
        ) : (
          <div
            onClick={() => { setIncomeVal(String(data.income)); setEditingIncome(true); }}
            title="Click to edit income"
            style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 22, color: "#00FFB2", cursor: "pointer", marginTop: 2 }}
          >
            {$c(data.income)}
          </div>
        )}
      </div>
    </header>
  );
}
