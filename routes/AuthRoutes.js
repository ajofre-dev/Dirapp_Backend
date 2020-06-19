const express = require('express');

const router = express.Router();

const { AuthCompanyValidator } = require('../validators');
const { AuthUserValidator } = require('../validators');
const { AuthCompanyController } = require('../controllers');
const { AuthUserController } = require('../controllers');

router.post('/register',
  AuthCompanyValidator.register,
  AuthCompanyController.register);

router.post('/register-user',
  AuthUserValidator.registerUser,
  AuthUserController.registerUser);

router.post('/login',
  AuthCompanyController.login,
  AuthCompanyValidator.login);

router.post('/login-user',
  AuthUserValidator.loginUser,
  AuthUserController.loginUser);

module.exports = router;
