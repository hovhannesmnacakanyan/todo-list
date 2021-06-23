const bcrypt = require('bcrypt');
const Users = require('../users/users.service.js');
const Validation = require('../validation/validation.service');

class Auth {
  constructor(models) {
    this.models = models;
  }

  async register(req, res) {
    const validationService = new Validation();
    const usersService = new Users(this.models);
    try {
      const { firstName, lastName, email, password } = req.body;

      validationService.whitespaceValidator(firstName, 'First name');
      validationService.whitespaceValidator(lastName, 'Last name');
      validationService.whitespaceValidator(email, 'Email');
      validationService.whitespaceValidator(password, 'Password');
      validationService.emailValidator(email);
      validationService.passwordValidator(password);

      return await usersService.createUser(
        firstName,
        lastName,
        email,
        password,
      );
    } catch (error) {
      return res.status(500).json({ error: error.message });
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
