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
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');
const {
  userTypes: { admin },
} = require('../user/user.constants');

const router = express.Router();

router
  .route('/')
  .get(getAllCategories)
  .post(authenticate, authorize(admin), createCategory);
router
  .route('/:id')
  .get(getCategory)
  .put(authenticate, authorize(admin), updateCategory)
  .delete(authenticate, authorize(admin), deleteCategory);
router.route('/:id/subcategories').get(getCategorySubcategories);
router.route('/:id/products').get(getCategoryProducts);

module.exports = router;
