const { expect } = require("@playwright/test");
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

  async checkUserCredentials(login, firstname, lastname, email, IRCnick) {
    await expect(await this.getUserName()).toHaveText(login);
    await expect(await this.getUserFirstName()).toHaveValue(firstname);
    await expect(await this.getUserLastName()).toHaveValue(lastname);
    await expect(await this.getUserEmail()).toHaveValue(email);
    await expect(await this.getUserIRCnick()).toHaveValue(IRCnick);
  }
}

module.exports = { MyAccountPage };
