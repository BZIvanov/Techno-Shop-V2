const express = require('express');
const cors = require('cors');
const user = require('../routes/user');
const category = require('../routes/category');
const subcategory = require('../routes/subcategory');
const product = require('../routes/product');
const globalError = require('../middlewares/global-error');

module.exports = function startApp(app) {
  app.use(express.json({ limit: '10kb' }));

  app.use(cors());

  app.use('/api/v1/user', user);
  app.use('/api/v1/category', category);
  app.use('/api/v1/subcategory', subcategory);
  app.use('/api/v1/product', product);
  // globalError has to be the last route
  app.use(globalError);
};
