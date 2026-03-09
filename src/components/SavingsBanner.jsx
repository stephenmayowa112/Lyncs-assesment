export default function SavingsBanner({ savings, totalSpent, income, fmt }) {
  const isOver = savings < 0;
  const savingsPct = income > 0 ? Math.round((savings / income) * 100) : 0;

  return (
    <div className="savings-banner" style={{
      margin: "20px 28px 0",
      background: isOver ? "var(--bg-savings-bad)" : "var(--bg-savings-good)",
      border: `1px solid ${isOver ? "#FF5050" : "#00FFB2"}28`,
      borderRadius: 14, padding: "20px 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      animation: "fadeIn 0.4s ease",
      gap: 16,
    }}>
      <div>
        <div style={{ color: "var(--text-muted)", fontSize: 9, fontFamily: "'DM Mono',monospace", letterSpacing: 2 }}>
          {isOver ? "OVERSPENT" : "NET SAVINGS"}
        </div>
        <div className="savings-amount" style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 38, color: isOver ? "#FF5050" : "#00FFB2", marginTop: 4, lineHeight: 1 }}>
          {isOver ? "-" : ""}{fmt(Math.abs(savings))}
        </div>
      </div>
      <div className="savings-right" style={{ textAlign: "right" }}>
        <div style={{ color: "var(--text-dim)", fontSize: 12, fontFamily: "'DM Mono',monospace" }}>
          {fmt(totalSpent)} spent of {fmt(income)}
        </div>
        <div style={{
          display: "inline-block", marginTop: 8,
          background: isOver ? "#FF505022" : "#00FFB218",
          color: isOver ? "#FF5050" : "#00FFB2",
          padding: "5px 12px", borderRadius: 20,
          fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 700,
        }}>
          {Math.abs(savingsPct)}% {isOver ? "over budget" : "saved"}
        </div>
      </div>
    </div>
  );
}
