const { Page } = require("./page");

const userName = "div#sidebar a.user.active";
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
    return await super.getElement(userName);
  }

  async getUserFirstName() {
    return await super.getElement(userFirstName);
  }

  async getUserLastName() {
    return await super.getElement(userLastName);
  }

  async getUserEmail() {
    return await super.getElement(userEmail);
  }

  async getUserIRCnick() {
    return await super.getElement(userIRCnick);
  }
}

module.exports = { MyAccountPage };
