const bcrypt = require('bcrypt');
const salt = 10;

const { users } = require('../../models');

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.findAll();

    if (!allUsers) {
      return res.status(404).json({ error: `Users does not exists` });
    }

    return res.status(200).json({ users: allUsers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await users.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: `User with the specified ID: ${id} does not exists` });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const isUniqueEmail = await users.findAll({
      where: { email },
    });

    if (isUniqueEmail.length) {
      return res.status(404).json({ error: `User with this email: "${email}" already exists` });
    }

    bcrypt.hash(password, salt, async (error, hashPassword) => {
      if (error) {
        return res.status(404).json({ error: error.message });
      }

      const user = await users.create({ firstName, lastName, email, password: hashPassword });

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
