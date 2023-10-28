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

  async openLoginUrl() {
    await super.openUrl("/login");
  }

  async getLoginField() {
    await super.getElement(loginField);
  }

  async fillLoginField(username) {
    await super.fillElement(loginField, username);
  }

  async getPasswordField() {
    await super.getElement(passwordField);
  }

  async fillPasswordField(password) {
    await super.fillElement(passwordField, password);
  }

  async getLoginButton() {
    await super.getElement(loginButton);
  }

  async clickLoginButton() {
    await super.clickElement(loginButton);
  }

  async getLoginErrorMsg() {
    await super.getElement(loginErrorMsg);
  }
}

module.exports = { LoginPage };