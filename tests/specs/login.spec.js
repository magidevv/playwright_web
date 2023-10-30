const { test, expect } = require("@playwright/test");
const { MainPage } = require("../pages/main.page");
const { LoginPage } = require("../pages/login.page");
const { UserPage } = require("../pages/user.page");
const { MyAccountPage } = require("../pages/my.account.page");

let mainPage;
let loginPage;
let userPage;
let myAccountPage;

const {
  USER_LOGIN,
  USER_FIRST_NAME,
  USER_LAST_NAME,
  USER_EMAIL,
  USER_IRC_NICK,
  BLANK_LOGIN,
  BLANK_PASSWORD
} = process.env;

test.describe("Login testing", () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    loginPage = new LoginPage(page);
    userPage = new UserPage(page);
    myAccountPage = new MyAccountPage(page);
  });

  test("Correct login with valid credentials", async ({ page }) => {
    await mainPage.openMainUrl();
    await expect(await mainPage.getLoginLink()).toBeVisible();
    await mainPage.clickLoginLink();
    await expect(page).toHaveURL(/\/login$/);
    await loginPage.displayLoginForm();
    await loginPage.fillLoginForm();
    await loginPage.clickLoginButton();
    await expect(page).toHaveURL(/\/$/);
    await expect(await mainPage.getLoggedAsUser()).toBeVisible();
    await mainPage.clickLoggedAsUser();
    await expect(page).toHaveURL(/users\//);
    // await expect(await userPage.getUserFirstLastName()).toContainText(
    //   "Elona Musk"
    // );
    await userPage.checkUserCredentials(USER_LOGIN, USER_EMAIL, USER_IRC_NICK);
    await expect(await userPage.getMyAccountLink()).toBeVisible();
    await userPage.clickMyAccountLink();
    await expect(page).toHaveURL(/my\/account$/);
    await myAccountPage.checkUserCredentials(
      USER_LOGIN,
      USER_FIRST_NAME,
      USER_LAST_NAME,
      USER_EMAIL,
      USER_IRC_NICK
    );
  });

  test("Login with empty required fields", async () => {
    await loginPage.openLoginUrl();
    await loginPage.clickLoginButton();
    await expect
      .soft(await loginPage.getLoginErrorMsg())
      .toContainText(BLANK_LOGIN);
    await expect
      .soft(await loginPage.getLoginErrorMsg())
      .toContainText(BLANK_PASSWORD);
    await loginPage.checkRedHighlightFields(["username", "password"]);
  });
});
