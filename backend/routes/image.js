const router = require('express').Router();
const { uploadImages, removeImage } = require('../controllers/image');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const {
  userTypes: { admin },
} = require('../constants');

router.route('/upload').post(authenticate, authorize(admin), uploadImages);
router.route('/remove').post(authenticate, authorize(admin), removeImage);

module.exports = router;
