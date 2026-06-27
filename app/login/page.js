"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Couldn't log in — please try again.");
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Couldn't reach the server — please try again.");
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 28px",
        maxWidth: 420,
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: 30, letterSpacing: "-0.6px", marginBottom: 6, color: "var(--cream)" }}>
        Fitters<span style={{ color: "var(--cream)" }}>.</span>
      </h1>
      <p style={{ fontSize: 14, color: "var(--warm-gray)", marginBottom: 28 }}>
        Sign in to your wardrobe.
      </p>

      <form onSubmit={handleSubmit}>
        <Field label="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            style={inputStyle}
          />
        </Field>

        <Field label="Password">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            required
            style={inputStyle}
          />
        </Field>

        {error && (
          <p style={{ color: "#A04848", fontSize: 12, marginBottom: 12 }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 12,
            background: loading ? "#9a9590" : "var(--charcoal)",
            color: "white",
            border: "none",
            fontSize: 14,
            fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: 6,
          }}
        >
          {loading ? "Signing in…" : "Log in"}
        </button>
      </form>

      <p style={{ fontSize: 11, color: "var(--warm-gray)", marginTop: 20, lineHeight: 1.5 }}>
        Demo mode: any email + a 6-character-or-longer password will work.
        There's no real account system yet — see README.md for how to add one.
      </p>
    </main>
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
