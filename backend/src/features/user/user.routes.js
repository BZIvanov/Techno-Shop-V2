const express = require('express');
const {
  register,
  login,
  logout,
  currentUser,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require('./user.controllers');
const validateBodyData = require('../../middlewares/validate-body-data');
const authenticate = require('../../middlewares/authenticate');
const { registerValidationSchema } = require('./user.validationSchema');

const router = express.Router();

router
  .route('/register')
  .post(validateBodyData(registerValidationSchema), register);
router.route('/login').post(login);
router.route('/logout').put(authenticate, logout);
router.route('/current-user').get(authenticate, currentUser);
router.route('/update-password').put(authenticate, updatePassword);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password').post(resetPassword);

module.exports = router;
