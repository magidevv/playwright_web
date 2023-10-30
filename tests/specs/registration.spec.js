const { test, expect } = require("@playwright/test");
const { faker } = require("@faker-js/faker");
const { MainPage } = require("../pages/main.page");
const { RegistrationPage } = require("../pages/registration.page");

let mainPage;
let registrationPage;

const randomName = faker.internet.userName();
const randomPassword = faker.internet.password();
const confirmPassword = randomPassword;
const randomFirstName = faker.person.firstName();
const randomLastName = faker.person.lastName();
const randomEmail = faker.internet.email();
const randomIRCnick = faker.internet.userName();

const randomBadName = faker.string.numeric(5);
const randomBadPassword = faker.string.numeric(5);
const randomBadPasswordConfirm = faker.string.numeric(4);
const randomBadFirstName = faker.string.numeric(5);
const randomBadLastName = faker.string.numeric(5);
const randomBadEmail = faker.internet.userName();
const randomBadIRCnick = faker.string.numeric(5);

const {
  CONFIRM_MSG,
  INVALID_LOGIN,
  INVALID_PASSWORD,
  INVALID_PASSWORD_CONFIRM,
  INVALID_FIRSTNAME,
  INVALID_LASTNAME,
  INVALID_EMAIL,
  INVALID_IRCNICK,
  BLANK_LOGIN,
  BLANK_PASSWORD,
  BLANK_FIRSTNAME,
  BLANK_LASTNAME,
  BLANK_EMAIL
} = process.env;

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
      randomName,
      randomPassword,
      confirmPassword,
      randomFirstName,
      randomLastName,
      randomEmail,
      randomIRCnick
    );
    await registrationPage.clickRegistrationConfirmButton();
    await expect(await registrationPage.getConfirmationMsg()).toContainText(
      CONFIRM_MSG
    );
  });

  test("New account registration with incorrect user data format", async () => {
    await registrationPage.openRegistrationUrl();
    await registrationPage.fillRegistrationForm(
      randomBadName,
      randomBadPassword,
      randomBadPasswordConfirm,
      randomBadFirstName,
      randomBadLastName,
      randomBadEmail,
      randomBadIRCnick
    );
    await registrationPage.clickRegistrationConfirmButton();
    await expect
      .soft(await registrationPage.getRegistrationErrorMsg())
      .toContainText(INVALID_LOGIN);
    await expect(
      await registrationPage.getRegistrationErrorMsg()
    ).toContainText(INVALID_PASSWORD);
    await expect(
      await registrationPage.getRegistrationErrorMsg()
    ).toContainText(INVALID_PASSWORD_CONFIRM);
    await expect
      .soft(await registrationPage.getRegistrationErrorMsg())
      .toContainText(INVALID_FIRSTNAME);
    await expect
      .soft(await registrationPage.getRegistrationErrorMsg())
      .toContainText(INVALID_LASTNAME);
    await expect(
      await registrationPage.getRegistrationErrorMsg()
    ).toContainText(INVALID_EMAIL);
    await expect
      .soft(await registrationPage.getRegistrationErrorMsg())
      .toContainText(INVALID_IRCNICK);
    await registrationPage.checkRedHighlightFields([
      "login",
      "password",
      "password_confirmation",
      "firstname",
      "lastname",
      "mail",
    ]);
  });

  test("New account registration with empty required fields", async () => {
    await registrationPage.openRegistrationUrl();
    await registrationPage.clickRegistrationConfirmButton();
    await registrationPage.checkTextInList([
      BLANK_EMAIL,
      BLANK_LOGIN,
      BLANK_FIRSTNAME,
      BLANK_LASTNAME,
      BLANK_PASSWORD,
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
