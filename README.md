# Cybie Study Plan

A sleek React + Vite + Tailwind app featuring a study plan dashboard, animated mascot, chatbot helper, and a Recharts progress chart.

## Quickstart

```bash
# 1) Install Node 18+ (or 20+ recommended)
# 2) Install deps
npm install

# 3) Run dev server
npm run dev

# 4) Build for production
npm run build
npm run preview
```

## Tech

- React 18
- Vite 5
- Tailwind CSS 3
- Framer Motion
- Recharts

## Notes

- All UI is styled with Tailwind (JIT), so arbitrary value classes like `shadow-[...]` work out-of-the-box.
- The dotted background uses a custom utility defined in `tailwind.config.js` and `index.css`.
- Components are split into `src/components` and data lives in `src/data/studyPlan.js`.
