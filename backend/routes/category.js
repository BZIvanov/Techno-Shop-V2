const router = require('express').Router();
const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategorySubcategories,
} = require('../controllers/category');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const {
  userTypes: { admin },
} = require('../constants');

router
  .route('/')
  .get(getAllCategories)
  .post(authenticate, authorize(admin), createCategory);
router
  .route('/:id')
  .get(getCategory)
  .put(authenticate, authorize(admin), updateCategory)
  .delete(authenticate, authorize(admin), deleteCategory);
router.route('/:id/subcategory').get(getCategorySubcategories);

module.exports = router;
