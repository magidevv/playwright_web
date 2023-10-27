const { Page } = require("./page");

const userFirstLastName = "//h2/text()";
const userName = "//li[contains(text(),'Пользователь:')]";
const userEmail = "//li[contains(text(),'Email:')]";
const userIRCnick = "li.string_cf.cf_3";
const myAccountLink = "a[href='/my/account']";

class UserPage extends Page {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async getUserFirstLastName() {
    await super.getElement(userFirstLastName);
  }

  async getUserName() {
    await super.getElement(userName);
  }

  async getUserEmail() {
    await super.getElement(userEmail);
  }

  async getUserIRCnick() {
    await super.getElement(userIRCnick);
  }

  async getMyAccountLink() {
    await super.getElement(myAccountLink);
  }

  async clickMyAccountLink() {
    await super.clickElement(myAccountLink);
  }
}

module.exports = { UserPage };
