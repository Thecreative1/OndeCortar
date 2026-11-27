// @ts-check
const { test, expect } = require('@playwright/test');

// Menu mobile da loja/revista (commerce.css) e das páginas com mobile-nav.css.
// Regressão de 2026-11-27: o backdrop-filter do .site-header fazia do cabeçalho
// o contentor dos filhos position: fixed — o fundo escurecido media 375×86 e
// ficava por cima do botão "Fechar".
const PAGES = [
  '/loja/',
  '/loja/kits-de-barba/',
  '/revista/',
  '/revista/melhores-maquinas-para-cortar-cabelo-em-casa/',
  '/faq.html',
  '/cidades/abrantes/',
];

async function openMenu(page) {
  await page.locator('.nav-toggle').click();
  await expect(page.locator('.nav')).toHaveClass(/is-open/);
  // espera pela transição do painel (0.22s)
  await expect.poll(() => page.locator('.nav-links').evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
}

test.describe('Menu mobile (375 px)', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  for (const path of PAGES) {
    test(`${path}: fundo cobre o ecrã e "Fechar" fica por cima`, async ({ page }) => {
      await page.goto(path);
      await openMenu(page);

      const box = await page.locator('.nav-backdrop').boundingBox();
      expect(box).not.toBeNull();
      expect(Math.round(box.width)).toBe(375);
      expect(Math.round(box.height)).toBe(812);

      // o elemento no centro do botão é o próprio botão, não o fundo
      const toggleOnTop = await page.locator('.nav-toggle').evaluate((btn) => {
        const r = btn.getBoundingClientRect();
        const el = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
        return !!el && !!el.closest('.nav-toggle');
      });
      expect(toggleOnTop).toBe(true);
      await expect(page.locator('.nav-toggle')).toContainText('Fechar');

      // o painel também fica por cima do fundo
      const linkOnTop = await page.locator('.nav-links a').first().evaluate((a) => {
        const r = a.getBoundingClientRect();
        const el = document.elementFromPoint(r.x + 20, r.y + r.height / 2);
        return !!el && !!el.closest('.nav-links');
      });
      expect(linkOnTop).toBe(true);
    });

    test(`${path}: Escape e toque fora fecham o menu`, async ({ page }) => {
      await page.goto(path);
      await openMenu(page);
      await page.keyboard.press('Escape');
      await expect(page.locator('.nav')).not.toHaveClass(/is-open/);

      await openMenu(page);
      await page.mouse.click(187, 760);
      await expect(page.locator('.nav')).not.toHaveClass(/is-open/);
      await expect(page.locator('body')).not.toHaveClass(/nav-open/);
    });
  }
});

test('desktop: cabeçalho da revista mantém o desfoque e o menu em linha', async ({ page }) => {
  await page.goto('/revista/');
  const header = await page.locator('.site-header').evaluate((el) => getComputedStyle(el).backdropFilter);
  expect(header).toBe('blur(14px)');
  await expect(page.locator('.nav-toggle')).toBeHidden();
  await expect(page.locator('.nav-links a').first()).toBeVisible();
});
