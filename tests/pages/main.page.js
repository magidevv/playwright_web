const { Page } = require("./page");

const loginLink = "a[href='/login']";
const registrationLink = "a[href='/account/register']";

class MainPage extends Page {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async openMainUrl() {
    await super.openUrl();
  }

  async getLoginLink() {
    await super.getElement(loginLink);
  }

  async clickLoginLink() {
    await super.clickElement(loginLink);
  }

  async getRegistrationLink() {
    await super.getElement(registrationLink);
  }

  async clickRegistrationLink() {
    await super.clickElement(registrationLink);
  }
}

module.exports = { MainPage };
