/**
 * Phase 4 interactions: each must work from the keyboard, under reduced
 * motion, and without making a single network request once the page is up.
 */
import { expect, type Page, test } from '@playwright/test';

/**
 * Record every request after this point that could carry data out: anything
 * off-site, anything but a GET, or a GET with a query string. Same-site
 * static assets (lazy-loaded crests scrolling into view) are not sending.
 */
function watchRequests(page: Page) {
  const requests: string[] = [];
  page.on('request', (r) => {
    const url = new URL(r.url());
    const sending = url.host !== 'localhost:4174' || r.method() !== 'GET' || url.search !== '';
    if (sending) requests.push(`${r.method()} ${r.url()}`);
  });
  return requests;
}

test.describe('Synergy Draft™ calculator', () => {
  test('scores from the keyboard, ignores footballing success, and sends nothing', async ({
    page,
  }) => {
    await page.goto('/synergy-draft');
    const requests = watchRequests(page);
    const status = page.locator('#eligibility [role="status"]');
    const before = await status.textContent();

    // The success slider moves, and the score does not.
    const slider = page.getByLabel('Previous footballing success (where relevant)');
    await slider.focus();
    await page.keyboard.press('End');
    await expect(page.getByText('100 / 100 · weighted at 0% · contributes 0 points')).toBeVisible();
    expect(await status.textContent()).toBe(before);

    // Tier radios are keyboard operable and move the score.
    await page.getByRole('radio', { name: 'Silver' }).focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('radio', { name: 'Gold' })).toBeChecked();
    await expect(status).not.toHaveText(before!);
    await expect(page.getByText(/Upgrade to Platinum for a projected score/)).toBeVisible();

    await page.getByLabel('Region').selectOption('europe');
    await expect(status).toContainText('forwarded to them');

    expect(requests).toEqual([]);
  });
});

test.describe('draft constellation', () => {
  test('replays the promo one crest at a time', async ({ page }) => {
    await page.goto('/synergy-draft');
    const pool = page.locator('#pool');
    await expect(pool.getByText('(highlighted)')).toHaveCount(5);
    await pool.getByRole('button', { name: 'Replay the promo' }).click();
    await expect(pool.getByText(/Promotional sequence: \d of 5 highlighted/)).toBeVisible();
    await expect(pool.getByText('(highlighted)')).toHaveCount(5, { timeout: 6000 });
    await expect(pool.getByRole('button', { name: 'Replay the promo' })).toBeEnabled();
  });

  test('lights all five at once under reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/superior-league');
    const pool = page.locator('#draft');
    await pool.getByRole('button', { name: 'Replay the promo' }).click();
    await expect(pool.getByText('(highlighted)')).toHaveCount(5);
    await expect(pool.getByRole('button', { name: 'Replay the promo' })).toBeEnabled();
  });
});

test.describe('request disclosure', () => {
  test('makes the Annual Report more redacted, and screen readers still hear it', async ({
    page,
  }) => {
    await page.goto('/investors/annual-report');
    const requests = watchRequests(page);
    const objectives = page.locator('ol').filter({ hasText: 'Transparency.' });
    const bars = objectives.locator('.redacted');
    await expect(bars).toHaveCount(3);

    const button = page.getByRole('button', { name: 'Request disclosure' });
    await button.press('Enter');
    await expect(bars).toHaveCount(4);
    await expect(page.getByRole('status').first()).toContainText('disclosure has been adjusted');
    await button.press('Enter');
    await expect(bars).toHaveCount(5);
    await button.press('Enter');
    await expect(page.getByText('higher subscription tier')).toBeVisible();

    // Redacted, not removed: the text stays in the accessibility tree.
    await expect(objectives.getByText('Transparency.')).toBeAttached();
    expect(requests).toEqual([]);
  });

  test('redacts Any Other Business in the minutes', async ({ page }) => {
    await page.goto('/governance/committee-minutes');
    const aob = page.locator('section').filter({ hasText: 'Any other business' });
    await expect(aob.locator('.redacted')).toHaveCount(1);
    for (let i = 0; i < 3; i++)
      await aob.getByRole('button', { name: 'Request disclosure' }).click();
    await expect(aob.locator('.redacted')).toHaveCount(4);
  });
});

test.describe('share board', () => {
  test('prerenders listing prices and hydrates into indicative quotes', async ({ page }) => {
    const res = await page.request.get('/investors');
    expect(await res.text()).toContain('Listed clubs, at listing');

    await page.goto('/investors');
    const requests = watchRequests(page);
    await expect(page.getByText(/Indicative quotes · \d{1,2} \w+ 20\d\d/)).toBeVisible();
    await expect(page.locator('#board tbody tr')).toHaveCount(28);
    expect(requests).toEqual([]);
  });

  test('is the same for two visitors on the same day', async ({ browser }) => {
    const read = async () => {
      const ctx = await browser.newContext();
      const p = await ctx.newPage();
      await p.goto('/investors');
      await expect(p.getByText(/Indicative quotes/)).toBeVisible();
      const text = await p.locator('#board tbody').innerText();
      await ctx.close();
      return text;
    };
    expect(await read()).toBe(await read());
  });
});
