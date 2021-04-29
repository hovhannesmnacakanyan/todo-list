const { User } = require('../models');

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id: id },
    });

    if (!user) {
      return res.status(404).send('User with the specified ID does not exists');
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUserById,
};
