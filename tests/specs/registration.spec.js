const { test, expect } = require("@playwright/test");
import MainPage from "../pages/main.page";
import RegistrationPage from "../pages/registration.page";
import Helper from "../../helper/helper";
const invalidData = require("../../data/invalid-data.json");

const validRandomUsername = Helper.generateRandomName();
const validRandomPassword = Helper.generateRandomPassword();
const validRandomFirstName = Helper.generateRandomFirstName();
const validRandomLastName = Helper.generateRandomLastName();
const validRandomEmail = Helper.generateRandomEmail();
const validRandomIRCnick = Helper.generateRandomName();

test.describe("Registration testing", () => {
  test("New account registration with valid credentials", async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainUrl();
    await expect(await mainPage.getRegistrationLink()).toBeVisible();
    await mainPage.clickRegistrationLink();
    await expect(page).toHaveURL(/account\/register$/);
    const registrationPage = new RegistrationPage(page);
    await registrationPage.displayRegistrationForm();
    await registrationPage.fillRegistrationForm(
      validRandomUsername,
      validRandomPassword,
      validRandomPassword,
      validRandomFirstName,
      validRandomLastName,
      validRandomEmail,
      validRandomIRCnick
    );
    await registrationPage.clickRegistrationConfirmButton();
    await expect(await registrationPage.getConfirmationMsg()).toContainText(
      RegistrationPage.confirmation_msg
    );
  });

  test("New account registration with incorrect user data format", async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.openRegistrationUrl();
    await registrationPage.fillRegistrationForm(
      invalidData["username-with-special-chars"],
      invalidData["short-password"],
      invalidData["numeric-password"],
      invalidData["first-name-with-special-chars"],
      invalidData["last-name-with-special-chars"],
      invalidData["email-without-domain"],
      invalidData["numeric-username"]
    );
    await registrationPage.clickRegistrationConfirmButton();
    await expect
      .soft(await registrationPage.getRegistrationErrorMsg())
      .toContainText(RegistrationPage.invalidUsername_error);
    await expect(
      await registrationPage.getRegistrationErrorMsg()
    ).toContainText(RegistrationPage.invalidPassword_error);
    await expect(
      await registrationPage.getRegistrationErrorMsg()
    ).toContainText(RegistrationPage.invalidPasswordConfirm_error);
    await expect
      .soft(await registrationPage.getRegistrationErrorMsg())
      .toContainText(RegistrationPage.invalidFirstName_error);
    await expect
      .soft(await registrationPage.getRegistrationErrorMsg())
      .toContainText(RegistrationPage.invalidLastName_error);
    await expect(
      await registrationPage.getRegistrationErrorMsg()
    ).toContainText(RegistrationPage.invalidEmail_error);
    await expect
      .soft(await registrationPage.getRegistrationErrorMsg())
      .toContainText(RegistrationPage.invalidIRCnick_error);
    await registrationPage.checkRedHighlightFields([
      "login",
      "password",
      "password_confirmation",
      "firstname",
      "lastname",
      "mail",
    ]);
  });

  test("New account registration with empty required fields", async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.openRegistrationUrl();
    await registrationPage.clickRegistrationConfirmButton();
    await registrationPage.checkTextInList([
      RegistrationPage.blankEmail_error,
      RegistrationPage.blankUsername_error,
      RegistrationPage.blankFirstName_error,
      RegistrationPage.blankLastName_error,
      RegistrationPage.blankPassword_error,
    ]);
    await registrationPage.checkRedHighlightFields([
      "login",
      "password",
      "password_confirmation",
      "firstname",
      "lastname",
      "mail",
    ]);
  });
});
