"use client";

import { useState } from "react";

const CATEGORIES = ["tops", "bottoms", "outerwear", "shoes", "accessories", "dresses"];

const EMOJI_BY_CATEGORY = {
  tops: "👕",
  bottoms: "👖",
  outerwear: "🧥",
  shoes: "👟",
  accessories: "👜",
  dresses: "👗",
};

/**
 * AddItemModal — manual "upload" form.
 *
 * Stands in for the AI photo pipeline described in the PRD (Milestone 1:
 * detect → segment → remove background → classify). Here the user just
 * types in the details directly. See README for how to wire up a real
 * photo upload + AI classification later.
 */
export default function AddItemModal({ onClose, onAdded }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("tops");
  const [color, setColor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          color,
          emoji: EMOJI_BY_CATEGORY[category],
        }),
      });

      if (!res.ok) throw new Error("Failed to add item");

      const data = await res.json();
      onAdded(data.item);
      onClose();
    } catch (err) {
      setError("Couldn't add item — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 480,
          background: "white",
          borderRadius: "20px 20px 0 0",
          padding: "22px 20px 32px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <h2 style={{ fontSize: 18 }}>Add a clothing item</h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "var(--off-white)",
              border: "none",
              borderRadius: "50%",
              width: 30,
              height: 30,
              cursor: "pointer",
              color: "var(--warm-gray)",
            }}
          >
            ✕
          </button>
        </div>

        <Field label="Name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. White linen shirt"
            required
            style={inputStyle}
          />
        </Field>

        <Field label="Category">
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Color">
          <input
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="e.g. Ivory"
            style={inputStyle}
          />
        </Field>

        {error && <p style={{ color: "#A04848", fontSize: 12, marginBottom: 10 }}>{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 12,
            background: submitting ? "#9a9590" : "var(--charcoal)",
            color: "white",
            border: "none",
            fontSize: 14,
            fontWeight: 500,
            cursor: submitting ? "not-allowed" : "pointer",
            marginTop: 6,
          }}
        >
          {submitting ? "Adding…" : "Add to closet"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label
        style={{
          display: "block",
          fontSize: 11,
          color: "var(--warm-gray)",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: 10,
  border: "1.5px solid var(--border)",
  fontSize: 14,
  fontFamily: "inherit",
  background: "var(--off-white)",
  color: "var(--charcoal)",
  outline: "none",
};
