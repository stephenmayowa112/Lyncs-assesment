import { CATS } from "../constants";

export function getTotals(txns) {
  const t = Object.fromEntries(CATS.map((c) => [c.id, 0]));
  txns.forEach((tx) => { if (t[tx.category] !== undefined) t[tx.category] += tx.amount; });
  return t;
}
