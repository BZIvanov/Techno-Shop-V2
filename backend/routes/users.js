const router = require('express').Router();
const {
  register,
  login,
  logout,
  forgotPassword,
} = require('../controllers/user');
const authenticate = require('../middlewares/authenticate');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').put(authenticate, logout);
router.route('/forgot-password').post(forgotPassword);

module.exports = router;
