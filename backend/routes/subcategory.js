const router = require('express').Router();
const {
  getSubcategories,
  getSubcategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
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

module.exports = router;
