const express = require('express');
const { getOrders, createOrder } = require('./order.controllers');

const authenticate = require('../../middlewares/authenticate');

const router = express.Router();

router.route('/').get(authenticate, getOrders).post(authenticate, createOrder);

module.exports = router;
