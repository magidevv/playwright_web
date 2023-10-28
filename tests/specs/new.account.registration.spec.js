const { test, expect } = require("@playwright/test");
const { faker } = require("@faker-js/faker");
const { MainPage } = require("../pages/main.page");
const { RegistrationPage } = require("../pages/registration.page");

let mainPage;
let registrationPage;

const randomName = faker.internet.userName();
const randomPassword = faker.internet.password();
const randomFirstName = faker.person.firstName();
const randomLastName = faker.person.lastName();
const randomEmail = faker.internet.email();
const randomIRCnick = faker.internet.userName();

test.describe("Registration testing", () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    registrationPage = new RegistrationPage(page);
  });

  test("New account registration with valid credentials", async () => {
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
    await registrationPage.fillPasswordConfirmField(randomPassword);
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
      "Учётная запись успешно создана. Для активации Вашей учётной записи пройдите по ссылке, которая выслана Вам по электронной почте."
    );
  });

  test("New account registration with incorrect user data format", async () => {
    await registrationPage.openRegistrationUrl();
    //await registrationPage.fillLoginField(username);
    //await registrationPage.fillPasswordField(password);
    //await registrationPage.fillPasswordConfirmField(password);
    //await registrationPage.fillFirstNameField(firstname);
    //await registrationPage.fillLastNameField(lastname);
    //await registrationPage.fillEmailField(email);
    //await registrationPage.fillIRCnickField(ircnick);
    await registrationPage.clickRegistartionConfirmButton();
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      "Пользователь имеет неверное значение"
    );
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      "Пароль имеет неверное значение"
    );
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      "Пароль не совпадает с подтверждением"
    );
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      "Имя имеет неверное значение"
    );
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      "Фамилия имеет неверное значение"
    );
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      "Email имеет неверное значение"
    );
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      "IRC nick имеет неверное значение"
    );
  });

  test("New account registration with empty required fields", async () => {
    await registrationPage.openRegistrationUrl();
    await registrationPage.clickRegistartionConfirmButton();
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      "Пользователь не может быть пустым"
    );
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      "Пароль недостаточной длины (не может быть меньше 8 символа)"
    );
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      "Подтверждение не может быть пустым"
    );
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      "Имя не может быть пустым"
    );
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      "Фамилия не может быть пустым"
    );
    await expect(await registrationPage.getRegistartionErrorMsg()).toHaveText(
      "Email не может быть пустым"
    );
  });
});
