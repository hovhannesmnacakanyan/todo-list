const bcrypt = require('bcrypt');
const salt = 10;

class Users {
  constructor(models) {
    this.models = models;
  }
  async getAllUsers(req, res) {
    try {
      const allUsers = await this.models.users.findAll();

      if (!allUsers) {
        return res.status(404).json({ error: `Users does not exists` });
      }

      return res.status(200).json({ users: allUsers });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await this.models.users.findByPk(id);

      if (!user) {
        return res
          .status(404)
          .json({ error: `User with the specified ID: ${id} does not exists` });
      }

      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async createUser(firstName, lastName, email, password) {
    try {
      const userByEmail = await this.models.users.findOne({
        where: { email },
      });

      if (userByEmail) {
        throw new Error(`User with this email: "${email}" already exists`);
      }

      bcrypt.hash(password, salt, async (error, hashPassword) => {
        if (error) {
          throw new Error(error.message);
        }

        const user = await this.models.users.create({
          firstName,
          lastName,
          email,
          password: hashPassword,
        });

        return user;
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = Users;
