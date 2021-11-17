const router = require('express').Router();
const {
  register,
  login,
  logout,
  currentUser,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require('../controllers/user');
const authenticate = require('../middlewares/authenticate');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').put(authenticate, logout);
router.route('/current-user').get(authenticate, currentUser);
router.route('/update-password').put(authenticate, updatePassword);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password').post(resetPassword);

module.exports = router;
