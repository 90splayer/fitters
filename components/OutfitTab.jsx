"use client";

import { useState } from "react";

/**
 * OutfitTab — simple rule-based outfit generator.
 *
 * This is intentionally NOT AI-powered yet. It picks one random item per
 * category from the user's closet (top + bottom + shoes, with outerwear/
 * accessories thrown in some of the time) so there's something to look at
 * and interact with.
 *
 * See README.md → "Building on this MVP" for how to swap `pickOutfit`
 * for a real recommendation engine (rule-based scoring, or an LLM/AI call).
 */
function pickOutfit(items) {
  const byCategory = (cat) => items.filter((i) => i.category === cat);
  const randomFrom = (arr) => (arr.length ? arr[Math.floor(Math.random() * arr.length)] : null);

  const dresses = byCategory("dresses");
  const useDress = dresses.length > 0 && Math.random() < 0.3;

  const picks = [];

  if (useDress) {
    picks.push(randomFrom(dresses));
  } else {
    const top = randomFrom(byCategory("tops"));
    const bottom = randomFrom(byCategory("bottoms"));
    if (top) picks.push(top);
    if (bottom) picks.push(bottom);
  }

  const shoes = randomFrom(byCategory("shoes"));
  if (shoes) picks.push(shoes);

  if (Math.random() < 0.5) {
    const outerwear = randomFrom(byCategory("outerwear"));
    if (outerwear) picks.push(outerwear);
  }

  if (Math.random() < 0.5) {
    const accessory = randomFrom(byCategory("accessories"));
    if (accessory) picks.push(accessory);
  }

  return picks.filter(Boolean);
}

export default function OutfitTab({ items }) {
  const [outfit, setOutfit] = useState(null);
  const [saved, setSaved] = useState([]);

  const hasEnoughItems = items.length >= 2;

  const generate = () => {
    setOutfit(pickOutfit(items));
  };

  return (
    <div style={{ padding: "20px 20px 60px" }}>
      <h2 style={{ fontSize: 20, marginBottom: 4 }}>Outfit Generator</h2>
      <p style={{ fontSize: 13, color: "var(--warm-gray)", marginBottom: 20 }}>
        Picks a random combination from your closet
      </p>

      <button
        onClick={generate}
        disabled={!hasEnoughItems}
        style={{
          width: "100%",
          padding: 16,
          borderRadius: 16,
          background: hasEnoughItems ? "var(--charcoal)" : "#c8c4bf",
          color: "white",
          border: "none",
          fontSize: 15,
          fontFamily: "Georgia, serif",
          cursor: hasEnoughItems ? "pointer" : "not-allowed",
          marginBottom: 20,
        }}
      >
        ✦ Generate outfit
      </button>

      {!hasEnoughItems && (
        <p style={{ fontSize: 12, color: "var(--warm-gray)", marginBottom: 20 }}>
          Add a few more items to your closet first.
        </p>
      )}

      {outfit && (
        <div
          style={{
            background: "white",
            borderRadius: 18,
            border: "1px solid var(--border)",
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              background: "var(--off-white)",
              padding: "28px 0",
              display: "flex",
              justifyContent: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {outfit.length === 0 ? (
              <span style={{ fontSize: 13, color: "var(--warm-gray)" }}>
                Not enough variety yet — add more categories.
              </span>
            ) : (
              outfit.map((item) => (
                <div
                  key={item.id}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 14,
                    background: "white",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                  }}
                >
                  {item.emoji}
                </div>
              ))
            )}
          </div>

          <div style={{ padding: "14px 18px" }}>
            {outfit.map((item, i) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "9px 0",
                  borderBottom: i < outfit.length - 1 ? "1px solid var(--off-white)" : "none",
                }}
              >
                <span style={{ fontSize: 18 }}>{item.emoji}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: "var(--warm-gray)" }}>
                    {item.category} · {item.color}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {outfit.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "0 18px 18px" }}>
              <button onClick={generate} style={btnStyle(false)}>
                ↻ Regenerate
              </button>
              <button onClick={() => setSaved((s) => [outfit, ...s])} style={btnStyle(true)}>
                ♡ Save outfit
              </button>
            </div>
          )}
        </div>
      )}

      {saved.length > 0 && (
        <>
          <h3 style={{ fontSize: 14, marginBottom: 10 }}>Saved looks ({saved.length})</h3>
          {saved.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 8,
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "10px 14px",
                marginBottom: 8,
              }}
            >
              {s.map((item) => (
                <span key={item.id} style={{ fontSize: 18 }}>
                  {item.emoji}
                </span>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

function btnStyle(primary) {
  return {
    padding: 12,
    borderRadius: 12,
    border: "none",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    background: primary ? "var(--charcoal)" : "var(--off-white)",
    color: primary ? "white" : "var(--charcoal)",
  };
}
