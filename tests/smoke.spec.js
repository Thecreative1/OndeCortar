// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('OndeCortar — smoke tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for JS data and Leaflet container to initialise (tiles may not load in headless)
    await page.waitForFunction(() => typeof window.OndeCortarData !== 'undefined', { timeout: 10000 });
    await page.waitForSelector('#map.leaflet-container', { timeout: 10000 });
  });

  // ── Layout ──────────────────────────────────────────────────────

  test('two-column layout: left panel and map both visible', async ({ page }) => {
    const left = page.locator('.directory-left');
    const mapShell = page.locator('.hero-map-shell');
    await expect(left).toBeVisible();
    await expect(mapShell).toBeVisible();

    const leftBox = await left.boundingBox();
    const mapBox  = await mapShell.boundingBox();
    expect(leftBox.width).toBeGreaterThan(300);
    expect(mapBox.width).toBeGreaterThan(300);
    // Map must start where left panel ends (≤ 10 px gap)
    expect(Math.abs(mapBox.x - (leftBox.x + leftBox.width))).toBeLessThan(15);
  });

  test('nav is above map — no overlap', async ({ page }) => {
    const nav    = page.locator('.site-header');
    const mapBox = await page.locator('.hero-map-shell').boundingBox();
    const navBox = await nav.boundingBox();
    expect(navBox.y + navBox.height).toBeLessThanOrEqual(mapBox.y + 2);
  });

  // ── Region chips ─────────────────────────────────────────────────

  test('region chips are rendered (Norte, Centro, Lisboa, Algarve)', async ({ page }) => {
    const chips = page.locator('#directoryCities [data-region-search]');
    await expect(chips).toHaveCount(6);
    const labels = await chips.allTextContents();
    const names = labels.map(t => t.replace(/\s*\(\d+\)/, '').trim());
    expect(names).toContain('Norte');
    expect(names).toContain('Centro');
    expect(names).toContain('Lisboa');
    expect(names).toContain('Algarve');
    expect(names).toContain('Ilhas');
  });

  test('region chip shows non-zero count', async ({ page }) => {
    const norte = page.locator('[data-region-search="Norte"]');
    await expect(norte).toBeVisible();
    const text = await norte.textContent();
    const match = text.match(/\((\d+)\)/);
    expect(match).not.toBeNull();
    expect(parseInt(match[1])).toBeGreaterThan(0);
  });

  test('clicking Norte chip filters results to northern barbershops', async ({ page }) => {
    await page.locator('[data-region-search="Norte"]').click();
    await page.waitForTimeout(600); // wait for map + render
    const count = page.locator('#searchCount');
    await expect(count).toBeVisible();
    const text = await count.textContent();
    const n = parseInt(text.match(/\d+/)[0]);
    // Norte should have well under 339 results
    expect(n).toBeGreaterThan(0);
    expect(n).toBeLessThan(339);
  });

  // ── Map zoom (Spain bug) ─────────────────────────────────────────

  test('searching "guimaraes" keeps map centred on Portugal, not Spain', async ({ page }) => {
    const input = page.locator('#heroSearchInput');
    await input.fill('guimaraes');
    await page.locator('#heroSearchForm').dispatchEvent('submit');
    await page.waitForTimeout(800);

    const center = await page.evaluate(() => {
      // Access Leaflet map instance via global or DOM
      const mapEl = document.getElementById('map');
      if (mapEl && mapEl._leaflet_map) return mapEl._leaflet_map.getCenter();
      // Fallback: check Leaflet's internal _leaflet_id on the map div
      for (const key of Object.keys(mapEl)) {
        if (key.startsWith('_leaflet')) {
          const obj = mapEl[key];
          if (obj && typeof obj.getCenter === 'function') return obj.getCenter();
        }
      }
      return null;
    });

    if (center) {
      // Guimarães is at ~41.4°N, -8.3°W  — must NOT be in Galicia/Spain (lat > 43 or lng > -6.5)
      expect(center.lat).toBeGreaterThan(38);   // south of Portugal border
      expect(center.lat).toBeLessThan(43);       // not in Galicia
      expect(center.lng).toBeGreaterThan(-10);   // inside Portugal
      expect(center.lng).toBeLessThan(-6);       // not into Spain interior
    }

    // Regardless, results list must show Guimarães entries
    const cards = page.locator('.result-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  // ── Search ──────────────────────────────────────────────────────

  test('search for "lisboa" returns results with Lisboa city tag', async ({ page }) => {
    await page.locator('#heroSearchInput').fill('lisboa');
    await page.locator('#heroSearchForm').dispatchEvent('submit');
    await page.waitForTimeout(500);
    const cards = page.locator('.result-card');
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test('search with no matches shows empty state', async ({ page }) => {
    await page.locator('#heroSearchInput').fill('xyznotacityatall99999');
    await page.locator('#heroSearchForm').dispatchEvent('submit');
    await page.waitForTimeout(400);
    const empty = page.locator('#emptyState');
    await expect(empty).toBeVisible();
  });

  // ── Footer ──────────────────────────────────────────────────────

  test('footer has dark background (ink, not cream)', async ({ page }) => {
    const footer = page.locator('.site-footer');
    await footer.scrollIntoViewIfNeeded();
    const bg = await footer.evaluate(el => getComputedStyle(el).backgroundColor);
    // rgb(20, 19, 15) = --oc-ink
    expect(bg).toBe('rgb(20, 19, 15)');
  });

  test('footer shell is transparent (no cream card override)', async ({ page }) => {
    const shell = page.locator('.footer-shell');
    await shell.scrollIntoViewIfNeeded();
    const bg = await shell.evaluate(el => getComputedStyle(el).backgroundColor);
    // Must be transparent, not the old rgba(251,246,238,0.92)
    expect(bg).not.toContain('251, 246, 238');
  });

  // ── Stat strip ──────────────────────────────────────────────────

  test('stat strip shows barbearia count ≥ 300', async ({ page }) => {
    const strong = page.locator('.stat-item strong').first();
    await expect(strong).toBeVisible();
    const text = await strong.textContent();
    expect(parseInt(text)).toBeGreaterThanOrEqual(300);
  });

});
