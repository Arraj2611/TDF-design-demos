import { test, expect } from '@playwright/test';

test.describe('routes', () => {
  test('landing has 10 variant links', async ({ page }) => {
    await page.goto('/');
    const links = page.locator('main a[href^="/v"]');
    await expect(links).toHaveCount(10);
  });

  test('/v1 renders with hero canvas', async ({ page }) => {
    await page.goto('/v1');
    await expect(page.locator('canvas').first()).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('/v2 renders with hero card canvas', async ({ page }) => {
    await page.goto('/v2');
    await expect(page.locator('canvas').first()).toBeVisible();
  });

  test('FAB present and opens menu', async ({ page }) => {
    await page.goto('/v1');
    const fab = page.getByRole('button', { name: /edition/i }).first();
    await expect(fab).toBeVisible();
    await fab.click();
    await expect(page.getByRole('menu')).toBeVisible();
  });

  test('language toggle flips content on /v1', async ({ page }) => {
    await page.goto('/v1');
    const h1 = page.getByRole('heading', { level: 1 }).first();
    const en = await h1.textContent();
    const mrBtn = page.getByRole('button', { name: /मराठी/ }).first();
    await mrBtn.click();
    // wait a tick for React state to settle and re-render
    await page.waitForTimeout(300);
    const mr = await h1.textContent();
    expect(mr).not.toBe(en);
  });
});
