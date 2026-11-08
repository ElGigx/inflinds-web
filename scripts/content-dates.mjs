import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const outFile = path.join(root, "src/lib/content-dates.ts");

const staticRoutes = [
  "/",
  "/services/",
  "/pricing/",
  "/blog/",
  "/log/",
  "/contact/",
  "/privacy/",
  "/terms/",
  "/gigx/",
  "/gigx/portfolio/",
  "/tools/",
];

const serviceSlugs = ["diseno", "desarrollo", "automatizacion", "inteligencia-artificial", "consultoria"];

function readExisting() {
  if (!fs.existsSync(outFile)) return {};
  const text = fs.readFileSync(outFile, "utf8");
  const map = {};
  for (const match of text.matchAll(/"([^"]+)":\s*"([^"]+)"/g)) map[match[1]] = match[2];
  return map;
}

function gitDate(file) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", file], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out || null;
  } catch {
    return null;
  }
}

function fileDate(file) {
  try {
    return fs.statSync(path.join(root, file)).mtime.toISOString().slice(0, 10);
  } catch {
    return null;
  }
}

function toolSlugs() {
  const lib = path.join(root, "src/lib");
  const files = fs
    .readdirSync(lib)
    .filter((name) => name === "tools.ts" || name.startsWith("tools-batch-"))
    .map((name) => `src/lib/${name}`);
  const slugs = new Set();
  for (const file of files) {
    const text = fs.readFileSync(path.join(root, file), "utf8");
    for (const match of text.matchAll(/slug:\s*"([a-z0-9-]+)"/g)) slugs.add(match[1]);
  }
  return [...slugs];
}

const existing = readExisting();
const dates = {};

function assign(route, source) {
  const value = gitDate(source) ?? existing[route] ?? fileDate(source);
  if (value) dates[route] = value;
}

for (const route of staticRoutes) {
  assign(route, `src/app${route.replace(/\/$/, "")}/page.tsx`);
}

for (const slug of serviceSlugs) assign(`/services/${slug}/`, "src/lib/service-pages.ts");

const newestTool = (() => {
  const lib = path.join(root, "src/lib");
  const files = fs
    .readdirSync(lib)
    .filter((name) => name.startsWith("tools-batch-"))
    .map((name) => gitDate(`src/lib/${name}`))
    .filter(Boolean)
    .sort();
  return files.at(-1) ?? gitDate("src/lib/tools.ts");
})();

for (const slug of toolSlugs()) {
  const value = newestTool ?? existing[`/tools/${slug}/`] ?? null;
  if (value) dates[`/tools/${slug}/`] = value;
}

const lines = Object.entries(dates)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([route, date]) => `  "${route}": "${date}",`)
  .join("\n");

fs.writeFileSync(outFile, `export const CONTENT_DATES: Record<string, string> = {\n${lines}\n};\n`);
console.log(`content-dates: ${Object.keys(dates).length} rutas`);
