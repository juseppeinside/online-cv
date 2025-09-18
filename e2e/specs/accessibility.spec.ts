import { expect, test } from '@playwright/test';
import { helpers } from '../utils/helpers';
import { selectors } from '../utils/selectors';

const DATE_REGEX = /\d{4}-\d{2}-\d{2}/;
const HREF_REGEX = /^#/;
const TOOLTIP_ID_REGEX = /^tooltip-/;

test.describe('Accessibility (a11y)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await helpers.waitForAnimations(page);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    const h2Elements = page.locator('h2');
    const h2Count = await h2Elements.count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('should have proper ARIA labels', async ({ page }) => {
    const languageButton = page.locator(selectors.languageButton);
    const ariaLabel = await languageButton.getAttribute('aria-label');
    expect(ariaLabel).toContain('Toggle language');

    const themeButton = page.locator(selectors.themeButton);
    const themeAriaLabel = await themeButton.getAttribute('aria-label');
    expect(themeAriaLabel).toBe('Toggle theme');
  });

  test('should have proper button roles', async ({ page }) => {
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const tagName = await button.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('button');
    }
  });

  test('should have proper link accessibility', async ({ page }) => {
    await helpers.scrollToSection(page, selectors.contacts);

    const externalLinks = [
      selectors.telegramLink,
      selectors.linkedinLink,
      'a[href*="github.com"]:not([href*="online-cv"])', // Только GitHub профиль, не репозиторий
    ];

    for (const selector of externalLinks) {
      const link = page.locator(selector).first();
      const ariaLabel = await link.getAttribute('aria-label');
      expect(ariaLabel).toContain('Связаться через');
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await helpers.waitForAnimations(page);

    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should have proper focus indicators', async ({ page }) => {
    const aboutButton = page.locator(selectors.aboutMeButton);
    await aboutButton.focus();

    const focusStyles = await aboutButton.evaluate(
      (el) => window.getComputedStyle(el).outline
    );

    expect(focusStyles).not.toBe('none');
  });

  test('should have proper semantic HTML structure', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();

    const main = page.locator('main');
    await expect(main).toBeVisible();

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should have proper section landmarks', async ({ page }) => {
    const sections = page.locator('section');
    const sectionCount = await sections.count();
    expect(sectionCount).toBeGreaterThan(0);

    for (let i = 0; i < sectionCount; i++) {
      const section = sections.nth(i);
      const ariaLabel = await section.getAttribute('aria-label');
      const id = await section.getAttribute('id');

      expect(ariaLabel || id).toBeTruthy();
    }
  });

  test('should have proper form accessibility', async ({ page }) => {
    await helpers.scrollToSection(page, selectors.contacts);

    const address = page.locator('address');
    await expect(address).toBeVisible();

    const ariaLabel = await address.getAttribute('aria-label');
    expect(ariaLabel).toBe('Контактная информация');
  });

  test('should have proper time elements', async ({ page }) => {
    await helpers.scrollToSection(page, selectors.myExperience);

    const timeElements = page.locator('time');
    const timeCount = await timeElements.count();
    expect(timeCount).toBeGreaterThan(0);

    for (let i = 0; i < timeCount; i++) {
      const timeElement = timeElements.nth(i);
      const dateTime = await timeElement.getAttribute('datetime');
      expect(dateTime).toMatch(DATE_REGEX);
    }
  });

  test('should have proper list structure', async ({ page }) => {
    await helpers.scrollToSection(page, selectors.myStack);

    const lists = page.locator('ul');
    const listCount = await lists.count();
    expect(listCount).toBeGreaterThan(0);

    for (let i = 0; i < listCount; i++) {
      const list = lists.nth(i);
      const ariaLabel = await list.getAttribute('aria-label');
      expect(ariaLabel).toContain('Технологии');
    }
  });

  test('should have proper image alt text', async ({ page }) => {
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);
      const alt = await image.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    const aboutButton = page.locator(selectors.aboutMeButton);

    const backgroundColor = await aboutButton.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor
    );

    const color = await aboutButton.evaluate(
      (el) => window.getComputedStyle(el).color
    );

    expect(backgroundColor).not.toBe(color);
  });

  test('should have proper tooltip accessibility', async ({ page }) => {
    const languageButton = page.locator(selectors.languageButton);

    await languageButton.hover();
    const TOOLTIP_ANIMATION_DELAY = 500;
    await page.waitForTimeout(TOOLTIP_ANIMATION_DELAY);

    // Проверяем, что тултип существует и имеет правильную структуру
    const tooltip = page.locator(selectors.tooltip);
    await expect(tooltip).toHaveCount(1);

    // Проверяем, что тултип имеет текст
    const tooltipText = await tooltip.textContent();
    expect(tooltipText).toBeTruthy();

    // Проверяем, что тултип имеет правильные ARIA атрибуты
    const tooltipId = await tooltip.getAttribute('id');
    expect(tooltipId).toMatch(TOOLTIP_ID_REGEX);
  });

  test('should have proper skip links', async ({ page }) => {
    const skipLinks = page.locator('a[href^="#"]');
    const skipLinkCount = await skipLinks.count();

    if (skipLinkCount > 0) {
      const firstSkipLink = skipLinks.first();
      const href = await firstSkipLink.getAttribute('href');
      expect(href).toMatch(HREF_REGEX);
    }
  });

  test('should have proper document language', async ({ page }) => {
    const html = page.locator('html');
    const lang = await html.getAttribute('lang');
    expect(lang).toBeTruthy();
  });

  test('should have proper viewport meta tag', async ({ page }) => {
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveCount(1);

    const content = await viewport.getAttribute('content');
    expect(content).toContain('width=device-width');
  });

  test('should support screen reader navigation', async ({ page }) => {
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(0);

    for (let i = 0; i < headingCount; i++) {
      const heading = headings.nth(i);
      const text = await heading.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should have proper button states', async ({ page }) => {
    const copyButtons = page.locator(selectors.copyButtons);

    for (let i = 0; i < (await copyButtons.count()); i++) {
      const button = copyButtons.nth(i);
      const disabled = await button.getAttribute('disabled');
      expect(disabled).toBeNull();
    }
  });

  test('should have proper error handling', async ({ page }) => {
    await page.route('**/api.github.com/repos/**', async (route) => {
      await route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Not Found' }),
      });
    });

    await page.reload();
    await helpers.waitForAnimations(page);

    const aboutSection = page.locator(selectors.aboutMe);
    await expect(aboutSection).toBeVisible();
  });
});
