const router = require('express').Router();
const {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/rooms');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const {
  userTypes: { admin },
} = require('../constants');

router
  .route('/')
  .get(getAllRooms)
  .post(authenticate, authorize(admin), createRoom);
router
  .route('/:id')
  .get(getRoom)
  .put(authenticate, authorize(admin), updateRoom)
  .delete(authenticate, authorize(admin), deleteRoom);

module.exports = router;
