const { expect } = require("@playwright/test");
const { Page } = require("./page");

const loginField = "#username";
const passwordField = "#password";
const loginButton = "#login-submit";
const loginErrorMsg = "#flash_error";

const { USER_LOGIN, USER_PASSWORD } = process.env;

class LoginPage extends Page {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async openLoginUrl() {
    const baseURL = process.env.ENV;
    await this.openUrl(baseURL + "/login");
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

  async fillLoginForm() {
    await super.fillElement(loginField, USER_LOGIN);
    await super.fillElement(passwordField, USER_PASSWORD);
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

module.exports = { LoginPage };
