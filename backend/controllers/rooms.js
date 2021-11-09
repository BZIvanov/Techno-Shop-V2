const status = require('http-status');
const Room = require('../models/room');
const catchAsync = require('../middlewares/catch-async');
const AppError = require('../utils/app-error');

const handleQueryParams = (params) => {
  const { name, location, category } = params;

  const build = {
    ...(name && { name: { $regex: name, $options: 'i' } }),
    ...(location && { address: { $regex: location, $options: 'i' } }),
    ...(category && { category }),
  };

  return build;
};

exports.getAllRooms = catchAsync(async (req, res) => {
  const { page, perPage, ...rest } = req.query;

  const builder = handleQueryParams(rest);

  const pageNumber = parseInt(page || 1, 10);
  const perPageNumber = parseInt(perPage || 12, 10);

  const rooms = await Room.find(builder)
    .skip((pageNumber - 1) * perPageNumber)
    .limit(perPageNumber);

  const totalCount = await Room.countDocuments();

  res.status(status.OK).json({
    success: true,
    totalCount,
    rooms,
  });
});

exports.getRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

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
