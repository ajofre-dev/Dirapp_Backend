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
  AuthUserValidator.registeruser,
  AuthUserController.registeruser);

router.post('/login',
  AuthCompanyController.login,
  AuthCompanyValidator.login);

router.post('/login-user',
  AuthUserValidator.loginuser,
  AuthUserController.loginuser);

module.exports = router;
