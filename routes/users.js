const express = require('express');
const router = express.Router();

const models = require('../models');

router.get('/', async (req, res) => {
  const users = await models.Users.findAll();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  console.log(await models.Users.findOne());
  return res.json({});
  try {
    const { id } = req.params;
    const user = await models.Users.findByPk(id);
    if (!user) throw Error('User not found');
    res.json(user);
  } catch (e) {
    console.log(e);
    res.send(e.message);
  }
});

module.exports = router;
