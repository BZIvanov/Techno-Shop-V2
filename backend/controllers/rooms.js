const status = require('http-status');
const Room = require('../models/room');
const catchAsync = require('../middlewares/catch-async');

exports.getAllRooms = catchAsync(async (req, res) => {
  const rooms = await Room.find();

  const totalCount = await Room.countDocuments();

  res.status(status.OK).json({
    success: true,
    totalCount,
    rooms,
  });
});
