const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser } = require('../controllers/users/user.service');
const { sequelize } = require('../models');

router.get('/', (req, res) => getAllUsers(req, res, sequelize.models));

router.get('/:id', (req, res) => getUserById(req, res, sequelize.models));

router.post('/', (req, res) => createUser(req, res, sequelize.models));

module.exports = router;
