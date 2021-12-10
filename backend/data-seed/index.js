require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');
const Category = require('../models/category');
const Subcategory = require('../models/subcategory');
const Product = require('../models/product');
const users = require('./users');
const categories = require('./categories');
const subcategories = require('./subcategories');
const products = require('./products');

mongoose.connect(process.env.DB_URI, {});

const seedData = async () => {
  try {
    await User.deleteMany();
    await Category.deleteMany();
    await Subcategory.deleteMany();
    await Product.deleteMany();

    await User.create(users);
    await Category.create(categories);
    await Subcategory.create(subcategories);
    await Product.create(products);

    console.log('Data seeded');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedData();
