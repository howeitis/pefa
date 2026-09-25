import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { FICTION_NOTICE } from '../../src/components/shared/OocStrip';
import { CLUB_PATH, materialFor, PAGES } from '../../src/site-map';

const paths = [
  ...PAGES.map((p) => p.path),
  CLUB_PATH('armory'),
  '/newsroom/corporate-website-launch',
];

for (const path of paths) {
  test(`${path} renders, carries the fiction notice, and is axe-clean`, async ({ page }) => {
    const requests: string[] = [];
    page.on('request', (r) => {
      const url = new URL(r.url());
      if (url.hostname !== 'localhost') requests.push(r.url());
    });

    await page.goto(path);
    await expect(page.locator('body')).toHaveAttribute('data-material', materialFor(path));
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('footer').getByText(FICTION_NOTICE)).toBeVisible();

    // Nothing sticks out past the viewport. Checked per element, because
    // body's overflow-x: hidden would otherwise hide the overflow from a
    // plain scrollWidth check (it clipped the mobile header once).
    const overflowing = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      return [...document.querySelectorAll('header *, main *, footer *')]
        .filter((el) => !el.closest('.ticker, .sr-only') && el.getClientRects().length > 0)
        .filter((el) => el.getBoundingClientRect().right > vw + 1)
        .map(
          (el) =>
            el.tagName.toLowerCase() +
            (el.className ? '.' + String(el.className).split(' ')[0] : ''),
        );
    });
    expect(overflowing).toEqual([]);

    // Nothing leaves the site: no fonts, analytics or trackers.
    expect(requests).toEqual([]);
    expect(await page.context().cookies()).toEqual([]);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });
}

test('unknown routes show the not-invited page', async ({ page }) => {
  await page.goto('/superior-league/clubs/not-a-club');
  await expect(page.getByRole('heading', { name: /not invited/i })).toBeVisible();
});

test('house inventory is always labelled as house content', async ({ page }) => {
  await page.goto('/partners');
  const slots = page.locator('#inventory li');
  await expect(slots).not.toHaveCount(0);
  for (const slot of await slots.all()) {
    await expect(slot.getByText('PEFA™ house content')).toBeVisible();
  }
});
