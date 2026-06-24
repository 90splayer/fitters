"use client";

const TABS = [
  { id: "closet", label: "Closet" },
  { id: "outfit", label: "Outfit Generator" },
];

export default function Nav({ tab, setTab }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "var(--charcoal)",
        borderBottom: "1px solid var(--border)",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "16px clamp(16px, 4vw, 40px) 0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <h1 style={{ fontSize: "clamp(18px, 2vw, 26px)",
              letterSpacing: "-0.4px",
              color: "#fff",
              margin: 0, }}>
            Fitters<span style={{ color: "var(--dusty-rose)" }}>.</span>
          </h1>
          <span style={{ fontSize: 11, color: "var(--warm-gray)" }}>MVP</span>
        </div>

        <div style={{ display: "flex", gap: 0 }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1,
                padding: "12px 8px",
                background: "none",
                border: "none",
                borderBottom: tab === t.id ? "2px solid var(--charcoal)" : "2px solid transparent",
                color: tab === t.id ? "var(--cream)" : "var(--warm-gray)",
                fontWeight: tab === t.id ? 600 : 400,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
