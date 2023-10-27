const { Page } = require("./page");

const loggedAsUser = "#loggedas";

class MyPage extends Page {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async openMyUrl() {
    await super.openUrl("/my/page");
  }

  async getLoggedAsUser() {
    await super.getElement(loggedAsUser);
  }

  async clickLoggedAsUser() {
    await super.clickElement(loggedAsUser);
  }
}

module.exports = { MyPage };
