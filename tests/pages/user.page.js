const { Page } = require("./page");

const userFirstLastName = "//h2/text()";
const userName = "//li[text()][1]";
const userEmail = "//li[text()][2]";
const userIRCnick = "li.string_cf.cf_3";
const myAccountLink = "a[href='/my/account']";

class UserPage extends Page {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async getUserFirstLastName() {
    return await super.getElement(userFirstLastName);
  }

  async getUserName() {
    return await super.getElement(userName);
  }

  async getUserEmail() {
    return await super.getElement(userEmail);
  }

  async getUserIRCnick() {
    return await super.getElement(userIRCnick);
  }

  async getMyAccountLink() {
    return await super.getElement(myAccountLink);
  }

  async clickMyAccountLink() {
    await super.clickElement(myAccountLink);
  }
}

module.exports = { UserPage };
