"use client";

import { useState } from "react";
import AddItemModal from "./AddItemModal";

const FILTERS = ["all", "tops", "bottoms", "outerwear", "shoes", "accessories", "dresses"];

export default function ClosetTab({ items, setItems, loading }) {
  const [filter, setFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);

  const filtered = filter === "all" ? items : items.filter((i) => i.category === filter);

  const handleDelete = async (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    try {
      await fetch(`/api/items/${id}`, { method: "DELETE" });
    } catch {
      // best-effort for the MVP; a real app would roll back and show an error
    }
  };

  return (
    <div style={{ padding: "20px 20px 60px" }}>
      <button
        onClick={() => setShowAdd(true)}
        style={{
          width: "100%",
          padding: "18px",
          borderRadius: 16,
          border: "1.5px dashed var(--dusty-rose)",
          background: "white",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          marginBottom: 18,
        }}
      >
        <span style={{ fontSize: 22 }}>+</span>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Add a clothing item</span>
        <span style={{ fontSize: 11, color: "var(--warm-gray)" }}>
          Manual entry for now — see README for adding real photo upload
        </span>
      </button>

      <div
        style={{
          display: "flex",
          gap: 6,
          overflowX: "auto",
          paddingBottom: 14,
        }}
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 13px",
              borderRadius: 16,
              border: "1.5px solid",
              borderColor: filter === f ? "var(--charcoal)" : "var(--border)",
              background: filter === f ? "var(--charcoal)" : "white",
              color: filter === f ? "white" : "var(--warm-gray)",
              fontSize: 12,
              cursor: "pointer",
              whiteSpace: "nowrap",
              textTransform: "capitalize",
            }}
          >
            {f === "all" ? `All (${items.length})` : f}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: "var(--warm-gray)", fontSize: 13 }}>Loading…</p>
      ) : filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
          }}
        >
          {filtered.map((item) => (
            <div
              key={item.id}
              style={{
                background: "white",
                borderRadius: 14,
                border: "1px solid var(--border)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  aspectRatio: "1",
                  background: "var(--off-white)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                }}
              >
                {item.emoji}
              </div>
              <div style={{ padding: "8px 9px 9px" }}>
                <div
                  style={{
                    fontSize: 9,
                    color: "var(--warm-gray)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {item.category}
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, lineHeight: 1.3, margin: "2px 0 6px" }}>
                  {item.name}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 9, color: "var(--warm-gray)" }}>{item.color}</span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    title="Remove item"
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--warm-gray)",
                      cursor: "pointer",
                      fontSize: 12,
                      padding: 0,
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAdd && (
        <AddItemModal
          onClose={() => setShowAdd(false)}
          onAdded={(item) => setItems((prev) => [...prev, item])}
        />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px 20px",
        color: "var(--warm-gray)",
        fontSize: 13,
      }}
    >
      No items in this category yet.
    </div>
  );
}
