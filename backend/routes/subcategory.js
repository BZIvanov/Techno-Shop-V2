const router = require('express').Router();
const {
  getSubcategories,
  getSubcategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getSubcategoryProducts,
} = require('../controllers/subcategory');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const {
  userTypes: { admin },
} = require('../constants');

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
