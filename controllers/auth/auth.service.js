const bcrypt = require('bcrypt');
const { createUser } = require('../users/user.service.js');
const {
  whitespaceValidator,
  emailValidator,
  passwordValidator,
} = require('../validation/validation.service');

const register = async (req, res, models) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    whitespaceValidator(firstName, 'First name');
    whitespaceValidator(lastName, 'Last name');
    whitespaceValidator(email, 'Email');
    whitespaceValidator(password, 'Password');
    emailValidator(email);
    passwordValidator(password);

    await createUser(req, res, models);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res, models) => {
  try {
    const { email, password } = req.body;
    const user = await models.users.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'Wrong email!!!' });
    }

    bcrypt.compare(password, user.password, (error, result) => {
      if (error) {
        return res.status(404).json({ error: error.message });
      }

      if (!result) {
        return res.status(404).json({ error: 'Wrong password!!!' });
      }

      return res.status(200).json({ user });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {};

module.exports = {
  register,
  login,
  logout,
};
