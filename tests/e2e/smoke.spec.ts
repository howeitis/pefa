import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { readdirSync } from 'node:fs';
import { FICTION_NOTICE } from '../../src/components/shared/OocStrip';
import { CLUB_PATH, clubSlugs, materialFor, NEWS_PATH, PAGES } from '../../src/site-map';

const newsSlugs = readdirSync(new URL('../../src/content/newsroom', import.meta.url))
  .filter((f) => f.endsWith('.mdx'))
  .map((f) => f.replace(/\.mdx$/, ''));

const paths = [
  ...PAGES.map((p) => p.path),
  ...clubSlugs().map(CLUB_PATH),
  ...newsSlugs.map(NEWS_PATH),
];

for (const path of paths) {
  test(`${path} renders, carries the fiction notice, and is axe-clean`, async ({ page }) => {
    const requests: string[] = [];
    page.on('request', (r) => {
      const url = new URL(r.url());
      if (url.hostname !== 'localhost') requests.push(r.url());
    });

    // Reduced motion turns the scroll reveal off. Otherwise axe can catch an
    // element mid-fade at the foot of the viewport and flag its contrast.
    await page.emulateMedia({ reducedMotion: 'reduce' });
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

test('every club listing prints its TokTok reach and owner', async ({ page }) => {
  for (const slug of clubSlugs()) {
    await page.goto(CLUB_PATH(slug));
    await expect(page.getByText('TokTok reach', { exact: true })).toBeVisible();
    await expect(page.getByText('Owner', { exact: true })).toBeVisible();
  }
});

test('supporter feedback replies in the browser and sends nothing', async ({ page }) => {
  await page.goto('/support');
  const requests: string[] = [];
  page.on('request', (r) => requests.push(r.url()));
  await page.getByLabel('Topic').selectOption('offside');
  await page.getByLabel('Your feedback').fill('That was never offside.');
  await page.getByRole('button', { name: 'Submit feedback' }).click();
  await expect(page.getByRole('status')).toContainText(/Reference SF-\d{6}/);
  await expect(page.getByRole('status')).toContainText('Clawed AI');
  expect(requests).toEqual([]);
});
