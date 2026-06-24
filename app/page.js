"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import ClosetTab from "@/components/ClosetTab";
import OutfitTab from "@/components/OutfitTab";

export default function Home() {
  const [tab, setTab] = useState("closet");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data.items))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ minHeight: "100vh",
    width: "100%",
    margin: "0 auto",
    background: "#000",
    color: "#fff", }}>
      <Nav tab={tab} setTab={setTab} />
      {tab === "closet" && <ClosetTab items={items} setItems={setItems} loading={loading} />}
      {tab === "outfit" && <OutfitTab items={items} />}
    </main>
  );
}
