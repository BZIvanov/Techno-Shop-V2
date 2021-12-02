const router = require('express').Router();
const {
  getProducts,
  createProduct,
  deleteProduct,
} = require('../controllers/product');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const {
  userTypes: { admin },
} = require('../constants');

router
  .route('/')
  .get(getProducts)
  .post(authenticate, authorize(admin), createProduct);

router.route('/:id').delete(authenticate, authorize(admin), deleteProduct);

module.exports = router;
