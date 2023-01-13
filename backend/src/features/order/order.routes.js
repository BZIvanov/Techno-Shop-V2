const express = require('express');
const { createOrder } = require('./order.controllers');

const authenticate = require('../../middlewares/authenticate');

const router = express.Router();

router.route('/').post(authenticate, createOrder);

module.exports = router;
