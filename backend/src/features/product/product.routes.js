const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  rateProduct,
  getSimilarProducts,
} = require('./product.controllers');
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');
const {
  userTypes: { admin },
} = require('../user/user.constants');
const validateBodyData = require('../../middlewares/validate-body-data');
const { productValidationSchema } = require('./product.validationSchema');

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(
    validateBodyData(productValidationSchema),
    authenticate,
    authorize(admin),
    createProduct
  );

router
  .route('/:id')
  .get(getProduct)
  .put(authenticate, authorize(admin), updateProduct)
  .delete(authenticate, authorize(admin), deleteProduct);

router.route('/:id/rate').put(authenticate, rateProduct);

router.route('/:id/similar').get(getSimilarProducts);

module.exports = router;
