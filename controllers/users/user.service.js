const bcrypt = require('bcrypt');
const salt = 10;

const getAllUsers = async (req, res, models) => {
  try {
    const allUsers = await models.users.findAll();

    if (!allUsers) {
      return res.status(404).json({ error: `Users does not exists` });
    }

    return res.status(200).json({ users: allUsers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res, models) => {
  try {
    const { id } = req.params;
    const user = await models.users.findByPk(id);

    if (!user) {
      return res
        .status(404)
        .json({ error: `User with the specified ID: ${id} does not exists` });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res, models) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userByEmail = await models.users.findOne({
      where: { email },
    });

    if (userByEmail) {
      return res
        .status(404)
        .json({ error: `User with this email: "${email}" already exists` });
    }

    bcrypt.hash(password, salt, async (error, hashPassword) => {
      if (error) {
        return res.status(404).json({ error: error.message });
      }

      const user = await models.users.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
      });

      return res.status(200).json({ user });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
