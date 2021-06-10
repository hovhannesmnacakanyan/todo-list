const bcrypt = require('bcrypt');

const register = async (req, res) => {};

const login = async (req, res, models) => {
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
};

const logout = async (req, res) => {};

module.exports = {
  register,
  login,
  logout,
};
