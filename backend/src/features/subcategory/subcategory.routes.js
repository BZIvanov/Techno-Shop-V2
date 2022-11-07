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

const router = express.Router();

router
  .route('/')
  .get(getSubcategories)
  .post(authenticate, authorize(admin), createSubcategory);
router
  .route('/:id')
  .get(getSubcategory)
  .put(authenticate, authorize(admin), updateSubcategory)
  .delete(authenticate, authorize(admin), deleteSubcategory);

router.route('/:id/products').get(getSubcategoryProducts);

module.exports = router;
