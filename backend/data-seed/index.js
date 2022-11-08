require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/features/user/user.model');
const Category = require('../src/features/category/category.model');
const Subcategory = require('../src/features/subcategory/subcategory.model');
const Product = require('../src/features/product/product.model');
const users = require('./users.json');
const categories = require('./categories.json');
const subcategories = require('./subcategories.json');
const products = require('./products.json');

mongoose.connect(process.env.DATABASE_URI, {});

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
