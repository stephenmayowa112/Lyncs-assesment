import { useState, useEffect } from "react";
import { CATS } from "./constants";
import { $c, pad, now } from "./utils/format";
import { load, persist } from "./utils/storage";
import { getTotals } from "./utils/helpers";
import Header from "./components/Header";
import SavingsBanner from "./components/SavingsBanner";
import BudgetCard from "./components/BudgetCard";
import DonutChart from "./components/DonutChart";
import TxRow from "./components/TxRow";
import AddModal from "./components/AddModal";
import "./styles/global.css";

export default function App() {
  const [yr, setYr] = useState(() => now.getFullYear());
  const [mo, setMo] = useState(() => now.getMonth());
  const [data, setData] = useState(() => load(now.getFullYear(), now.getMonth()));
  const [showModal, setShowModal] = useState(false);
  const [editingIncome, setEditingIncome] = useState(false);
  const [incomeVal, setIncomeVal] = useState("");
  const [isDark, setIsDark] = useState(() => localStorage.getItem("finsnap_theme") !== "light");

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    localStorage.setItem("finsnap_theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((d) => !d);

  useEffect(() => {
    setData(load(yr, mo));
  }, [yr, mo]);

  useEffect(() => {
    persist(yr, mo, data);
  }, [yr, mo, data]);

  const navMonth = (dir) => {
    let nm = mo + dir;
    let ny = yr;
    if (nm < 0) { nm = 11; ny -= 1; }
    if (nm > 11) { nm = 0; ny += 1; }
    setMo(nm);
    setYr(ny);
  };

  const addTx = (tx) => setData((d) => ({ ...d, transactions: [...d.transactions, tx] }));
  const delTx = (id) => setData((d) => ({ ...d, transactions: d.transactions.filter((t) => t.id !== id) }));
  const setBudget = (catId, val) => setData((d) => ({ ...d, budgets: { ...d.budgets, [catId]: val } }));

  const commitIncome = () => {
    const n = parseFloat(incomeVal);
    if (!isNaN(n) && n >= 0) setData((d) => ({ ...d, income: n }));
    setEditingIncome(false);
  };

  const catTotals = getTotals(data.transactions);
  const totalSpent = Object.values(catTotals).reduce((a, b) => a + b, 0);
  const savings = data.income - totalSpent;

  const recentTxns = [...data.transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 20);

  const defaultDate = `${yr}-${pad(mo + 1)}-${pad(Math.min(now.getDate(), 28))}`;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      <Header
        mo={mo}
        yr={yr}
        data={data}
        editingIncome={editingIncome}
        incomeVal={incomeVal}
        setIncomeVal={setIncomeVal}
        setEditingIncome={setEditingIncome}
        commitIncome={commitIncome}
        navMonth={navMonth}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      <SavingsBanner savings={savings} totalSpent={totalSpent} income={data.income} />

      {/* Main Grid */}
      <div className="main-grid" style={{
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) 300px",
        gap: 20,
        padding: "20px 28px 120px",
        maxWidth: 1100,
      }}>
        {/* Left — Budget Cards */}
        <div>
          <div style={{ color: "var(--text-label)", fontSize: 9, fontFamily: "'DM Mono',monospace", letterSpacing: 3, marginBottom: 14 }}>
            BUDGET TRACKING · click amount to edit
          </div>
          {CATS.map((cat) => (
            <BudgetCard
              key={cat.id}
              cat={cat}
              spent={catTotals[cat.id]}
              budget={data.budgets[cat.id]}
              onBudgetChange={setBudget}
            />
          ))}
        </div>

        {/* Right — Chart + Transactions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Donut chart card */}
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 18px" }}>
            <div style={{ color: "var(--text-label)", fontSize: 9, fontFamily: "'DM Mono',monospace", letterSpacing: 3, marginBottom: 16 }}>SPENDING BREAKDOWN</div>
            <DonutChart catTotals={catTotals} totalSpent={totalSpent} />
            {/* Legend */}
            <div style={{ marginTop: 18 }}>
              {CATS.map((cat) => {
                const pct = totalSpent > 0 ? Math.round((catTotals[cat.id] / totalSpent) * 100) : 0;
                return (
                  <div key={cat.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: cat.color, flexShrink: 0 }} />
                      <span style={{ color: "var(--text-mid)", fontSize: 11, fontFamily: "'Archivo',sans-serif" }}>{cat.label}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      {pct > 0 && <span style={{ color: "var(--text-dimmer)", fontFamily: "'DM Mono',monospace", fontSize: 10 }}>{pct}%</span>}
                      <span style={{ color: catTotals[cat.id] > 0 ? "var(--text-secondary)" : "var(--text-faint)", fontFamily: "'DM Mono',monospace", fontSize: 11 }}>
                        {catTotals[cat.id] > 0 ? $c(catTotals[cat.id]) : "—"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent transactions */}
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ color: "var(--text-label)", fontSize: 9, fontFamily: "'DM Mono',monospace", letterSpacing: 3 }}>TRANSACTIONS</div>
              <div style={{ color: "var(--text-dimmer)", fontFamily: "'DM Mono',monospace", fontSize: 10 }}>{data.transactions.length} total</div>
            </div>

            {recentTxns.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0", color: "var(--text-faint)", fontFamily: "'DM Mono',monospace", fontSize: 11 }}>
                no transactions yet<br />
                <span style={{ fontSize: 22, display: "block", marginTop: 8 }}>💸</span>
              </div>
            ) : (
              recentTxns.map((tx) => <TxRow key={tx.id} tx={tx} onDelete={delTx} />)
            )}
          </div>
        </div>
      </div>

      {/* FAB */}
      <button
        className="fab-btn"
        onClick={() => setShowModal(true)}
        title="Add Transaction"
        style={{
          position: "fixed", bottom: 28, right: 28,
          width: 58, height: 58,
          background: "#FAFF00", color: "#000",
          border: "none", borderRadius: "50%",
          cursor: "pointer", fontSize: 28, fontWeight: 900,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 24px #FAFF0055, 0 4px 16px rgba(0,0,0,0.5)",
          fontFamily: "'Archivo Black',sans-serif",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          zIndex: 200,
          lineHeight: 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1) rotate(90deg)";
          e.currentTarget.style.boxShadow = "0 0 36px #FAFF0088, 0 6px 24px rgba(0,0,0,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1) rotate(0deg)";
          e.currentTarget.style.boxShadow = "0 0 24px #FAFF0055, 0 4px 16px rgba(0,0,0,0.5)";
        }}
      >
        +
      </button>

      {/* Modal */}
      {showModal && (
        <AddModal
          onAdd={addTx}
          onClose={() => setShowModal(false)}
          defaultDate={defaultDate}
        />
      )}
    </div>
  );
}
