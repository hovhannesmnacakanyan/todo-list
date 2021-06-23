const bcrypt = require('bcrypt');

class Users {
  constructor(models) {
    this.models = models;
  }

  async getAllUsers() {
    try {
      const users = await this.models.users.findAll();

      if (!users.length) {
        throw new Error(`Users does not exists`);
      }

      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserById(id) {
    try {
      const user = await this.models.users.findByPk(id);

      if (!user) {
        throw new Error(`User with the specified ID: ${id} does not exists`);
      }

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createUser(firstName, lastName, email, password) {
    const salt = 10;
    try {
      const userByEmail = await this.models.users.findOne({
        where: { email },
      });

      if (userByEmail) {
        throw new Error(`User with this email: "${email}" already exists`);
      }

      const hashPassword = await bcrypt.hash(password, salt);

      const user = await this.models.users.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
      });

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = Users;
