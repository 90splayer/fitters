// A minimal in-memory "database" for the MVP.
//
// This keeps the app dependency-free and easy to run, but data resets
// every time the server restarts. It is intentionally the simplest
// possible stand-in for the PostgreSQL database described in the PRD's
// technical architecture section.
//
// See README.md → "Building on this MVP" for how to swap this out for
// a real database (Postgres/Supabase/Prisma) without changing the API
// route signatures.

import { SEED_ITEMS, generateId } from "./seed";

// `global` is used so the array survives Next.js hot-reloads in dev mode
// (each reload would otherwise re-run this module and wipe the data).
const store = globalThis;

if (!store.__CLOSET_ITEMS__) {
  store.__CLOSET_ITEMS__ = [...SEED_ITEMS];
}

export function getItems() {
  return store.__CLOSET_ITEMS__;
}

export function addItem({ name, category, color, emoji }) {
  const item = {
    id: generateId(),
    name: name?.trim() || "Untitled item",
    category,
    color: color?.trim() || "—",
    emoji: emoji || "🧺",
  };
  store.__CLOSET_ITEMS__.push(item);
  return item;
}

export function deleteItem(id) {
  const idx = store.__CLOSET_ITEMS__.findIndex((i) => String(i.id) === String(id));
  if (idx === -1) return false;
  store.__CLOSET_ITEMS__.splice(idx, 1);
  return true;
}
