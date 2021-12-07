const router = require('express').Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
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

router
  .route('/:id')
  .get(getProduct)
  .put(authenticate, authorize(admin), updateProduct)
  .delete(authenticate, authorize(admin), deleteProduct);

module.exports = router;
