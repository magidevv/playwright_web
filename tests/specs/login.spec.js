const { test, expect } = require("@playwright/test");
import MainPage from "../pages/main.page";
import LoginPage from "../pages/login.page";
import UserPage from "../pages/user.page";
import MyAccountPage from "../pages/my.account.page";

const validUsername = process.env.USER_LOGIN;
const validPassword = process.env.USER_PASSWORD;
const validFirstName = process.env.USER_FIRST_NAME;
const validLastName = process.env.USER_LAST_NAME;
const validEmail = process.env.USER_EMAIL;
const validIRCnick = process.env.USER_IRC_NICK;

test.describe("Login testing", () => {
  test("Correct login with valid credentials", async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainUrl();
    await expect(await mainPage.getLoginLink()).toBeVisible();
    await mainPage.clickLoginLink();
    await expect(page).toHaveURL(/\/login$/);
    const loginPage = new LoginPage(page);
    await loginPage.displayLoginForm();
    await loginPage.fillLoginForm(validUsername, validPassword);
    await loginPage.clickLoginButton();
    await expect(page).toHaveURL(/\/$/);
    await expect(await mainPage.getLoggedAsUser()).toBeVisible();
    await mainPage.clickLoggedAsUser();
    await expect(page).toHaveURL(/users\//);
    // await expect(await userPage.getUserFirstLastName()).toContainText(
    //   "Elona Musk"
    // );
    const userPage = new UserPage(page);
    await userPage.checkUserCredentials(
      validUsername,
      validEmail,
      validIRCnick
    );
    await expect(await userPage.getMyAccountLink()).toBeVisible();
    await userPage.clickMyAccountLink();
    await expect(page).toHaveURL(/my\/account$/);
    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.checkUserCredentials(
      validUsername,
      validFirstName,
      validLastName,
      validEmail,
      validIRCnick
    );
  });

  test("Login with empty required fields", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginUrl();
    await loginPage.clickLoginButton();
    await expect
      .soft(await loginPage.getLoginErrorMsg())
      .toContainText(LoginPage.blankUsername_error);
    await expect
      .soft(await loginPage.getLoginErrorMsg())
      .toContainText(LoginPage.blankPassword_error);
    await loginPage.checkRedHighlightFields(["username", "password"]);
  });
});
