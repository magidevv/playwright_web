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
    await expect(await registrationPage.getLoginField()).toBeVisible();
    await registrationPage.fillLoginField(randomName);
    await expect(await registrationPage.getPasswordField()).toBeVisible();
    await registrationPage.fillPasswordField(randomPassword);
    await expect(
      await registrationPage.getPasswordConfirmField()
    ).toBeVisible();
    await registrationPage.fillPasswordConfirmField(confirmPassword);
    await expect(await registrationPage.getFirstNameField()).toBeVisible();
    await registrationPage.fillFirstNameField(randomFirstName);
    await expect(await registrationPage.getLastNameField()).toBeVisible();
    await registrationPage.fillLastNameField(randomLastName);
    await expect(await registrationPage.getEmailField()).toBeVisible();
    await registrationPage.fillEmailField(randomEmail);
    await expect(await registrationPage.getEmailHideCheckbox()).toBeVisible();
    await expect(await registrationPage.getLanguageSelect()).toBeVisible();
    await expect(await registrationPage.getIRCnickField()).toBeVisible();
    await registrationPage.fillIRCnickField(randomIRCnick);
    await expect(
      await registrationPage.getRegistartionConfirmButton()
    ).toBeVisible();
    await registrationPage.clickRegistartionConfirmButton();
    await expect(await registrationPage.getConfirmationMsg()).toHaveText(
      /^Account was successfully created. An email containing the instructions to activate your account was sent/
    );
  });

  test("New account registration with incorrect user data format", async () => {
    await registrationPage.openRegistrationUrl();
    await registrationPage.fillLoginField(randomBadName);
    await registrationPage.fillPasswordField(randomBadPassword);
    await registrationPage.fillPasswordConfirmField(randomBadPasswordConfirm);
    await registrationPage.fillFirstNameField(randomBadFirstName);
    await registrationPage.fillLastNameField(randomBadLastName);
    await registrationPage.fillEmailField(randomBadEmail);
    await registrationPage.fillIRCnickField(randomBadIRCnick);
    await registrationPage.clickRegistartionConfirmButton();
    await expect.soft(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      /Login is invalid/
    );
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      /Password is too short \(minimum is 8 characters\)/
    );
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      /Password doesn't match confirmation/
    );
    await expect.soft(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      /First name is invalid/
    );
    await expect.soft(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      /Last name is invalid/
    );
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      /Email is invalid/
    );
    await expect.soft(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      /IRC nick is invalid/
    );
  });

  test("New account registration with empty required fields", async () => {
    await registrationPage.openRegistrationUrl();
    await registrationPage.clickRegistartionConfirmButton();
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      /Login cannot be blank/
    );
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      /Password is too short \(minimum is 8 characters\)/
    );
    await expect.soft(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      /Password confirmation cannot be blank/
    );
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      /First name cannot be blank/
    );
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      /Last name cannot be blank/
    );
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      /Email cannot be blank/
    );
  });
});
