import { expect, Page } from '@playwright/test';

export async function verifyURL(page: Page, urlPart: string) {
  await expect(page).toHaveURL(new RegExp(urlPart));
}

export async function verifyText(locator, text: string) {
  await expect(locator).toContainText(text);
}