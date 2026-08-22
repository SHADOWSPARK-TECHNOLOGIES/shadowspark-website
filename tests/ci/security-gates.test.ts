import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { describe, expect, it } from "vitest";

const repositoryRoot = process.cwd();
const lintScript = join(repositoryRoot, "scripts/ci/lint-changed.mjs");
const secretScript = join(repositoryRoot, "scripts/ci/scan-added-secrets.mjs");

function git(cwd: string, ...args: string[]): void {
  execFileSync("git", args, { cwd, stdio: "ignore" });
}

function fixture(): string {
  const cwd = mkdtempSync(join(tmpdir(), "issue-13-ci-"));
  git(cwd, "init", "-q");
  git(cwd, "config", "user.email", "ci-test@example.invalid");
  git(cwd, "config", "user.name", "CI test");
  writeFileSync(join(cwd, "README.md"), "fixture\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-qm", "base");
  git(cwd, "branch", "-M", "main");
  git(cwd, "switch", "-c", "changes");
  return cwd;
}

describe("CI security gate helpers", () => {
  it("generates the Prisma client before invoking the application build", () => {
    const packageManifest = JSON.parse(
      readFileSync(join(repositoryRoot, "package.json"), "utf8"),
    ) as { scripts?: Record<string, string> };
    const buildScript = packageManifest.scripts?.build;
    if (!buildScript) {
      throw new Error("package.json must define a build script");
    }

    const cwd = mkdtempSync(join(tmpdir(), "issue-13-build-"));
    const bin = mkdtempSync(join(tmpdir(), "issue-13-build-bin-"));
    const generatedClient = join(cwd, "generated-client");
    const nextArguments = join(cwd, "next-arguments.txt");

    writeFileSync(
      join(bin, "prisma"),
      '#!/bin/sh\nif [ "$1" != "generate" ]; then\n  exit 2\nfi\n: > "$GENERATED_CLIENT"\n',
      { mode: 0o755 },
    );
    writeFileSync(
      join(bin, "next"),
      '#!/bin/sh\nif [ ! -f "$GENERATED_CLIENT" ]; then\n  echo "generated client missing" >&2\n  exit 3\nfi\nprintf \'%s\\n\' "$@" > "$NEXT_ARGUMENTS"\n',
      { mode: 0o755 },
    );

    execFileSync("sh", ["-c", buildScript], {
      cwd,
      env: {
        ...process.env,
        GENERATED_CLIENT: generatedClient,
        NEXT_ARGUMENTS: nextArguments,
        PATH: `${bin}${delimiter}${process.env.PATH ?? ""}`,
      },
    });

    expect(readFileSync(nextArguments, "utf8")).toBe("build\n--webpack\n");
  });

  it("treats no changed source files as a successful lint", () => {
    const cwd = fixture();
    const output = execFileSync(process.execPath, [lintScript, "main"], {
      cwd,
      encoding: "utf8",
    });
    expect(output).toContain("No changed JavaScript or TypeScript files");
  });

  it("passes changed filenames containing spaces to the linter", () => {
    const cwd = fixture();
    const source = join(cwd, "changed file.ts");
    writeFileSync(source, "export const answer = 42;\n");
    git(cwd, "add", ".");
    git(cwd, "commit", "-qm", "change");

    const bin = mkdtempSync(join(tmpdir(), "issue-13-pnpm-"));
    const capture = join(bin, "args.txt");
    writeFileSync(
      join(bin, "pnpm"),
      `#!/bin/sh\nprintf '%s\\n' "$@" > ${JSON.stringify(capture)}\n`,
      { mode: 0o755 },
    );
    execFileSync(process.execPath, [lintScript, "main"], {
      cwd,
      env: { ...process.env, PATH: `${bin}${delimiter}${process.env.PATH ?? ""}` },
      encoding: "utf8",
    });
    expect(readFileSync(capture, "utf8")).toContain("changed file.ts");
  });

  it("rejects added credential material without printing its value", () => {
    const cwd = fixture();
    const sampleValue = "unambiguously-random-value-123456789";
    const keyName = "api" + "Key";
    writeFileSync(join(cwd, "config.ts"), `export const ${keyName} = "${sampleValue}";\n`);
    git(cwd, "add", ".");
    git(cwd, "commit", "-qm", "credential");

    let error: Error & { stdout?: string; stderr?: string };
    try {
      execFileSync(process.execPath, [secretScript, "main"], {
        cwd,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      });
      throw new Error("secret scanner unexpectedly passed");
    } catch (caught) {
      error = caught as Error & { stdout?: string; stderr?: string };
    }
    expect(error.message).not.toContain(sampleValue);
    const stderr = String(error.stderr ?? "");
    expect(stderr).toContain("credential-assignment");
    expect(stderr).not.toContain(sampleValue);
  });
});
