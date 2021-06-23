const Auth = require('../services/auth/auth.service');

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
}

module.exports = AuthController;
