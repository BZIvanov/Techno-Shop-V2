const router = require('express').Router();
const { getAllRooms } = require('../controllers/rooms');

router.route('/').get(getAllRooms);

module.exports = router;
