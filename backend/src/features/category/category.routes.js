const express = require('express');
const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategorySubcategories,
  getCategoryProducts,
} = require('./category.controllers');
const validateBodyData = require('../../middlewares/validate-body-data');
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');
const {
  userTypes: { admin },
} = require('../user/user.constants');
const {
  createCategoryValidationSchema,
} = require('./category.validationSchema');

const router = express.Router();

router
  .route('/')
  .get(getAllCategories)
  .post(
    validateBodyData(createCategoryValidationSchema),
    authenticate,
    authorize(admin),
    createCategory
  );
router
  .route('/:id')
  .get(getCategory)
  .put(authenticate, authorize(admin), updateCategory)
  .delete(authenticate, authorize(admin), deleteCategory);
router.route('/:id/subcategories').get(getCategorySubcategories);
router.route('/:id/products').get(getCategoryProducts);

module.exports = router;
