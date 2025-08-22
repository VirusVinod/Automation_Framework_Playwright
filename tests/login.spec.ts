import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../utils/testData';
import { verifyURL, verifyText } from '../utils/helpers';

test.describe('Login Tests', () => {
  test('Valid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(testData.validUser.username, testData.validUser.password);

    await verifyURL(page, 'inventory.html');
  });

  test('Invalid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(testData.invalidUser.username, testData.invalidUser.password);

    await verifyText(loginPage.errorMessage, 'Epic sadface: Username and password do not match any user in this service');
  });
});