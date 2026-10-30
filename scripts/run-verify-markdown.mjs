import { createRequire } from "node:module";
import { readdirSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pnpmDir = path.join(root, "node_modules/.pnpm");

let esbuildDir = "";
try {
  esbuildDir =
    readdirSync(pnpmDir).find((name) => name.startsWith("esbuild@")) ?? "";
} catch {
  esbuildDir = "";
}

if (!esbuildDir) {
  console.error("esbuild is not installed. Run pnpm install from the portfolio repo.");
  process.exit(1);
}

const esbuildPkg = path.join(pnpmDir, esbuildDir, "node_modules/esbuild/package.json");
const esbuild = createRequire(esbuildPkg)("esbuild");
const dir = await mkdtemp(path.join(tmpdir(), "verify-markdown-"));
const outfile = path.join(dir, "check.mjs");

try {
  await esbuild.build({
    absWorkingDir: root,
    entryPoints: [path.join(root, "scripts/verify-markdown-export.ts")],
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node22",
    outfile,
    alias: { "@": path.join(root, "src") },
    logLevel: "silent",
  });
  await import(pathToFileURL(outfile).href);
} finally {
  await rm(dir, { recursive: true, force: true });
}

process.exit(process.exitCode ?? 0);
