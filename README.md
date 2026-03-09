# FINSNAP — Personal Finance Snapshot

A bold, dark-themed monthly finance tracker built with React.

![FINSNAP](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![localStorage](https://img.shields.io/badge/storage-localStorage-orange?style=flat)

---

## Quick Start

```bash
git clone https://github.com/stephenmayowa112/Lyncs-assesment.git
cd Lyncs-assesment
npm install
npm run dev
```

---

## What I Built & Why

**FINSNAP** is a monthly personal finance tracker focused on budget awareness and spending clarity. The core loop is simple: set your income, assign budgets per category, add transactions, and see at a glance how you're doing.

### Design Choices

- **Dark theme with electric accent colors** — finance apps are often sterile and anxiety-inducing. A bold, colorful palette makes numbers feel less clinical and more engaging. Each category gets a vivid signature color (yellow for housing, mint for transport, etc.) that carries through every touchpoint — the budget bar, the legend, the donut slice, the modal's active state.
- **Archivo Black + DM Mono pairing** — heavy display font for numbers that need to hit hard (net savings, income), monospace for data labels and amounts where readability and alignment matter.
- **Sticky slide-up modal** — adding a transaction is the most common action; the modal feels native and fast. Category selection updates the accent color live, creating a satisfying tactile feedback loop.
- **Inline budget editing** — rather than a settings page, budget limits are editable directly on the card (click the amount). Reduces friction for the one thing users tweak most.
- **Month navigation** — data is isolated per month/year in localStorage, so you can look back at previous months without losing anything.

### Features

- Monthly income (editable inline)
- 5 spending categories with per-category budget limits
- Budget progress bars with over-budget detection
- SVG donut chart showing spend breakdown with percentages
- Net savings/overspent banner
- Add transactions (category, amount, description, date)
- Delete transactions
- Month-by-month navigation
- localStorage persistence (zero backend)
- Seeded with realistic sample data on first load

---

## What I'd Improve With More Time

1. **Recurring transactions** — rent, subscriptions, etc. should auto-populate each month
2. **Export to CSV** — useful for people who want to pull data into spreadsheets
3. **Responsive mobile layout** — the current grid collapses awkwardly under ~700px; I'd redesign the right panel as a bottom sheet on small screens
4. **Category customization** — let users rename, recolor, or add/remove categories
5. **Trend charts** — a sparkline or bar chart showing the last 6 months per category would add a lot of insight
6. **Keyboard navigation** — the modal is keyboard-friendly but the main dashboard could use more shortcuts

---

## Challenges

- **SVG arc math for the donut** — calculating correct arc paths (including the inner radius cutout) for arbitrary percentages required careful handling of the `large-arc-flag` and degenerate cases (0% segments, 100% single segment).
- **Month navigation + state sync** — ensuring `localStorage` reads happen *before* state settles (not after) required a `useEffect` dependency on `[yr, mo]` rather than inline initialization.

---

## Time Spent

Approximately **5–6 hours** across design, implementation, and polish.

---

## Stack

- **React 18** (Vite)
- **No UI component libraries** — every component is handwritten
- **Zero external dependencies** beyond React itself
- **localStorage** for persistence
- **Google Fonts** (Archivo Black + DM Mono) via CDN
