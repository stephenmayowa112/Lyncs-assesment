import { CATS } from "../constants";
import { uid, now, isoDate } from "./format";

const SEED = {
  income: 4200,
  budgets: { housing: 1500, food: 600, transport: 300, entertainment: 200, health: 150 },
  transactions: [
    { id: uid(), category: "housing",       amount: 1400, description: "Monthly rent",     date: isoDate(now.getFullYear(), now.getMonth(), 1)  },
    { id: uid(), category: "food",          amount: 85,   description: "Grocery run",      date: isoDate(now.getFullYear(), now.getMonth(), 3)  },
    { id: uid(), category: "transport",     amount: 45,   description: "Gas refill",       date: isoDate(now.getFullYear(), now.getMonth(), 4)  },
    { id: uid(), category: "food",          amount: 32,   description: "Sushi night",      date: isoDate(now.getFullYear(), now.getMonth(), 5)  },
    { id: uid(), category: "entertainment", amount: 15,   description: "Netflix",          date: isoDate(now.getFullYear(), now.getMonth(), 6)  },
    { id: uid(), category: "health",        amount: 60,   description: "Gym membership",   date: isoDate(now.getFullYear(), now.getMonth(), 7)  },
    { id: uid(), category: "food",          amount: 120,  description: "Weekly groceries", date: isoDate(now.getFullYear(), now.getMonth(), 8)  },
    { id: uid(), category: "transport",     amount: 120,  description: "Monthly transit",  date: isoDate(now.getFullYear(), now.getMonth(), 2)  },
    { id: uid(), category: "health",        amount: 28,   description: "Vitamins",         date: isoDate(now.getFullYear(), now.getMonth(), 6)  },
    { id: uid(), category: "entertainment", amount: 42,   description: "Concert tickets",  date: isoDate(now.getFullYear(), now.getMonth(), 8)  },
  ],
};

const storKey = (y, m) => `finsnap_${y}_${m}`;

export function load(y, m) {
  try {
    const s = localStorage.getItem(storKey(y, m));
    if (s) return JSON.parse(s);
  } catch {}
  if (y === now.getFullYear() && m === now.getMonth()) return SEED;
  return {
    income: 4200,
    budgets: { housing: 1500, food: 600, transport: 300, entertainment: 200, health: 150 },
    transactions: [],
  };
}

export function persist(y, m, data) {
  try { localStorage.setItem(storKey(y, m), JSON.stringify(data)); } catch {}
}
