import { NextResponse } from "next/server";
import { loadRecipes } from "@/lib/loadRecipes";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = (searchParams.get("q") || "").toLowerCase();
  const cat = (searchParams.get("categoria") || "").toLowerCase();
  const tag = (searchParams.get("tag") || "").toLowerCase();         // ← NUEVO
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));

  const all = await loadRecipes();
  let filtered = all;

  if (q) {
    filtered = filtered.filter((r) =>
      r.title.toLowerCase().includes(q) ||
      r.instructions.toLowerCase().includes(q) ||
      r.ingredients?.some((i) => i.name.toLowerCase().includes(q))
    );
  }

  if (cat) {
    filtered = filtered.filter((r) =>
      (r.category || []).some((c) => c.toLowerCase() === cat)
    );
  }

  if (tag) {                                                      // ← NUEVO
    filtered = filtered.filter((r) =>
      (r.tags || []).some((t) => t.toLowerCase() === tag)
    );
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return NextResponse.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    items,
  });
}
