const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const { sequelize } = require('../models');

router.get('/login', async (req, res) => {
  const authController = new AuthController(req, sequelize.models);
  try {
    const user = await authController.login();
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    return await authService.register(req, res);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// router.post('/logout', logout);

module.exports = router;
