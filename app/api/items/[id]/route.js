import { NextResponse } from "next/server";
import { deleteItem } from "@/lib/store";

// DELETE /api/items/:id — remove a wardrobe item
export async function DELETE(_request, { params }) {
  const ok = deleteItem(params.id);

  if (!ok) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
