import { test } from './login-base';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Form Visual Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should match login form snapshot', async ({ page }) => {
    // Test the initial login form
    await expect(page).toHaveScreenshot('login-form.png', {
      fullPage: true,
      mask: [page.locator('input[type="password"]')], // Mask sensitive data
    });
  });

  test('should match login form with validation errors', async ({ page }) => {
    // Submit empty form to trigger validation errors
    await loginPage.submit();
    
    // Test the form with validation errors
    await expect(page).toHaveScreenshot('login-form-validation-errors.png', {
      fullPage: true,
      mask: [page.locator('input[type="password"]')],
    });
  });

  test('should match login form with invalid credentials', async ({ page }) => {
    // Fill form with invalid credentials
    await loginPage.fillForm('invalid@email.com', 'wrongpassword');
    await loginPage.submit();
    
    // Test the form with invalid credentials error
    await expect(page).toHaveScreenshot('login-form-invalid-credentials.png', {
      fullPage: true,
      mask: [page.locator('input[type="password"]')],
    });
  });

  test('should match welcome page after successful login', async ({ page, users }) => {
    const testUser = users[0];
    
    // Fill and submit the form
    await loginPage.fillForm(testUser.email, testUser.password);
    await loginPage.submit();
    await loginPage.expectSuccessfulLogin();
    
    // Test the welcome page
    await expect(page).toHaveScreenshot('welcome-page-after-login.png', {
      fullPage: true,
    });
  });

  test('should match login page after logout', async ({ page, users }) => {
    const testUser = users[0];
    
    // Login and then logout
    await loginPage.fillForm(testUser.email, testUser.password);
    await loginPage.submit();
    await loginPage.expectSuccessfulLogin();
    await page.getByText('Log out').click();
    
    // Test the login page after logout
    await expect(page).toHaveScreenshot('login-page-after-logout.png', {
      fullPage: true,
    });
  });
}); 