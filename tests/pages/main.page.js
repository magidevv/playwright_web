const { Page } = require("./page");

const loginLink = "a[href='/login']";
const registrationLink = "a[href='/account/register']";
const loggedAsUser = "#loggedas";

class MainPage extends Page {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async openMainUrl() {
    await super.openUrl();
  }

  async getLoginLink() {
    return await super.getElement(loginLink);
  }

  async clickLoginLink() {
    await super.clickElement(loginLink);
  }

  async getLoggedAsUser() {
    return await super.getElement(loggedAsUser);
  }

  async clickLoggedAsUser() {
    await super.clickElement(loggedAsUser);
  }

  async getRegistrationLink() {
    return await super.getElement(registrationLink);
  }

  async clickRegistrationLink() {
    await super.clickElement(registrationLink);
  }
}

export default MainPage;
