const { Page } = require("./page");

const loginLink = "a[href='/login']";

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
}

module.exports = { MainPage };
