require('dotenv').config(); // here the dotenv variables are also loaded, because of the unit tests
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routesV1 = require('./versioning/v1');
const notFoundRoutes = require('../features/not-found/not-found.routes');
const globalError = require('../middlewares/global-error');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.use('/v1', routesV1);
app.use('*', notFoundRoutes);
// globalError has to be the last route
app.use(globalError);

module.exports = app;
