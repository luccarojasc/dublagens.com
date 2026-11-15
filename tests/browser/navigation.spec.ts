import { test, expect } from '@playwright/test';

const film = '/filmes/deu-a-louca-na-chapeuzinho/';
const people = ['dani', 'lucca', 'manga', 'primo', 'rafael', 'rors', 'tulera'];

test('percurso principal por cliques, salto ao elenco e retornos', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.feed > li')).toHaveCount(8);
  await page.locator('.featured-film').click();
  await expect(page).toHaveURL(film);
  await page.getByRole('link', { name: 'Ver elenco', exact: false }).click();
  await expect(page).toHaveURL(`${film}#elenco`);
  await expect(page.locator('#elenco')).toBeFocused();
  const rows = page.locator('.credits tbody tr');
  await expect(rows).toHaveCount(50);
  await rows.filter({ has: page.getByRole('rowheader', { name: 'Lobo', exact: true }) }).getByRole('link', { name: 'Lucca' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Lucca');
  await expect(page.locator('.roles h3')).toHaveText(['Lobo', 'Urso do campeonato', 'backvocal triste', 'Reporter 2', 'Coral de Passaros 1']);
  await page.locator('.roles a').first().click();
  await expect(page).toHaveURL(film);
  await expect(page.getByRole('link', { name: /Assistir no YouTube/ })).toHaveAttribute('href', 'https://www.youtube.com/watch?v=rz588bfbFAU');
  await expect(page.getByRole('link', { name: /Assistir no YouTube/ })).toHaveAttribute('target', '_blank');
  await page.reload();
  await page.getByRole('link', { name: '← Voltar aos filmes', exact: true }).first().click();
  await expect(page).toHaveURL('/filmes/');
});

test('teclado: menu, assistir, salto ao elenco e link de voz', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused();
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeInViewport();
  await page.keyboard.press('Tab'); // marca
  await page.keyboard.press('Tab'); // início
  await page.keyboard.press('Tab'); // filmes
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Filmes', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/filmes/');
  await page.goto(film);
  for (let i = 0; i < 7; i++) await page.keyboard.press('Tab');
  const watch = page.getByRole('link', { name: /Assistir no YouTube/ });
  await expect(watch).toBeFocused();
  await expect(watch).toHaveCSS('outline-width', '2px');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(page.locator('#elenco')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('.credits a').first()).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/dubladores/dani/');
});

for (const width of [1440, 390, 320]) {
  test(`11 páginas, imagens e alvos de toque em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/filmes/', film, '/dubladores/', ...people.map(id => `/dubladores/${id}/`)]) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path).toBe(true);
      expect(await page.locator('img').evaluateAll(images => images.every(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0)), path).toBe(true);
      if (width < 600) {
        expect(await page.locator('a:not(.skip-link)').evaluateAll(links => links.every(a => a.getBoundingClientRect().height >= 44)), path).toBe(true);
      }
    }
  });
}
