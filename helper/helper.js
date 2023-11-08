const { faker } = require("@faker-js/faker");

class Helper {
  static generateRandomName() {
    return faker.internet.userName();
  }

  static generateRandomFirstName() {
    return faker.person.firstName();
  }

  static generateRandomLastName() {
    return faker.person.lastName();
  }

  static generateRandomEmail() {
    return faker.internet.email();
  }

  static generateRandomPassword() {
    return faker.internet.password();
  }
}

export default Helper;