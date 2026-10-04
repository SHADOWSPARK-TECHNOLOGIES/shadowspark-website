import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const migrationsDir = join(process.cwd(), "prisma", "migrations");

function migrationSqlFiles(): Array<{ name: string; sql: string }> {
  return readdirSync(migrationsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .map((name) => ({
      name,
      sql: readFileSync(join(migrationsDir, name, "migration.sql"), "utf8"),
    }));
}

describe("messages.state check", () => {
  it("ends on a check that allows SENDING without dropping the table", () => {
    const files = migrationSqlFiles();
    const create = files.find((file) => file.name.startsWith("20260917220000_"));
    expect(create?.sql).toContain(
      `CONSTRAINT "messages_state_check" CHECK ("state" IN ('QUEUED', 'SENT', 'DELIVERED', 'READ', 'FAILED'))`,
    );

    for (const file of files) {
      expect(file.sql).not.toMatch(/drop\s+table\s+(?:if\s+exists\s+)?"?messages"?/i);
    }

    const later = files.filter(
      (file) =>
        create !== undefined &&
        file.name > create.name &&
        file.sql.includes("messages_state_check"),
    );
    expect(later.length).toBeGreaterThan(0);
    const latest = later[later.length - 1]?.sql ?? "";
    for (const state of ["QUEUED", "SENDING", "SENT", "DELIVERED", "READ", "FAILED"]) {
      expect(latest).toContain(`'${state}'`);
    }
  });
});
