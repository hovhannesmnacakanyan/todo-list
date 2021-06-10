const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth/auth.service');
const { sequelize } = require('../models');

router.get('/login', async (req, res) => {
  try {
    await login(req, res, sequelize.models);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    await register(req, res, sequelize.models);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// router.post('/logout', logout);

module.exports = router;
