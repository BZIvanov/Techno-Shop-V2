const status = require('http-status');
const Room = require('../models/room');
const catchAsync = require('../middlewares/catch-async');
const AppError = require('../utils/app-error');

exports.getAllRooms = catchAsync(async (req, res) => {
  const rooms = await Room.find();

  const totalCount = await Room.countDocuments();

  res.status(status.OK).json({
    success: true,
    totalCount,
    rooms,
  });
});

exports.getRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new AppError('Room not found', status.NOT_FOUND));
  }

  res.status(status.OK).json({ success: true, room });
});

exports.createRoom = catchAsync(async (req, res) => {
  const room = await Room.create(req.body);

  res.status(status.CREATED).json({ success: true, room });
});

exports.updateRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id);
  if (!room) {
    return next(new AppError('Room not found', status.NOT_FOUND));
  }

  const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(status.OK).json({ success: true, room: updatedRoom });
});

exports.deleteRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id);
  if (!room) {
    return next(new AppError('Room not found', status.NOT_FOUND));
  }

  await room.remove();

  // TODO check response
  res.status(status.NO_CONTENT).json({});
});
