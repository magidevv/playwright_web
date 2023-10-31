const { faker } = require("@faker-js/faker");

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

module.exports = {
  randomName,
  randomPassword,
  confirmPassword,
  randomFirstName,
  randomLastName,
  randomEmail,
  randomIRCnick,
  randomBadName,
  randomBadPassword,
  randomBadPasswordConfirm,
  randomBadFirstName,
  randomBadLastName,
  randomBadEmail,
  randomBadIRCnick,
};