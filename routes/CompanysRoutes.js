const express = require('express');

const router = express.Router();

const { CompanyController } = require('../controllers');
const { CompanyValidator } = require('../validators');
const { verifyToken } = require('../middlewares');

router.post('/company',
  CompanyValidator.create,
  CompanyController.create);

router.post('/company',
  verifyToken,
  CompanyController.findSelf);

module.exports = router;
