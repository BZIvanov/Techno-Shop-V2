const express = require('express');
const cors = require('cors');
const rooms = require('../routes/rooms');
const globalError = require('../middlewares/global-error');

module.exports = function startApp(app) {
  app.use(express.json({ limit: '10kb' }));

  app.use(cors());

  app.use('/api/v1/rooms', rooms);
  // globalError has to be the last route
  app.use(globalError);
};
