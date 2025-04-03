import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class SignUpPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.welcomeMessage = page.getByText(/Welcome.*/, { exact: false });
  }

  async goto() {
    await this.page.goto('http://localhost:8080/signup');
  }

  async fillForm(firstName: string, lastName: string, email: string, password: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async expectSuccessfulSignup() {
    await expect(this.page).toHaveURL('http://localhost:8080/');
  }

  async expectWelcomeMessageDisplayed(firstName: string, lastName: string) {
    await expect(this.welcomeMessage).toContainText(`${firstName} ${lastName}`);
  }
} 