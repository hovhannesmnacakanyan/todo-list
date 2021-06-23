const express = require('express');
const router = express.Router();
const userService = require('../services/users/users.service');
const { sequelize } = require('../models');

router.get('/', (req, res) =>
  userService.getAllUsers(req, res, sequelize.models),
);

router.get('/:id', (req, res) =>
  userService.getUserById(req, res, sequelize.models),
);

module.exports = router;
