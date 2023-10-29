const { test, expect } = require("@playwright/test");
const { MainPage } = require("../pages/main.page");
const { LoginPage } = require("../pages/login.page");
const { UserPage } = require("../pages/user.page");
const { MyAccountPage } = require("../pages/my.account.page");

let mainPage;
let loginPage;
let userPage;
let myAccountPage;

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
    await expect(await loginPage.getLoginField()).toBeVisible();
    await loginPage.fillLoginField("elona_musk");
    await expect(await loginPage.getPasswordField()).toBeVisible();
    await loginPage.fillPasswordField("12344321q");
    await expect(await loginPage.getLoginButton()).toBeVisible();
    await loginPage.clickLoginButton();
    await expect(page).toHaveURL(/\/$/);
    await expect(await mainPage.getLoggedAsUser()).toBeVisible();
    await mainPage.clickLoggedAsUser();
    await expect(page).toHaveURL(/users\//);
    // await expect(await userPage.getUserFirstLastName()).toHaveText(
    //   /Elona Musk$/
    // );
    await expect(await userPage.getUserName()).toHaveText(/elona_musk$/);
    await expect(await userPage.getUserEmail()).toHaveText(
      /jf5gophgii@zipcatfish.com$/
    );
    await expect(await userPage.getUserIRCnick()).toHaveText(/elonamusk$/);
    await expect(await userPage.getMyAccountLink()).toBeVisible();
    await userPage.clickMyAccountLink();
    await expect(page).toHaveURL(/my\/account$/);
    await expect(await myAccountPage.getUserName()).toHaveText("elona_musk");
    await expect(await myAccountPage.getUserFirstName()).toHaveValue("Elona");
    await expect(await myAccountPage.getUserLastName()).toHaveValue("Musk");
    await expect(await myAccountPage.getUserEmail()).toHaveValue(
      "jf5gophgii@zipcatfish.com"
    );
    await expect(await myAccountPage.getUserIRCnick()).toHaveValue("elonamusk");
  });

  test("Login with empty required fields", async ({ page }) => {
    await loginPage.openLoginUrl();
    await loginPage.clickLoginButton();
    await expect.soft(await loginPage.getLoginErrorMsg()).toHaveText(
      /Login cannot be blank/
    );
    await expect.soft(await loginPage.getLoginErrorMsg()).toHaveText(
      /Password is too short \(minimum is 8 characters\)/
    );
  });
});
