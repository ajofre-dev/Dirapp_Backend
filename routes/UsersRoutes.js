const express = require('express');

const router = express.Router();

const { UsersController } = require('../controllers');
const { UserValidator } = require('../validators');
const { verifyToken } = require('../middlewares');

router.post('/register/users',
  UserValidator.create,
  UsersController.create);

router.get('company/users',
  verifyToken,
  UsersController.findOne);

module.exports = router;
