const { test, expect } = require("@playwright/test");
const { MainPage } = require("../pages/main.page");
const { RegistrationPage } = require("../pages/registration.page");
const testData = require("../../data/test-data.js");
const systemMessages = require("../../data/system-messages.json");

let mainPage;
let registrationPage;

test.describe("Registration testing", () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    registrationPage = new RegistrationPage(page);
  });

  test("New account registration with valid credentials", async ({ page }) => {
    await mainPage.openMainUrl();
    await expect(await mainPage.getRegistrationLink()).toBeVisible();
    await mainPage.clickRegistrationLink();
    await expect(page).toHaveURL(/account\/register$/);
    await registrationPage.displayRegistrationForm();
    await registrationPage.fillRegistrationForm(
      testData.randomName,
      testData.randomPassword,
      testData.confirmPassword,
      testData.randomFirstName,
      testData.randomLastName,
      testData.randomEmail,
      testData.randomIRCnick
    );
    await registrationPage.clickRegistrationConfirmButton();
    await expect(await registrationPage.getConfirmationMsg()).toContainText(
      systemMessages["confirm-msg"]
    );
  });

  test("New account registration with incorrect user data format", async () => {
    await registrationPage.openRegistrationUrl();
    await registrationPage.fillRegistrationForm(
      testData.randomBadName,
      testData.randomBadPassword,
      testData.randomBadPasswordConfirm,
      testData.randomBadFirstName,
      testData.randomBadLastName,
      testData.randomBadEmail,
      testData.randomBadIRCnick
    );
    await registrationPage.clickRegistrationConfirmButton();
    await expect
      .soft(await registrationPage.getRegistrationErrorMsg())
      .toContainText(systemMessages["invalid-login"]);
    await expect(
      await registrationPage.getRegistrationErrorMsg()
    ).toContainText(systemMessages["invalid-password"]);
    await expect(
      await registrationPage.getRegistrationErrorMsg()
    ).toContainText(systemMessages["invalid-password-confirm"]);
    await expect
      .soft(await registrationPage.getRegistrationErrorMsg())
      .toContainText(systemMessages["invalid-firstname"]);
    await expect
      .soft(await registrationPage.getRegistrationErrorMsg())
      .toContainText(systemMessages["invalid-lastname"]);
    await expect(
      await registrationPage.getRegistrationErrorMsg()
    ).toContainText(systemMessages["invalid-email"]);
    await expect
      .soft(await registrationPage.getRegistrationErrorMsg())
      .toContainText(systemMessages["invalid-ircnick"]);
    await registrationPage.checkRedHighlightFields([
      "login",
      "password",
      "password_confirmation",
      "firstname",
      "lastname",
      "mail"
    ]);
  });

  test("New account registration with empty required fields", async () => {
    await registrationPage.openRegistrationUrl();
    await registrationPage.clickRegistrationConfirmButton();
    await registrationPage.checkTextInList([
      systemMessages["blank-email"],
      systemMessages["blank-login"],
      systemMessages["blank-firstname"],
      systemMessages["blank-lastname"],
      systemMessages["blank-password"]
    ]);
    await registrationPage.checkRedHighlightFields([
      "login",
      "password",
      "password_confirmation",
      "firstname",
      "lastname",
      "mail"
    ]);
  });
});
