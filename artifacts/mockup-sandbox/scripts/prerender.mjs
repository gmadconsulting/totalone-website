#!/usr/bin/env node
/**
 * Prerendering statico per SEO.
 *
 * Dopo `vite build` apre ogni pagina pubblica (da dist/sitemap.xml) con un
 * browser headless e salva l'HTML renderizzato in dist/<percorso>/index.html.
 * Così motori di ricerca e anteprime social ricevono subito testo, title,
 * meta description, canonical e JSON-LD, senza dover eseguire JavaScript.
 * Nel browser l'app React riparte normalmente e sostituisce l'HTML statico.
 *
 * Browser: in locale usa Chrome installato (o CHROME_PATH); su Vercel e in CI
 * usa @sparticuz/chromium, una build di Chromium pensata per Linux serverless.
 *
 * Uso: node scripts/prerender.mjs   (dalla cartella artifacts/mockup-sandbox)
 */
import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dist = path.join(root, "dist");
const port = 4317;
const base = `http://127.0.0.1:${port}`;

async function launchBrowser() {
  const local = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean).find((p) => existsSync(p));
  if (local && !process.env.VERCEL) {
    return puppeteer.launch({ executablePath: local, headless: true, args: ["--no-sandbox", "--disable-gpu"] });
  }
  const { default: chromium } = await import("@sparticuz/chromium");
  return puppeteer.launch({ executablePath: await chromium.executablePath(), headless: true, args: chromium.args });
}

const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
const routes = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1] || "/");
if (!routes.includes("/")) routes.unshift("/");

// Server statico della build (vite preview) con base "/".
const server = spawn(path.join(root, "node_modules/.bin/vite"), ["preview", "--port", String(port), "--strictPort", "--host", "127.0.0.1"], {
  cwd: root,
  env: { ...process.env, PORT: String(port), BASE_PATH: "/" },
  stdio: ["ignore", "pipe", "pipe"],
});
await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error("vite preview non è partito")), 30000);
  server.stdout.on("data", (d) => {
    if (String(d).includes(String(port))) {
      clearTimeout(timer);
      resolve();
    }
  });
  server.on("exit", (code) => reject(new Error(`vite preview uscito con ${code}`)));
});

const failures = [];
const browser = await launchBrowser();
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });
  for (const route of routes) {
    await page.goto(`${base}${route}?__prerender=1`, { waitUntil: "networkidle0", timeout: 60000 });
    await page.waitForSelector("h1", { timeout: 20000 }).catch(() => {});
    // Lascia il tempo a useSeo di aggiornare title, meta e JSON-LD.
    await new Promise((r) => setTimeout(r, 400));
    const html = "<!DOCTYPE html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));
    const ok = /<h1[\s>]/i.test(html) && !/No component found|Pagina non trovata/.test(html);
    if (!ok) failures.push(route);
    const file = route === "/" ? path.join(dist, "index.html") : path.join(dist, route.replace(/^\//, ""), "index.html");
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html);
    const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
    console.log(`${ok ? "✓" : "✗"} ${route}  →  ${title}`);
  }
} finally {
  await browser.close();
  server.kill();
}

if (failures.length) {
  console.error(`\nPagine senza contenuto valido: ${failures.join(", ")}`);
  process.exit(1);
}
console.log(`\nPrerender completato: ${routes.length} pagine.`);
