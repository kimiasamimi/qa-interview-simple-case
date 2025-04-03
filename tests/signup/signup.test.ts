import { test } from './signup-base';
import { expect } from '@playwright/test';
import { SignUpPage } from '../pages/signup.page';

test.describe('Sign Up Form', () => {
  let signupPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    signupPage = new SignUpPage(page);
    await signupPage.goto();
    // Take a screenshot of the initial signup form
    await expect(page).toHaveScreenshot('signup-form.png');
  });

  test('should successfully submit signup form and display welcome message', async ({ page, users }) => {
    const testUser = users[1];

    await signupPage.fillForm(
      testUser.firstName,
      testUser.lastName,
      testUser.email,
      testUser.password
    );
    await signupPage.submit();
    await signupPage.expectSuccessfulSignup();
    await signupPage.expectWelcomeMessageDisplayed(testUser.firstName, testUser.lastName);
    
    // Take a screenshot of the welcome page after successful signup
    await expect(page).toHaveScreenshot('welcome-page.png');
  });

  test('should store user data in localStorage after successful signup', async ({ page, users }) => {
    const testUser = users[1];

    await signupPage.fillForm(
      testUser.firstName,
      testUser.lastName,
      testUser.email,
      testUser.password
    );
    await signupPage.submit();
    await signupPage.expectSuccessfulSignup();

    const localStorage = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('users') || '{}');
    });
    expect(localStorage.users).toContainEqual(expect.objectContaining({
      email: testUser.email,
      firstName: testUser.firstName,
      lastName: testUser.lastName
    }));
  });

  test('should successfully logout after signup', async ({ page, users }) => {
    const testUser = users[1];

    await signupPage.fillForm(
      testUser.firstName,
      testUser.lastName,
      testUser.email,
      testUser.password
    );
    await signupPage.submit();
    await signupPage.expectSuccessfulSignup();

    await page.getByText('Log out').click();
    await expect(page).toHaveURL('http://localhost:8080/login');
    
    // Take a screenshot of the login page after logout
    await expect(page).toHaveScreenshot('login-page-after-logout.png');
  });
}); 