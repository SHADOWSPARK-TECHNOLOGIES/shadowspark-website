// Marketing compliance assertions for ShadowSpark marketing site.
// Run after `pnpm build` for accurate rendered output checks.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const repoRoot = resolve(import.meta.dirname, "..");
const marketingDir = join(repoRoot, "src/app/(marketing)");
const componentsDir = join(repoRoot, "src/components/landing");

const routes = ["/", "/chatbot-products", "/infrastructure-trust", "/public-sector", "/products", "/contributors"];

function fail(msg) {
  console.log(`FAIL: ${msg}`);
  return false;
}

function pass(msg) {
  console.log(`PASS: ${msg}`);
  return true;
}

function readPage(route) {
  const name = route === "/" ? "page" : route.slice(1) + "/page";
  const path = join(marketingDir, `${name}.tsx`);
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf8");
}

function readDistPage(route) {
  const name = route === "/" ? "index" : route.slice(1);
  const candidates = [
    join(repoRoot, ".next/server/app", name + ".html"),
    join(repoRoot, ".next/server/app", name, "page.html"),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return readFileSync(p, "utf8");
  }
  return null;
}

let allPassed = true;
function ok(msg) { pass(msg); }
function no(msg) { allPassed = false; return fail(msg); }

// 1) Mandated security/trust claims exist somewhere in rendered marketing output.
const marketingRoutes = ["/", "/chatbot-products", "/infrastructure-trust", "/public-sector", "/products", "/contributors"];
const pageTexts = {};
for (const route of marketingRoutes) {
  const html = readDistPage(route);
  pageTexts[route] = html ? html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").toLowerCase() : "";
}
function findRouteWith(text) {
  return marketingRoutes.find((r) => pageTexts[r].includes(text.toLowerCase()));
}
const claimTargets = [
  { claim: "DMARC", near: "p=reject" },
  { claim: "SPF", near: "-all" },
  { claim: "CSRF", near: "CAPTCHA" },
  { claim: "social engineering training", near: null },
  { claim: "domain monitoring", near: null },
];
for (const { claim, near } of claimTargets) {
  const route = findRouteWith(claim);
  const hasNear = route && (!near || pageTexts[route].includes(near.toLowerCase()));
  if (route && hasNear) ok(`"${claim}"${near ? ` + "${near}"` : ""} found on ${route}`);
  else no(`No marketing route contains "${claim}"${near ? ` + "${near}"` : ""}`);
}

// robots.txt hides admin endpoints.
const robots = readFileSync(join(repoRoot, "src/app/robots.ts"), "utf8");
const adminHidden = ["/admin/", "/dashboard/", "/api/", "/finance/", "/support/"].every((p) => robots.includes(p));
adminHidden ? ok("robots.ts disallows admin/private paths") : no("robots.ts missing private paths");

// 2) SiteNav and Footer link to mandated routes.
const nav = readFileSync(join(componentsDir, "SiteNav.tsx"), "utf8");
const footer = readFileSync(join(componentsDir, "Footer.tsx"), "utf8");
const requiredLinks = ["/", "/chatbot-products", "/infrastructure-trust", "/public-sector"];
for (const link of requiredLinks) {
  nav.includes(link) ? ok(`SiteNav links to ${link}`) : no(`SiteNav missing ${link}`);
  footer.includes(link) ? ok(`Footer links to ${link}`) : no(`Footer missing ${link}`);
}
nav.includes('aria-label') ? ok("SiteNav has aria-label") : no("SiteNav missing aria-label");

// 3) Routes exist as static pages.
for (const route of routes) {
  const html = readDistPage(route);
  html ? ok(`${route} rendered as static HTML`) : no(`${route} not found in .next/server/app`);
}

// 4) Unique metadata titles across marketing routes.
const titles = [];
for (const route of routes) {
  const page = readPage(route);
  if (!page) { no(`No source page for ${route}`); continue; }
  const titleMatch = page.match(/title:\s*["']([^"']+)["']/);
  const descMatch = page.match(/description:\s*["']([^"']+)["']/);
  const ogTitleMatch = page.match(/["']og:title["']\s*[,;:]\s*title:\s*true/) || page.match(/openGraph:\s*\{[\s\S]*?title\s*[:,]\s*["']([^"']*)["']/);
  const title = titleMatch?.[1];
  const desc = descMatch?.[1];
  if (!title) no(`${route} missing metadata title`);
  else {
    ok(`${route} title: ${title}`);
    if (titles.includes(title)) no(`Duplicate title "${title}" on ${route}`);
    titles.push(title);
  }
  if (!desc) no(`${route} missing metadata description`);
  else ok(`${route} description: ${desc.slice(0, 50)}...`);
  if (!ogTitleMatch) no(`${route} missing OpenGraph title wiring`);
  else ok(`${route} has OpenGraph title`);
}

// 5) Chatbot/AI agent copy above the fold on all four primary routes.
const chatbotRoutes = ["/", "/chatbot-products", "/infrastructure-trust", "/public-sector"];
for (const route of chatbotRoutes) {
  const html = readDistPage(route);
  if (!html) { no(`Cannot verify chatbot copy for ${route}`); continue; }
  const text = html.slice(0, 8000).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").toLowerCase();
  const hasChatbot = text.includes("chatbot") || text.includes("ai agent") || text.includes("ai agents");
  hasChatbot ? ok(`${route} has chatbot/AI agent copy above the fold`) : no(`${route} missing chatbot/AI agent copy above the fold`);
}

// 6) Accessibility: visible focus states, dark theme contrast.
const globals = readFileSync(join(repoRoot, "src/app/globals.css"), "utf8");
(globals.includes("focus-visible") || globals.includes(":focus-visible"))
  ? ok("globals.css defines focus-visible states")
  : no("globals.css missing focus-visible states");

console.log(`\nOVERALL: ${allPassed ? "PASS" : "FAIL"}`);
process.exit(allPassed ? 0 : 1);
