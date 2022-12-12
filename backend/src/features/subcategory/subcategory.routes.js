const express = require('express');
const {
  getSubcategories,
  getSubcategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getSubcategoryProducts,
} = require('./subcategory.controllers');
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');
const {
  userTypes: { admin },
} = require('../user/user.constants');
const validateBodyData = require('../../middlewares/validate-body-data');
const {
  upsertSubcategoryValidationSchema,
} = require('./subcategory.validationSchema');

// set mergeParams to true to receive the params from the category router
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getSubcategories)
  .post(
    validateBodyData(upsertSubcategoryValidationSchema),
    authenticate,
    authorize(admin),
    createSubcategory
  );
router
  .route('/:id')
  .get(getSubcategory)
  .put(
    validateBodyData(upsertSubcategoryValidationSchema),
    authenticate,
    authorize(admin),
    updateSubcategory
  )
  .delete(authenticate, authorize(admin), deleteSubcategory);
router.route('/:id/products').get(getSubcategoryProducts);

module.exports = router;
