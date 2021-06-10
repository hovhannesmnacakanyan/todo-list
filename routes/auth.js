const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth/auth.service');
const { sequelize } = require('../models');

router.get('/login', (req, res) => login(req, res, sequelize.models));

router.post('/register', (req, res) => register(req, res, sequelize.models));

// router.post('/logout', logout);

module.exports = router;
