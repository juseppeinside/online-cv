import { expect, type Page } from '@playwright/test';

const ANIMATION_WAIT_TIME = 1000;

export const helpers = {
  async waitForAnimations(page: Page) {
    await page.waitForTimeout(ANIMATION_WAIT_TIME);
  },

  async scrollToSection(page: Page, sectionId: string) {
    await page.locator(sectionId).scrollIntoViewIfNeeded();
    await this.waitForAnimations(page);
  },

  async checkElementVisible(page: Page, selector: string) {
    await expect(page.locator(selector)).toBeVisible();
  },

  async checkElementHidden(page: Page, selector: string) {
    await expect(page.locator(selector)).not.toBeVisible();
  },

  async getLocalStorageValue(page: Page, key: string) {
    return await page.evaluate((keyName) => localStorage.getItem(keyName), key);
  },

  async setLocalStorageValue(page: Page, key: string, value: string) {
    await page.evaluate(
      ({ keyName, valueName }) => localStorage.setItem(keyName, valueName),
      {
        keyName: key,
        valueName: value,
      }
    );
  },

  async clearLocalStorage(page: Page) {
    await page.evaluate(() => localStorage.clear());
  },

  async waitForGSAPAnimations(page: Page) {
    await page.waitForFunction(() => {
      return (
        window.gsap && window.gsap.globalTimeline.getChildren().length === 0
      );
    });
  },

  async mockGithubAPI(page: Page, starsCount = 42) {
    await page.route('**/api.github.com/repos/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ stargazers_count: starsCount }),
      });
    });
  },

  async getElementText(page: Page, selector: string) {
    return await page.locator(selector).textContent();
  },

  async clickAndWait(page: Page, selector: string) {
    await page.click(selector);
    await this.waitForAnimations(page);
  },

  async checkClipboardContent(page: Page, expectedText: string) {
    const clipboardText = await page.evaluate(() =>
      navigator.clipboard.readText()
    );
    expect(clipboardText).toBe(expectedText);
  },

  async checkElementOpacity(
    page: Page,
    selector: string,
    expectedOpacity: number
  ) {
    const opacity = await page
      .locator(selector)
      .evaluate((el) => window.getComputedStyle(el).opacity);
    expect(Number.parseFloat(opacity)).toBeCloseTo(expectedOpacity, 1);
  },

  async checkElementPosition(page: Page, selector: string) {
    const boundingBox = await page.locator(selector).boundingBox();
    expect(boundingBox).not.toBeNull();
    return boundingBox;
  },

  async waitForElementToBeInViewport(page: Page, selector: string) {
    await page.waitForFunction((selector2) => {
      const element = document.querySelector(selector2);
      if (!element) {
        return false;
      }
      const rect = element.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }, selector);
  },
};
