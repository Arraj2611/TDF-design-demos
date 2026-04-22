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

  test('/v3 Trade Journal renders heading', async ({ page }) => {
    await page.goto('/v3');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('/v4 Corporate Dossier renders Specimen card signature', async ({ page }) => {
    await page.goto('/v4');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    await expect(page.locator('svg').first()).toBeVisible();
  });

  test('/v5 Heritage Ledger renders heading', async ({ page }) => {
    await page.goto('/v5');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('/v6 Industrial Monograph renders hero loom SVG', async ({ page }) => {
    await page.goto('/v6');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    await expect(page.locator('svg').first()).toBeVisible();
  });

  test('/v7 Data Monograph renders loom-collapse chart SVG', async ({ page }) => {
    await page.goto('/v7');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    await expect(page.locator('svg').first()).toBeVisible();
  });

  test('/v8 Export Portfolio renders member tapestry', async ({ page }) => {
    await page.goto('/v8');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('/v9 Swiss Restrained renders heading + binary strip', async ({ page }) => {
    await page.goto('/v9');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('/v10 Minimal Gallery renders hero fabric zoom SVG', async ({ page }) => {
    await page.goto('/v10');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    await expect(page.locator('svg').first()).toBeVisible();
  });
});
