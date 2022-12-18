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
const validateRequestBody = require('../../middlewares/validate-request-body');
const {
  productCreateValidationSchema,
  productUpdateValidationSchema,
} = require('./product.validationSchema');

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(
    validateRequestBody(productCreateValidationSchema),
    authenticate,
    authorize(admin),
    createProduct
  );

router
  .route('/:id')
  .get(getProduct)
  .put(
    validateRequestBody(productUpdateValidationSchema),
    authenticate,
    authorize(admin),
    updateProduct
  )
  .delete(authenticate, authorize(admin), deleteProduct);

router.route('/:id/rate').put(authenticate, rateProduct);

router.route('/:id/similar').get(getSimilarProducts);

module.exports = router;
