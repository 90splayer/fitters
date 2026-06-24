import { NextResponse } from "next/server";
import { getItems, addItem } from "@/lib/store";

// GET /api/items — list all wardrobe items
export async function GET() {
  return NextResponse.json({ items: getItems() });
}

// POST /api/items — add a new wardrobe item
// Body: { name: string, category: string, color: string, emoji?: string }
export async function POST(request) {
  const body = await request.json();

  if (!body?.category) {
    return NextResponse.json({ error: "category is required" }, { status: 400 });
  }

  const item = addItem(body);
  return NextResponse.json({ item }, { status: 201 });
}
