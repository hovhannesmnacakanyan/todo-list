const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authorization');
const { sequelize } = require('../models');

router.get('/login', (req, res) => login(req, res, sequelize.models));

// router.get('/register', register);

// router.post('/logout', logout);

module.exports = router;
