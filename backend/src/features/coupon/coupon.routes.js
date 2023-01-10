const express = require('express');
const {
  getCoupons,
  createCoupon,
  deleteCoupon,
} = require('./coupon.controllers');
const validateRequestBody = require('../../middlewares/validate-request-body');
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');
const {
  userTypes: { admin },
} = require('../user/user.constants');
const { createCouponValidationSchema } = require('./coupon.validationSchema');

const router = express.Router();

router
  .route('/')
  .get(authenticate, authorize(admin), getCoupons)
  .post(
    validateRequestBody(createCouponValidationSchema),
    authenticate,
    authorize(admin),
    createCoupon
  );

router.route('/:couponId').delete(authenticate, authorize(admin), deleteCoupon);

module.exports = router;
