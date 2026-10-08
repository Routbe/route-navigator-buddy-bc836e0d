import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuth } from "@/lib/auth/middleware";

const FALLBACK = ["maximilien.brussels"];
const handleSchema = z
  .string()
  .trim()
  .transform((s) => s.replace(/^@/, "").replace(/^https?:\/\/(www\.)?rout\.be\//i, "").replace(/^u\//, "").toLowerCase())
  .pipe(z.string().regex(/^[a-z0-9._-]{1,64}$/));

async function ensureTable() {
  const { sql } = await import("@/lib/neon");
  await sql`create table if not exists public.showcase_profiles (handle text primary key, position integer not null default 0, created_at timestamptz not null default now())`;
  return sql;
}

/** Public: handles to render as live phone previews. */
export const listShowcaseHandles = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const sql = await ensureTable();
    const rows = (await sql`select handle from public.showcase_profiles order by position, created_at`) as { handle: string }[];
    return rows.length ? rows.map((r) => r.handle) : FALLBACK;
  } catch (e) {
    console.warn("[showcase] list failed", e);
    return FALLBACK;
  }
});

/** Admin: replace the full ordered list. */
export const saveShowcaseHandles = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((d: unknown) => z.object({ handles: z.array(handleSchema).max(20) }).parse(d))
  .handler(async ({ data, context }) => {
    const { assertAdminRole } = await import("./admin.server");
    await assertAdminRole(context.userId);
    const sql = await ensureTable();
    const unique = [...new Set(data.handles)];
    await sql`delete from public.showcase_profiles`;
    for (let i = 0; i < unique.length; i++) {
      await sql`insert into public.showcase_profiles (handle, position) values (${unique[i]}, ${i})`;
    }
    return unique;
  });
