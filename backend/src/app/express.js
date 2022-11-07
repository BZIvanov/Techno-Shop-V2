const express = require('express');
const cors = require('cors');
const userRoutes = require('../features/user/user.routes');
const categoryRoutes = require('../features/category/category.routes');
const subcategoryRoutes = require('../features/subcategory/subcategory.routes');
const productRoutes = require('../features/product/product.routes');
const imageRoutes = require('../features/image/image.routes');
const globalError = require('../middlewares/global-error');

const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/subcategories', subcategoryRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/images', imageRoutes);
// globalError has to be the last route
app.use(globalError);

module.exports = app;
