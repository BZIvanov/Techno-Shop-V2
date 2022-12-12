const express = require('express');
const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryProducts,
} = require('./category.controllers');
const validateBodyData = require('../../middlewares/validate-body-data');
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');
const {
  userTypes: { admin },
} = require('../user/user.constants');
const {
  upsertCategoryValidationSchema,
} = require('./category.validationSchema');
const subcategoryRoutes = require('../subcategory/subcategory.routes');

const router = express.Router();

// /api/categories/:categoryId/subcategories => this will go to subcategories router where it will be just '/' with the same method
router.use('/:categoryId/subcategories', subcategoryRoutes);

router
  .route('/')
  .get(getAllCategories)
  .post(
    validateBodyData(upsertCategoryValidationSchema),
    authenticate,
    authorize(admin),
    createCategory
  );
router
  .route('/:id')
  .get(getCategory)
  .put(
    validateBodyData(upsertCategoryValidationSchema),
    authenticate,
    authorize(admin),
    updateCategory
  )
  .delete(authenticate, authorize(admin), deleteCategory);
router.route('/:id/products').get(getCategoryProducts);

module.exports = router;
