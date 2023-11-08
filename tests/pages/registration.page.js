const { expect } = require("@playwright/test");
const { Page } = require("./page");

const loginField = "#user_login";
const passwordField = "#user_password";
const passwordConfirmField = "#user_password_confirmation";
const firstNameField = "#user_firstname";
const lastNameField = "#user_lastname";
const emailField = "#user_mail";
const emailHideCheckbox = "#pref_hide_mail";
const languageSelect = "#user_language";
const IRCnickField = "#user_custom_field_values_3";
const registrationConfirmButton = "input[type='submit']";
const confirmationMsg = "#flash_notice";
const registrationErrorMsg = "#errorExplanation";

class RegistrationPage extends Page {
  constructor(page) {
    super(page);
    this.page = page;
  }

  static confirmation_msg =
    "Account was successfully created. An email containing the instructions to activate your account was sent";
  static invalidUsername_error = "Login is invalid";
  static invalidPassword_error =
    "Password is too short (minimum is 8 characters)";
  static invalidPasswordConfirm_error = "Password doesn't match confirmation";
  static invalidFirstName_error = "First name is invalid";
  static invalidLastName_error = "Last name is invalid";
  static invalidEmail_error = "Email is invalid";
  static invalidIRCnick_error = "ITC nick is invalid";
  static blankUsername_error = "Login cannot be blank";
  static blankPassword_error = "Password cannot be blank";
  static blankFirstName_error = "First name cannot be blank";
  static blankLastName_error = "Last name cannot be blank";
  static blankEmail_error = "Email cannot be blank";

  async openRegistrationUrl() {
    await super.openUrl("/account/register");
  }

  async getLoginField() {
    return await super.getElement(loginField);
  }

  async getPasswordField() {
    return await super.getElement(passwordField);
  }

  async getPasswordConfirmField() {
    return await super.getElement(passwordConfirmField);
  }

  async getFirstNameField() {
    return await super.getElement(firstNameField);
  }

  async getLastNameField() {
    return await super.getElement(lastNameField);
  }

  async getEmailField() {
    return await super.getElement(emailField);
  }

  async getEmailHideCheckbox() {
    return await super.getElement(emailHideCheckbox);
  }

  async getLanguageSelect() {
    return await super.getElement(languageSelect);
  }

  async getIRCnickField() {
    return await super.getElement(IRCnickField);
  }

  async getRegistrationConfirmButton() {
    return await super.getElement(registrationConfirmButton);
  }

  async displayRegistrationForm() {
    await expect(await this.getLoginField()).toBeVisible();
    await expect(await this.getPasswordField()).toBeVisible();
    await expect(await this.getPasswordConfirmField()).toBeVisible();
    await expect(await this.getFirstNameField()).toBeVisible();
    await expect(await this.getLastNameField()).toBeVisible();
    await expect(await this.getEmailField()).toBeVisible();
    await expect(await this.getEmailHideCheckbox()).toBeVisible();
    await expect(await this.getLanguageSelect()).toBeVisible();
    await expect(await this.getIRCnickField()).toBeVisible();
    await expect(await this.getRegistrationConfirmButton()).toBeVisible();
  }

  async fillRegistrationForm(
    username,
    password,
    confirmPassword,
    firstname,
    lastname,
    email,
    ircnick
  ) {
    await super.fillElement(loginField, username);
    await super.fillElement(passwordField, password);
    await super.fillElement(passwordConfirmField, confirmPassword);
    await super.fillElement(firstNameField, firstname);
    await super.fillElement(lastNameField, lastname);
    await super.fillElement(emailField, email);
    await super.fillElement(IRCnickField, ircnick);
  }

  async clickRegistrationConfirmButton() {
    await super.clickElement(registrationConfirmButton);
  }

  async getConfirmationMsg() {
    return await super.getElement(confirmationMsg);
  }

  async getRegistrationErrorMsg() {
    return await super.getElement(registrationErrorMsg);
  }

  async checkTextInList(list) {
    for (let i = 0; i < list.length; i++) {
      const selector = `#errorExplanation li:nth-child(${i + 1})`;
      const listItem = await super.getElement(selector);
      await expect(listItem).toHaveText(list[i]);
    }
  }

  async checkRedHighlightFields(fields) {
    for (const field of fields) {
      const selector = `label[for="user_${field}"]`;
      const errorLabel = await super.getElement(selector);
      await expect.soft(errorLabel).toHaveCSS("color", "rgb(187, 0, 0)");
    }
  }
}

export default RegistrationPage;
