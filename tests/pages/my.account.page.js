const { Page } = require("./page");

const userName = "//*[@id='sidebar']//a";
const userFirstName = "#user_firstname";
const userLastName = "#user_lastname";
const userEmail = "#user_mail";
const userIRCnick = "#user_custom_field_values_3";

class MyAccountPage extends Page {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async openMyAccountUrl() {
    await super.openUrl("/my/account");
  }

  async getUserName() {
    await super.getElement(userName);
  }

  async getUserFirstName() {
    await super.getElement(userFirstName);
  }

  async getUserLastName() {
    await super.getElement(userLastName);
  }

  async getUserEmail() {
    await super.getElement(userEmail);
  }

  async getUserIRCnick() {
    await super.getElement(userIRCnick);
  }
}

module.exports = { MyAccountPage };
