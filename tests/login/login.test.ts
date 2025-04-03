import { expect } from '@playwright/test'
import { test } from './login-base'
import { LoginPage } from '../pages/login.page'

test.describe('Login Form', () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.goto()
  })

  test('should successfully login with valid credentials', async ({ users }) => {
    const existingUser = users[0]

    await loginPage.login(existingUser.email, existingUser.password)
    await loginPage.expectSuccessfulLogin()
  })

  test('should show error with invalid credentials', async () => {
    await loginPage.login('invalid@example.com', 'wrongpassword')
    await loginPage.expectLoginError('Invalid credentials')
  })

  test('should disable login button when validation fails', async () => {
    await loginPage.emailInput.fill('invalidemail')
    await loginPage.passwordInput.fill('123')
    await expect(loginPage.loginButton).toBeDisabled()
  })
})
