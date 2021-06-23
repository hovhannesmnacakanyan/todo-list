const bcrypt = require('bcrypt');
const Users = require('../users/users.service.js');

class Auth {
  constructor(models) {
    this.models = models;
  }

  async register(firstName, lastName, email, password) {
    const usersService = new Users(this.models);
    try {
      return await usersService.createUser(
        firstName,
        lastName,
        email,
        password,
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(email, password) {
    try {
      const user = await this.models.users.findOne({
        where: { email },
      });

      if (!user) {
        throw new Error('Wrong email!!!');
      }

      const isRightPassword = await bcrypt.compare(password, user.password);

      if (!isRightPassword) {
        throw new Error('Wrong password!!!');
      }

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async logout() {}
}

module.exports = Auth;
