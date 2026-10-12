// Copies the backend's PocketBase types into the website (docs/BACKEND.md section 4).
//   npm run sync-types              copy
//   npm run sync-types -- --check   exit 1 if the copies differ from the backend's
// Source: ../robogyan-backend/types, or RG_BACKEND_TYPES=<dir>.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = resolve(process.env.RG_BACKEND_TYPES ?? join(root, "..", "robogyan-backend", "types"));
const files = [
  ["pocketbase-types.ts", "client/src/pb/types.generated.ts"],
  ["rg-api.ts", "client/src/pb/rg-api.ts"],
];
const check = process.argv.includes("--check");
const norm = (s) => s.replace(/\r\n/g, "\n");

let drift = 0;
for (const [from, to] of files) {
  const a = join(src, from);
  const b = join(root, to);
  if (!existsSync(a)) {
    console.error(`sync-types: ${a} not found (set RG_BACKEND_TYPES to the backend's types/ dir).`);
    process.exit(2);
  }
  const want = norm(readFileSync(a, "utf8"));
  const have = existsSync(b) ? norm(readFileSync(b, "utf8")) : null;
  if (have === want) {
    console.log(`sync-types: ${to} up to date`);
  } else if (check) {
    console.error(`sync-types: ${to} differs from ${a}; run npm run sync-types`);
    drift++;
  } else {
    writeFileSync(b, want);
    console.log(`sync-types: ${to} <- ${a}`);
  }
}
process.exit(drift ? 1 : 0);
