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
const registartionConfirmButton = "input[type='submit']";
const confirmationMsg = "#flash_notice";
const registartionErrorMsg = "#errorExplanation";

class RegistrationPage extends Page {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async openRegistrationUrl() {
    await super.openUrl("/account/register");
  }

  async getLoginField() {
    return await super.getElement(loginField);
  }

  async fillLoginField(username) {
    await super.fillElement(loginField, username);
  }

  async getPasswordField() {
    return await super.getElement(passwordField);
  }

  async fillPasswordField(password) {
    await super.fillElement(passwordField, password);
  }

  async getPasswordConfirmField() {
    return await super.getElement(passwordConfirmField);
  }

  async fillPasswordConfirmField(password) {
    await super.fillElement(passwordConfirmField, password);
  }

  async getFirstNameField() {
    return await super.getElement(firstNameField);
  }

  async fillFirstNameField(firstname) {
    await super.fillElement(firstNameField, firstname);
  }

  async getLastNameField() {
    return await super.getElement(lastNameField);
  }

  async fillLastNameField(lastname) {
    await super.fillElement(lastNameField, lastname);
  }

  async getEmailField() {
    return await super.getElement(emailField);
  }

  async fillEmailField(email) {
    await super.fillElement(emailField, email);
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

  async fillIRCnickField(ircnick) {
    await super.fillElement(IRCnickField, ircnick);
  }

  async getRegistartionConfirmButton() {
    return await super.getElement(registartionConfirmButton);
  }

  async clickRegistartionConfirmButton() {
    await super.clickElement(registartionConfirmButton);
  }

  async getConfirmationMsg() {
    return await super.getElement(confirmationMsg);
  }

  async getRegistartionErrorMsg() {
    return await super.getElement(registartionErrorMsg);
  }
}

module.exports = { RegistrationPage };