const Auth = require('../services/auth/auth.service');
const Validation = require('../services/validation/validation.service');
const validationService = new Validation();

class AuthController {
  constructor(data, models) {
    this.data = data;
    this.models = models;
  }

  async login() {
    const authService = new Auth(this.models);
    const { email, password } = this.data.body;

    return await authService.login(email, password);
  }

  async register() {
    const authService = new Auth(this.models);
    const { firstName, lastName, email, password } = this.data.body;
    validationService.whitespaceValidator(firstName, 'First name');
    validationService.whitespaceValidator(lastName, 'Last name');
    validationService.emailValidator(email);
    validationService.passwordValidator(password);

    return await authService.register(firstName, lastName, email, password);
  }
}

module.exports = AuthController;
