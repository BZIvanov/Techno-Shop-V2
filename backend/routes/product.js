const router = require('express').Router();
const { createProduct } = require('../controllers/product');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const {
  userTypes: { admin },
} = require('../constants');

router.route('/').post(authenticate, authorize(admin), createProduct);

module.exports = router;
