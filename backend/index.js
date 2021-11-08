require('dotenv').config();
const express = require('express');
require('./startup/db');

const app = express();
require('./startup/express')(app);

const PORT = process.env.PORT || 3100;
const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
require('./startup/error-handling')(server);
