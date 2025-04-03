import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.logoutButton = page.getByText('Log out');
  }

  // Navigation
  async goto() {
    await this.page.goto('localhost:8080/login');
  }

  // Actions
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async fillForm(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  // Assertions
  async expectSuccessfulLogin() {
    await expect(this.logoutButton).toBeVisible();
  }

  async expectLoginError(errorMessage: string) {
    await expect(this.page.getByText(errorMessage)).toBeVisible();
  }

  async expectFieldValidationError(fieldError: string) {
    await expect(this.page.getByText(fieldError)).toBeVisible();
  }
} 