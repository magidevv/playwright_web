const { test, expect } = require("@playwright/test");
const { faker } = require("@faker-js/faker");
const { MainPage } = require("../pages/main.page");
const { LoginPage } = require("../pages/login.page");
const { MyPage } = require("../pages/my.page");
const { UserPage } = require("../pages/user.page");
const { MyAccountPage } = require("../pages/my.account.page");

let mainPage;
let loginPage;
let myPage;
let userPage;
let myAccountPage;

const randomName = faker.person.fullName();
const randomEmail = faker.internet.email();

test.describe("Login Page testing", () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    loginPage = new LoginPage(page);
    myPage = new MyPage(page);
    userPage = new UserPage(page);
    myAccountPage = new MyAccountPage(page);
    await mainPage.openMainUrl();
  });

  test("Login with valid credentials", async () => {
    await expect(await mainPage.getLoginLink()).toBeVisible();
    await mainPage.clickLoginLink();
    await expect(page).toHaveURL(/\/login$/);
    await expect(await loginPage.getLoginField()).toBeVisible();
    //await loginPage.fillLoginField(username);
    await expect(await loginPage.getPasswordField()).toBeVisible();
    //await loginPage.fillPasswordField(password);
    await expect(await mainPage.getLoginButton()).toBeVisible();
    await mainPage.clickLoginButton();
    await expect(page).toHaveURL(/my\/page$/);
    await expect(await myPage.getLoggedAsUser()).toBeVisible();
    await myPage.clickLoggedAsUser();
    await expect(page).toHaveURL(/users\//);
    // await expect(await userPage.getUserFirstLastName()).toHaveText(firstlastname);
    // await expect(await userPage.getUserName()).toHaveText(name);
    // await expect(await userPage.getUserEmail()).toHaveText(email);
    // await expect(await userPage.getUserIRCnick()).toHaveText(ircnick);
    await expect(await userPage.getMyAccountLink()).toBeVisible();
    await userPage.clickMyAccountLink();
    await expect(page).toHaveURL(/my\/account$/);
    // await expect(await userPage.getUserName()).toHaveText(name);
    // await expect(await userPage.getUserFirstName()).toHaveText(firstname);
    // await expect(await userPage.getUserLastName()).toHaveText(lastname);
    // await expect(await userPage.getUserEmail()).toHaveText(email);
    // await expect(await userPage.getUserIRCnick()).toHaveText(ircnick);
  });
});
