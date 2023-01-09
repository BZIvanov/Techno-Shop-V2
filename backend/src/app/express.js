require('dotenv').config(); // here the dotenv variables are also loaded, because of the unit tests
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userRoutes = require('../features/user/user.routes');
const categoryRoutes = require('../features/category/category.routes');
const subcategoryRoutes = require('../features/subcategory/subcategory.routes');
const productRoutes = require('../features/product/product.routes');
const imageRoutes = require('../features/image/image.routes');
const couponRoutes = require('../features/coupon/coupon.routes');
const globalError = require('../middlewares/global-error');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.use('/v1/users', userRoutes);
app.use('/v1/categories', categoryRoutes);
app.use('/v1/subcategories', subcategoryRoutes);
app.use('/v1/products', productRoutes);
app.use('/v1/images', imageRoutes);
app.use('/v1/coupons', couponRoutes);
// globalError has to be the last route
app.use(globalError);

module.exports = app;
