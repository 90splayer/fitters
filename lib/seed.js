// Starter wardrobe items so the closet isn't empty on first run.
// Each item is intentionally simple — no image, just a category, name,
// color, and emoji standing in for a real garment photo/asset.
//
// In the full product (see PRD Milestone 1), this data would instead come
// from the AI clothing-detection pipeline (YOLOv8/SAM) processing a photo
// the user uploaded. Here, items are added manually via a form.

let nextId = 7;

export const SEED_ITEMS = [
  { id: 1, name: "White linen shirt", category: "tops", color: "Ivory", emoji: "👔" },
  { id: 2, name: "Straight-leg jeans", category: "bottoms", color: "Indigo", emoji: "👖" },
  { id: 3, name: "Camel wool coat", category: "outerwear", color: "Camel", emoji: "🧥" },
  { id: 4, name: "White leather trainers", category: "shoes", color: "White", emoji: "👟" },
  { id: 5, name: "Black ankle boots", category: "shoes", color: "Black", emoji: "👢" },
  { id: 6, name: "Gold hoop earrings", category: "accessories", color: "Gold", emoji: "💛" },
];

export function generateId() {
  return nextId++;
}
