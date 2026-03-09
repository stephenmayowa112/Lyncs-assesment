import { $c } from "../utils/format";

export default function SavingsBanner({ savings, totalSpent, income }) {
  const isOver = savings < 0;
  const savingsPct = income > 0 ? Math.round((savings / income) * 100) : 0;

  return (
    <div style={{
      margin: "20px 28px 0",
      background: isOver ? "#1a0a0a" : "#0a1a11",
      border: `1px solid ${isOver ? "#FF5050" : "#00FFB2"}28`,
      borderRadius: 14, padding: "20px 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      animation: "fadeIn 0.4s ease",
      gap: 16,
    }}>
      <div>
        <div style={{ color: "#555", fontSize: 9, fontFamily: "'DM Mono',monospace", letterSpacing: 2 }}>
          {isOver ? "OVERSPENT" : "NET SAVINGS"}
        </div>
        <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 38, color: isOver ? "#FF5050" : "#00FFB2", marginTop: 4, lineHeight: 1 }}>
          {isOver ? "-" : ""}{$c(Math.abs(savings))}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ color: "#444", fontSize: 12, fontFamily: "'DM Mono',monospace" }}>
          {$c(totalSpent)} spent of {$c(income)}
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
