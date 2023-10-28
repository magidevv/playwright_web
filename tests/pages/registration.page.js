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
const registartionConfirmButton = "input[value='Принять']";
const confirmationMsg = "#flash_notice";
const registartionErrorMsg = "#flash_error";

class RegistrationPage extends Page {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async openRegistrationUrl() {
    await super.openUrl("/account/register");
  }

  async getLoginField() {
    await super.getElement(loginField);
  }

  async fillLoginField(username) {
    await super.fillElement(loginField, username);
  }

  async getPasswordField() {
    await super.getElement(passwordField);
  }

  async fillPasswordField(password) {
    await super.fillElement(passwordField, password);
  }

  async getPasswordConfirmField() {
    await super.getElement(passwordConfirmField);
  }

  async fillPasswordConfirmField(password) {
    await super.fillElement(passwordConfirmField, password);
  }

  async getFirstNameField() {
    await super.getElement(firstNameField);
  }

  async fillFirstNameField(firstname) {
    await super.fillElement(firstNameField, firstname);
  }

  async getLastNameField() {
    await super.getElement(lastNameField);
  }

  async fillLastNameField(lastname) {
    await super.fillElement(lastNameField, lastname);
  }

  async getEmailField() {
    await super.getElement(emailField);
  }

  async fillEmailField(email) {
    await super.fillElement(emailField, email);
  }

  async getEmailHideCheckbox() {
    await super.getElement(emailHideCheckbox);
  }

  async getLanguageSelect() {
    await super.getElement(languageSelect);
  }

  async getIRCnickField() {
    await super.getElement(IRCnickField);
  }

  async fillIRCnickField(ircnick) {
    await super.fillElement(IRCnickField, ircnick);
  }

  async getRegistartionConfirmButton() {
    await super.getElement(registartionConfirmButton);
  }

  async clickRegistartionConfirmButton() {
    await super.clickElement(registartionConfirmButton);
  }

  async getConfirmationMsg() {
    await super.getElement(confirmationMsg);
  }

  async getRegistartionErrorMsg() {
    await super.getElement(registartionErrorMsg);
  }
}

module.exports = { RegistrationPage };