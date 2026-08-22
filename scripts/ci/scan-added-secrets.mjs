import { spawnSync } from "node:child_process";

const base = process.argv[2] ?? "origin/main";
const diff = spawnSync("git", ["diff", "--unified=0", `${base}...HEAD`, "--"], {
  encoding: "utf8",
});

if (diff.error) throw diff.error;
if (diff.status !== 0) {
  process.stderr.write(diff.stderr);
  process.exit(diff.status ?? 1);
}

const findings = [];
let file = "unknown";
for (const line of diff.stdout.split("\n")) {
  if (line.startsWith("+++ b/")) file = line.slice(6);
  if (!line.startsWith("+") || line.startsWith("+++")) continue;

  const added = line.slice(1);
  const placeholder = /(?:example|test|fixture|dummy|fake|placeholder|redacted|passkey-auth-bypass|legacy-fixed-marker|super-secret|change-me|changeme)/i.test(added);
  const category =
    /-----BEGIN (?:[A-Z0-9 ]+ )?PRIVATE KEY-----/.test(added)
      ? "private-key"
      : /(?:AKIA|ASIA)[0-9A-Z]{16}/.test(added)
        ? "aws-access-key"
        : /(?:ghp|github_pat)_[A-Za-z0-9_]{20,}/.test(added)
          ? "github-token"
          : /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/.test(added)
            ? "jwt"
      : !placeholder && /\b(?:api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret|password|secret)\b\s*[:=]\s*["'`]?[A-Za-z0-9_./+=-]{16,}/i.test(added)
              ? "credential-assignment"
              : null;
  if (category) findings.push(`${file}:${category}`);
}

if (findings.length > 0) {
  for (const finding of findings) console.error(`Potential credential material: ${finding}`);
  process.exit(1);
}
console.log("No credential material detected in added diff lines.");
