export const $c = (n, dec = 0, cur) =>
  new Intl.NumberFormat(cur?.locale ?? "en-NG", {
    style: "currency", currency: cur?.code ?? "NGN",
    minimumFractionDigits: dec, maximumFractionDigits: dec,
  }).format(n);

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

export const pad = (n) => String(n).padStart(2, "0");

export const now = new Date();

export const isoDate = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
