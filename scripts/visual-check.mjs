import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "..", "screenshots");

const URL = process.env.TARGET_URL ?? "https://app-poids-femme.vercel.app/";

const TABS = [
  { id: "today", label: "Aujourd’hui" },
  { id: "workout", label: "Bouger" },
  { id: "meals", label: "Repas" },
  { id: "grocery", label: "Épicerie" },
  { id: "progress", label: "Progression" },
  { id: "profile", label: "Profil" },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 412, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log(`-> ${URL}`);
  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });

  // Skip welcome if visible: click "Commencer"
  try {
    await page.getByRole("button", { name: "Commencer" }).click({ timeout: 1500 });
    await page.waitForTimeout(400);
  } catch {
    // already past welcome
  }

  for (const tab of TABS) {
    console.log(`-> tab: ${tab.label}`);
    try {
      await page.getByRole("button", { name: tab.label, exact: true }).click({ timeout: 4000 });
    } catch (e) {
      console.warn(`  could not click ${tab.label}: ${e.message}`);
      continue;
    }
    await page.waitForTimeout(500);

    // Top of tab
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(150);
    await page.screenshot({
      path: resolve(OUT_DIR, `${tab.id}-top.png`),
      fullPage: false,
    });

    // Full page (long screenshot)
    await page.screenshot({
      path: resolve(OUT_DIR, `${tab.id}-full.png`),
      fullPage: true,
    });
  }

  // Probe AI route status without an API key
  const ai = await page.evaluate(async () => {
    try {
      const r = await fetch("/api/ai/meal-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meal: "Poulet, riz, brocoli" }),
      });
      return { status: r.status, body: await r.json() };
    } catch (e) {
      return { error: String(e) };
    }
  });
  console.log("AI route probe:", JSON.stringify(ai));

  await browser.close();
  console.log(`Done. Screenshots in ${OUT_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
