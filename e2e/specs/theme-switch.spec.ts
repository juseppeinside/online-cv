import { expect, test } from '@playwright/test';
import { helpers } from '../utils/helpers';
import { selectors } from '../utils/selectors';

test.describe('Theme Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await helpers.waitForAnimations(page);
  });

  test('should display theme toggle button', async ({ page }) => {
    await helpers.checkElementVisible(page, selectors.themeButton);
  });

  test('should switch between light and dark themes', async ({ page }) => {
    const initialBodyClass = await page.evaluate(() => document.body.className);

    await page.click(selectors.themeButton);
    await helpers.waitForAnimations(page);

    const newBodyClass = await page.evaluate(() => document.body.className);
    expect(newBodyClass).not.toBe(initialBodyClass);
  });

  test('should persist theme selection in localStorage', async ({ page }) => {
    await page.click(selectors.themeButton);
    await helpers.waitForAnimations(page);

    const storedTheme = await helpers.getLocalStorageValue(page, 'theme');
    expect(['light', 'dark']).toContain(storedTheme);

    await page.reload();
    await helpers.waitForAnimations(page);

    const bodyClass = await page.evaluate(() => document.body.className);
    expect(bodyClass).toBe(storedTheme);
  });

  test('should apply dark theme correctly', async ({ page }) => {
    await page.click(selectors.themeButton);
    await helpers.waitForAnimations(page);

    const bodyClass = await page.evaluate(() => document.body.className);
    expect(bodyClass).toBe('dark');

    const primaryColor = await page.evaluate(() =>
      getComputedStyle(document.body).getPropertyValue('--color-primary')
    );
    expect(primaryColor.trim()).toBe('#303030');
  });

  test('should apply light theme correctly', async ({ page }) => {
    await helpers.setLocalStorageValue(page, 'theme', 'dark');
    await page.reload();
    await helpers.waitForAnimations(page);

    await page.click(selectors.themeButton);
    await helpers.waitForAnimations(page);

    const bodyClass = await page.evaluate(() => document.body.className);
    expect(bodyClass).toBe('light');

    const primaryColor = await page.evaluate(() =>
      getComputedStyle(document.body).getPropertyValue('--color-primary')
    );
    expect(primaryColor.trim()).toBe('#c4c4c4');
  });

  test('should maintain theme after page refresh', async ({ page }) => {
    await page.click(selectors.themeButton);
    await helpers.waitForAnimations(page);

    const theme = await helpers.getLocalStorageValue(page, 'theme');

    await page.reload();
    await helpers.waitForAnimations(page);

    const bodyClass = await page.evaluate(() => document.body.className);
    expect(bodyClass).toBe(theme);
  });

  test('should respect system preference on first visit', async ({ page }) => {
    await helpers.clearLocalStorage(page);
    await page.reload();
    await helpers.waitForAnimations(page);

    const prefersDark = await page.evaluate(
      () => window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    const bodyClass = await page.evaluate(() => document.body.className);
    if (prefersDark) {
      expect(bodyClass).toBe('dark');
    } else {
      expect(bodyClass).toBe('light');
    }
  });

  test('should update theme button appearance', async ({ page }) => {
    const themeButton = page.locator(selectors.themeButton);

    const initialBackground = await themeButton.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor
    );

    await page.click(selectors.themeButton);
    await helpers.waitForAnimations(page);

    const newBackground = await themeButton.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor
    );

    expect(newBackground).not.toBe(initialBackground);
  });

  test('should handle theme switching with keyboard', async ({ page }) => {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await helpers.waitForAnimations(page);

    const bodyClass = await page.evaluate(() => document.body.className);
    expect(['light', 'dark']).toContain(bodyClass);
  });

  test('should update tooltip text when switching theme', async ({ page }) => {
    await page.hover(selectors.themeButton);
    await helpers.waitForAnimations(page);

    const tooltipText = await page
      .locator('nav div[id^="tooltip-"]:has-text("Theme")')
      .textContent();
    expect(tooltipText).toBe('Theme');

    await page.click(selectors.languageButton);
    await helpers.waitForAnimations(page);

    await page.hover(selectors.themeButton);
    await helpers.waitForAnimations(page);

    const russianTooltipText = await page
      .locator('nav div[id^="tooltip-"]:has-text("Тема")')
      .textContent();
    expect(russianTooltipText).toBe('Тема');
  });

  test('should maintain theme across all sections', async ({ page }) => {
    await page.click(selectors.themeButton);
    await helpers.waitForAnimations(page);

    const theme = await page.evaluate(() => document.body.className);

    await helpers.scrollToSection(page, selectors.aboutMe);
    const aboutMeTheme = await page.evaluate(() => document.body.className);
    expect(aboutMeTheme).toBe(theme);

    await helpers.scrollToSection(page, selectors.myStack);
    const stackTheme = await page.evaluate(() => document.body.className);
    expect(stackTheme).toBe(theme);

    await helpers.scrollToSection(page, selectors.contacts);
    const contactsTheme = await page.evaluate(() => document.body.className);
    expect(contactsTheme).toBe(theme);
  });

  test('should toggle theme multiple times correctly', async ({ page }) => {
    const initialTheme = await page.evaluate(() => document.body.className);

    await page.click(selectors.themeButton);
    await helpers.waitForAnimations(page);

    const firstToggle = await page.evaluate(() => document.body.className);
    expect(firstToggle).not.toBe(initialTheme);

    await page.click(selectors.themeButton);
    await helpers.waitForAnimations(page);

    const secondToggle = await page.evaluate(() => document.body.className);
    expect(secondToggle).toBe(initialTheme);
  });
});
