import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "..", "screenshots", "user-test");
const URL = process.env.TARGET_URL ?? "https://app-poids-femme.vercel.app/";

const findings = [];
function log(kind, message, meta = {}) {
  findings.push({ kind, message, ...meta });
  console.log(`[${kind}] ${message}`);
}

async function shot(page, name) {
  const file = resolve(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  return file;
}

async function clickTab(page, label) {
  // Bottom nav buttons are the LAST occurrence of each label (variant pills
  // inside activity cards are also named 'Progression' / 'Douce' etc.).
  await page.getByRole("button", { name: label, exact: true }).last().click({ timeout: 4000 });
  await page.waitForTimeout(400);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);
}

async function tryClick(page, locator, ms = 1500) {
  try {
    await locator.click({ timeout: ms });
    return true;
  } catch {
    return false;
  }
}

async function clearStorage(page) {
  await page.evaluate(() => {
    try {
      window.localStorage.clear();
    } catch {}
  });
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 412, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // ── JOURNEY 1: First open / Welcome ─────────────────────────────────────
  log("step", "Journey 1: first open with empty localStorage");
  const t0 = Date.now();
  await page.goto(URL, { waitUntil: "networkidle" });
  await clearStorage(page);
  await page.reload({ waitUntil: "networkidle" });
  log("timing", `First paint after reload`, { ms: Date.now() - t0 });
  await shot(page, "j1-welcome");

  // Click "Commencer"
  if (await tryClick(page, page.getByRole("button", { name: "Commencer" }))) {
    log("ok", "Welcome → Commencer button works");
  } else {
    log("issue", "Could not click 'Commencer' on welcome");
  }
  await page.waitForTimeout(400);
  await shot(page, "j1-after-welcome");

  // ── JOURNEY 2: Profile setup ────────────────────────────────────────────
  log("step", "Journey 2: open Profil and configure");
  await clickTab(page, "Profil");
  await shot(page, "j2-profile-top");

  // Try to find and click another mascot ("Loutre")
  const loutreClicked = await tryClick(
    page,
    page.getByRole("button", { name: /^Loutre/, exact: false }),
    2000,
  );
  if (loutreClicked) {
    log("ok", "Mascot picker accepts a click on Loutre");
  } else {
    log("issue", "Could not click Loutre tile");
  }
  await page.waitForTimeout(300);
  await shot(page, "j2-mascot-loutre");

  // Open another accordion section
  const ctxOpened = await tryClick(
    page,
    page.getByRole("button", { name: /Mon contexte/i }),
    2000,
  );
  if (ctxOpened) {
    log("ok", "Accordion 'Mon contexte' opens");
  } else {
    log("issue", "Could not open accordion 'Mon contexte'");
  }
  await page.waitForTimeout(250);
  await shot(page, "j2-context-open");

  // Toggle a neuro profile
  const tdahClicked = await tryClick(
    page,
    page.getByRole("button", { name: /^TDAH$/ }),
    2000,
  );
  log(tdahClicked ? "ok" : "issue", `Neuroprofil TDAH ${tdahClicked ? "clickable" : "not found"}`);

  // Toggle off — confirm second click toggles state by checking aria-pressed
  if (tdahClicked) {
    const pressed = await page
      .getByRole("button", { name: /^TDAH$/ })
      .getAttribute("aria-pressed");
    log("info", `TDAH aria-pressed after click: ${pressed}`);
  }

  // Open Alimentation accordion
  await tryClick(page, page.getByRole("button", { name: /Alimentation/i }));
  await page.waitForTimeout(250);
  await shot(page, "j2-alimentation");

  // ── JOURNEY 3: Plan a meal ──────────────────────────────────────────────
  log("step", "Journey 3: open Repas, change a recipe via picker");
  await clickTab(page, "Repas");
  await shot(page, "j3-meals-top");

  // Try to expand "Lundi" if not already expanded
  const lundiBtn = page.getByRole("button", { name: /^Lundi/ });
  await tryClick(page, lundiBtn);
  await page.waitForTimeout(250);

  // Click the meal slot row "Choisir une recette" or the existing recipe row
  // Best guess: there is a button text "Choisir une recette" for empty slots,
  // or the planned recipe title for filled slots. Try clicking on first slot.
  const slotClicked = await tryClick(
    page,
    page.locator("text=DÉJEUNER").first().locator("..").locator("button").first(),
    2000,
  );
  log(slotClicked ? "ok" : "issue", `First meal slot ${slotClicked ? "opens" : "not clickable"}`);

  await page.waitForTimeout(400);
  await shot(page, "j3-recipe-picker-open");

  // Inside picker, search
  const searchVisible = await page.locator('input[type="search"]').count();
  if (searchVisible > 0) {
    await page.locator('input[type="search"]').first().fill("tofu");
    await page.waitForTimeout(300);
    log("ok", "Recipe picker search field accepts input");
    await shot(page, "j3-recipe-picker-search");
  } else {
    log("issue", "Recipe picker search field not found");
  }

  // Close picker via Annuler
  await tryClick(page, page.getByRole("button", { name: "Annuler" }));
  await page.waitForTimeout(300);

  // ── JOURNEY 4: Inspect grocery list ─────────────────────────────────────
  log("step", "Journey 4: open Épicerie and toggle an item");
  await clickTab(page, "Épicerie");
  await shot(page, "j4-grocery-top");

  // Toggle first "Acheté"
  const achete = page.getByRole("button", { name: "Acheté", exact: true }).first();
  if (await tryClick(page, achete)) {
    log("ok", "Toggling 'Acheté' on first item works");
  } else {
    log("issue", "Could not click 'Acheté'");
  }
  await page.waitForTimeout(200);
  await shot(page, "j4-grocery-toggled");

  // Try the share button
  const copy = page.getByRole("button", { name: /Copier pour Messenger/i });
  if (await tryClick(page, copy)) {
    log("ok", "Copy-to-Messenger button clickable");
    await page.waitForTimeout(400);
    await shot(page, "j4-grocery-copied");
  } else {
    log("issue", "Copy-to-Messenger button not found");
  }

  // ── JOURNEY 5: Workout exercise detail ──────────────────────────────────
  log("step", "Journey 5: open Bouger, tick an activity, open library detail");
  await clickTab(page, "Bouger");
  await shot(page, "j5-workout-top");

  // Try to scroll and open the library
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);
  await shot(page, "j5-workout-bottom");

  // Click any library card (button with aria-label matching "Voir le détail")
  const detailBtn = page
    .getByRole("button", { name: /Voir le détail/i })
    .first();
  if (await tryClick(page, detailBtn, 2000)) {
    log("ok", "Library card opens detail sheet");
    await page.waitForTimeout(400);
    await shot(page, "j5-exercise-detail");
    // Close: try Escape, then "Fermer" button, then overlay click
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    const stillOpen = (await page.locator("text=/Version douce/").count()) > 0;
    if (stillOpen) {
      log("issue", "Escape did not close the exercise detail sheet");
      const closed = await tryClick(
        page,
        page.getByRole("button", { name: "Fermer" }).last(),
        2000,
      );
      if (!closed) log("issue", "Fermer button did not close sheet either");
    } else {
      log("ok", "Exercise detail sheet closes on Escape");
    }
  } else {
    log("issue", "Library card detail sheet not opened");
  }

  // ── JOURNEY 6: Progress check-in ────────────────────────────────────────
  log("step", "Journey 6: open Progression and tick some boxes");
  await clickTab(page, "Progression");
  await shot(page, "j6-progress-top");

  const renforcement = page.getByRole("button", { name: /Renforcement fait/ });
  if (await tryClick(page, renforcement)) {
    log("ok", "Check-in box 'Renforcement fait' togglable");
  } else {
    log("issue", "'Renforcement fait' not togglable");
  }

  // Click an energy scale value
  const scale4 = page
    .getByRole("button", { name: "4" })
    .nth(1); // Second '4' button is likely on a scale
  // skip strict assertion; just attempt
  await tryClick(page, scale4, 1500);

  await shot(page, "j6-progress-after");

  // ── JOURNEY 7: AI meal analysis ─────────────────────────────────────────
  log("step", "Journey 7: AI meal analysis (probably no_api_key in prod)");
  await clickTab(page, "Repas");
  // scroll until card is visible
  await page.evaluate(() =>
    document.querySelector('h2,h3')?.scrollIntoView({ behavior: "instant" }),
  );
  await page.waitForTimeout(200);

  const textarea = page.locator("textarea").first();
  if ((await textarea.count()) > 0) {
    await textarea.fill("Œufs, avocat et café noir.");
    log("ok", "AI textarea accepts input");
    const analyser = page.getByRole("button", { name: /Analyser doucement/i });
    if (await tryClick(page, analyser)) {
      await page.waitForTimeout(2000);
      await shot(page, "j7-ai-result");
      const text = await page.locator("body").innerText();
      if (text.includes("activée")) {
        log("ok", "AI shows soft 'pas activée' notice (no key on prod)");
      } else if (text.toLowerCase().includes("repère")) {
        log("ok", "AI returned an analysis");
      } else {
        log("info", "AI completed but state unclear");
      }
    }
  } else {
    log("issue", "AI textarea not found on Repas screen");
  }

  // Edge case: empty submit
  await textarea.fill("");
  await tryClick(page, page.getByRole("button", { name: /Analyser doucement/i }));
  await page.waitForTimeout(500);
  await shot(page, "j7-ai-empty");

  // ── JOURNEY 8: Edge case — all food filters ─────────────────────────────
  log("step", "Journey 8: edge case — toggle all food filters");
  await clickTab(page, "Profil");
  await tryClick(page, page.getByRole("button", { name: /Alimentation/i }));
  await page.waitForTimeout(300);
  // Click a few filters
  for (const filter of ["SCI", "Sans lactose", "Sans gluten", "Végétarienne", "Sans œufs"]) {
    await tryClick(
      page,
      page.getByRole("button", { name: filter, exact: false }),
      1000,
    );
  }
  await shot(page, "j8-filters-many");

  // Go back to Repas to see hidden recipes
  await clickTab(page, "Repas");
  await shot(page, "j8-meals-with-filters");

  await browser.close();

  await writeFile(
    resolve(OUT_DIR, "findings.json"),
    JSON.stringify(findings, null, 2),
  );
  console.log("\n=== FINDINGS ===");
  for (const f of findings) console.log(`${f.kind}: ${f.message}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
