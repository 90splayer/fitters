# Closet — MVP

A minimal, working starting point for the **Closet** app described in the
Product Requirements Document: an AI-powered digital wardrobe and outfit
generator.

This MVP deliberately does **not** implement the full PRD. There's no AI
photo pipeline, no database, no auth, no social features, and no commerce
layer. What it does have is a real, runnable Next.js app with two working
screens — **Closet** and **Outfit Generator** — wired up to simple API
routes, so you have a solid skeleton to build the rest on top of.

---

## What's included

| Feature | Status in this MVP |
|---|---|
| Add clothing items | ✅ Manual form (name, category, color) |
| View / filter wardrobe | ✅ Grid view with category filters |
| Delete items | ✅ |
| Generate an outfit | ✅ Simple random pick by category (no AI yet) |
| Save an outfit | ✅ Kept in memory for the session |
| AI photo detection / segmentation | ❌ Not built — see "Building on this MVP" |
| Real outfit recommendation engine | ❌ Rule-based placeholder only |
| Fit Extractor (inspiration matching) | ❌ Not built |
| Social feed / public closets | ❌ Not built |
| Commerce / affiliate links | ❌ Not built |
| Persistent database | ❌ In-memory store only (resets on server restart) |
| Auth | ❌ Not built — single implicit user |

---

## Project structure

```
closet-mvp/
├── app/
│   ├── layout.js              # Root layout, loads global styles
│   ├── page.js                # Main page — switches between Closet / Outfit tabs
│   ├── globals.css            # Color palette & base styles
│   └── api/
│       └── items/
│           ├── route.js       # GET (list items), POST (add item)
│           └── [id]/route.js  # DELETE (remove item)
├── components/
│   ├── Nav.jsx                # Top nav / tab switcher
│   ├── ClosetTab.jsx          # Wardrobe grid + filters
│   ├── AddItemModal.jsx       # "Add item" form (manual entry)
│   └── OutfitTab.jsx          # Outfit generator (rule-based)
├── lib/
│   ├── store.js               # In-memory "database"
│   └── seed.js                # Starter wardrobe items
├── package.json
└── README.md
```

---

## How to run it

**Requirements:** Node.js 18.18+ (Next.js 14 requirement) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the app
# → http://localhost:3000
```

To build for production:

```bash
npm run build
npm run start
```

There's nothing to configure — no `.env` file, no database connection, no
API keys. The wardrobe starts pre-seeded with six items so the closet isn't
empty on first load.

> **Note:** Data lives in memory (`lib/store.js`). It will reset every time
> you restart the dev server. This is intentional for the MVP — see below
> for how to replace it with real persistence.

---

## Building on this MVP

This skeleton maps onto the PRD's milestones. Here's where to plug in each
piece as you build it out:

### 1. Persistent database (replaces `lib/store.js`)
Swap the in-memory array for a real database without changing any of the
API route signatures (`getItems`, `addItem`, `deleteItem`) — just reimplement
those three functions.
- Recommended: PostgreSQL + [Prisma](https://www.prisma.io/) or
  [Supabase](https://supabase.com/) (the PRD's suggested stack).
- Keep `lib/store.js` as the single place the rest of the app talks to —
  everything else (`ClosetTab`, the API routes) is already decoupled from
  *how* data is stored.

### 2. Real AI photo pipeline (replaces `AddItemModal.jsx`)
Right now adding an item means typing in a name/category/color. To match
PRD Milestone 1 (AI Closet Builder):
- Add a file upload input (e.g. `<input type="file" accept="image/*">`).
- Send the photo to a backend endpoint that runs detection + segmentation
  (YOLOv8/Detectron2 for detection, SAM/U2Net for segmentation, as named in
  the PRD's AI stack).
- Store the resulting background-removed garment image (e.g. in S3) instead
  of an emoji, and save its URL on the item record.
- This likely means a separate Python service (FastAPI, per the PRD) that
  the Next.js app calls over HTTP — Next.js API routes are a thin layer,
  not where you'd run computer-vision models.

### 3. Real outfit recommendation (replaces `pickOutfit` in `OutfitTab.jsx`)
The current generator just picks randomly per category. To build toward
PRD Milestone 3:
- Start simple: weight the random choice by tags/season/style metadata
  already on each item instead of pure randomness.
- Then layer in real scoring: color harmony, style consistency, occasion
  fit — the PRD suggests CLIP/FashionCLIP embeddings for this.
- If you want to prototype with an LLM before building a dedicated model,
  you can call the Anthropic API from a server-side route (never from the
  client, to avoid exposing a key) — pass it the wardrobe as text and ask
  it to pick and justify a combination.

### 4. Fit Extractor (new feature, PRD Milestone 4)
Not present in this MVP. Would need:
- An image upload (inspiration screenshot).
- A vision model or multimodal LLM call to extract garment descriptions
  from that image.
- Matching logic against the user's existing wardrobe (could start as a
  simple keyword/category match, then move to embedding similarity).

### 5. Social features (PRD Milestone 5)
Needs: user accounts/auth (Firebase Auth or Supabase Auth, per the PRD),
a `users` and `follows` table, and a feed view. None of this exists yet —
the app currently has a single implicit user and no auth at all.

### 6. Commerce layer (PRD Milestone 6)
Out of scope until the above are in place. Would hang off the outfit
recommendation engine (suggesting missing items) and the social layer
(creator storefronts).

---

## Design notes

- Styling is done with inline styles and CSS variables defined in
  `app/globals.css` (`--cream`, `--charcoal`, `--dusty-rose`, etc.) rather
  than a CSS framework, to keep the dependency list minimal. Feel free to
  introduce Tailwind or another system as the app grows.
- Components are intentionally small and single-purpose so each PRD
  milestone above maps to a clear file to extend or replace.
# fitters
