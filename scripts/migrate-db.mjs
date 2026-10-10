// Uses the same idempotent schema setup as the application. Requires Node 22.6+.
import { db } from "../lib/db.ts";

try {
  const sql = await db();
  const tables = [
    "businesses", "users", "customers", "feedback", "events",
    "review_rotations", "admin_audit_log",
  ];
  const found = await sql`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = ANY(${tables})
    ORDER BY table_name
  `;
  const missing = tables.filter(name => !found.some(row => row.table_name === name));
  if (missing.length) throw new Error("Schema verification failed");
  console.log(`Database schema ready: ${found.length} application tables verified.`);
  for (const table of tables) {
    // Identifiers come from the fixed allowlist above, never user input.
    const rows = await sql.query(`SELECT COUNT(*) AS count FROM public."${table}"`);
    console.log(`${table}: ${rows[0].count} records`);
  }
} catch {
  // Database errors may contain credentials or record values; keep output safe.
  console.error("Database setup failed. Check DATABASE_URL, network access, and database permissions.");
  process.exitCode = 1;
}
