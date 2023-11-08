const { expect } = require("@playwright/test");
const { Page } = require("./page");

const loginField = "#username";
const passwordField = "#password";
const loginButton = "#login-submit";
const loginErrorMsg = "#flash_error";

class LoginPage extends Page {
  constructor(page) {
    super(page);
    this.page = page;
  }

  static blankUsername_error = "Login cannot be blank";
  static blankPassword_error =
    "Password is too short (minimum is 8 characters)";

  async openLoginUrl() {
    await super.openUrl("/login");
  }

  async getLoginField() {
    return await super.getElement(loginField);
  }

  async getPasswordField() {
    return await super.getElement(passwordField);
  }

  async displayLoginForm() {
    await expect(await this.getLoginField()).toBeVisible();
    await expect(await this.getPasswordField()).toBeVisible();
    await expect(await this.getLoginButton()).toBeVisible();
  }

  async fillLoginForm(login, password) {
    await super.fillElement(loginField, login);
    await super.fillElement(passwordField, password);
  }

  async getLoginButton() {
    return await super.getElement(loginButton);
  }

  async clickLoginButton() {
    await super.clickElement(loginButton);
  }

  async getLoginErrorMsg() {
    return await super.getElement(loginErrorMsg);
  }

  async checkRedHighlightFields(fields) {
    for (const field of fields) {
      const selector = `label[for="${field}"]`;
      const errorLabel = await super.getElement(selector);
      await expect.soft(errorLabel).toHaveCSS("color", "rgb(187, 0, 0)");
    }
  }
}

export default LoginPage;
