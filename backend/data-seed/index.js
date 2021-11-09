require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');
const Room = require('../models/room');
const users = require('./users');
const rooms = require('./rooms');

mongoose.connect(process.env.DB_URI, {});

const seedData = async () => {
  try {
    await User.deleteMany();
    await Room.deleteMany();
    await User.insertMany(users);
    await Room.insertMany(rooms);

    console.log('Data seeded');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedData();
