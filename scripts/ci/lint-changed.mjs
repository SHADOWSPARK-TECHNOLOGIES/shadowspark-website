import { spawnSync } from "node:child_process";

const base = process.argv[2] ?? "origin/main";
const diff = spawnSync(
  "git",
  ["diff", "--diff-filter=ACMR", "--name-only", "-z", `${base}...HEAD`, "--", "*.js", "*.cjs", "*.mjs", "*.jsx", "*.ts", "*.tsx"],
  { encoding: "utf8" },
);

if (diff.error) throw diff.error;
if (diff.status !== 0) {
  process.stderr.write(diff.stderr);
  process.exit(diff.status ?? 1);
}

const files = diff.stdout.split("\0").filter(Boolean);
if (files.length === 0) {
  console.log("No changed JavaScript or TypeScript files to lint.");
  process.exit(0);
}

const result = spawnSync("pnpm", ["exec", "eslint", "--", ...files], {
  stdio: "inherit",
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
