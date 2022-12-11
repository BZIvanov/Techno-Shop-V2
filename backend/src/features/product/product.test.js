const request = require('supertest');
const { mongoDbConnect, mongoDbDisconnect } = require('../../db/mongo');
const app = require('../../app/express');
const User = require('../user/user.model');
const Category = require('../category/category.model');
const Subcategory = require('../subcategory/subcategory.model');
const Product = require('./product.model');
const signJwtToken = require('../user/utils/signJwtToken');
const categories = require('../../../data-seed/categories.json');
const subcategories = require('../../../data-seed/subcategories.json');
const products = require('../../../data-seed/products.json');

describe('Subcategory routes', () => {
  let adminUser;
  let regularUser;
  beforeAll(async () => {
    await mongoDbConnect();

    await Category.create(categories);
    await Subcategory.create(subcategories);
    await Product.create(products);

    adminUser = await User.create({
      username: 'admin',
      email: 'admin@mail.com',
      password: '12345678',
      role: 'admin',
    });

    regularUser = await User.create({
      username: 'Iva',
      email: 'iva@mail.com',
      password: '12345678',
      role: 'user',
    });
  });

  afterAll(async () => {
    await mongoDbDisconnect();
  });

  describe('Get products controller', () => {
    test('it should get products successfully', async () => {
      const response = await request(app)
        .get('/v1/products')
        .expect('Content-Type', /application\/json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('totalCount', 7);
      expect(response.body.products[0]).toHaveProperty('title');
    });

    test('it should get two products if perPage is 2', async () => {
      const response = await request(app)
        .get('/v1/products')
        .query({ perPage: 2 })
        .expect('Content-Type', /application\/json/)
        .expect(200);

      expect(response.body).toHaveProperty('totalCount', 7);
      expect(response.body.products.length).toBe(2);
    });

    test('it should get empty list for too big page number', async () => {
      const response = await request(app)
        .get('/v1/products')
        .query({ page: 100, perPage: 100 })
        .expect('Content-Type', /application\/json/)
        .expect(200);

      expect(response.body.products.length).toBe(0);
    });

    test('it should get product within price range', async () => {
      const response = await request(app)
        .get('/v1/products')
        .query({ price: '18,19' })
        .expect('Content-Type', /application\/json/)
        .expect(200);

      expect(response.body.products.length).toBe(1);
      expect(response.body.products[0].price).toBe(18.88);
    });
  });

  describe('Get product controller', () => {
    test('it should get product by id, populated with its category', async () => {
      const response = await request(app)
        .get(`/v1/products/${products[0]._id}`)
        .expect('Content-Type', /application\/json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('product.title');
      expect(response.body.product).toHaveProperty('category.name');
    });

    test('it should return not found error for not existing product', async () => {
      const response = await request(app)
        .get('/v1/products/62b2eb398026fa12fca84822')
        .expect('Content-Type', /application\/json/)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Product not found');
    });

    test('it should return resource not found for invalid mongo id', async () => {
      const response = await request(app)
        .get('/v1/products/hello')
        .expect('Content-Type', /application\/json/)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Resource not found');
    });
  });

  describe('Create product controller', () => {
    test('it should create a product successfully', async () => {
      const response = await request(app)
        .post('/v1/products')
        .set('Authorization', `Bearer ${signJwtToken(adminUser._id)}`)
        .send({
          title: 'Blue jeans',
          description: 'Very nice jeans',
          price: 21.24,
          quantity: 234,
          shipping: 'No',
          color: 'Blue',
          brand: 'Milky Dream',
          images: [],
          category: categories[0]._id,
          subcategories: [
            '61b27f4a8c18d90664b9b7f3',
            '61b27f4e8c18d90664b9b7f9',
          ],
        })
        .expect('Content-Type', /application\/json/)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('product.title', 'Blue jeans');
      expect(response.body).toHaveProperty('product.price', 21.24);
    });

    test('it should return error if the user is not admin', async () => {
      const response = await request(app)
        .post('/v1/products')
        .set('Authorization', `Bearer ${signJwtToken(regularUser._id)}`)
        .send({
          title: 'Blue jeans',
          description: 'Very nice jeans',
          price: 21.24,
          quantity: 234,
          shipping: 'No',
          color: 'Blue',
          brand: 'Milky Dream',
          images: [],
          category: categories[0]._id,
          subcategories: ['61b27f4a8c18d90664b9b7f3'],
        })
        .expect('Content-Type', /application\/json/)
        .expect(403);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error',
        'User is not authorized to access this route'
      );
    });
  });

  describe('Update product controller', () => {
    test('it should update the title, rest properties should stay the same', async () => {
      const response = await request(app)
        .put(`/v1/products/${products[0]._id}`)
        .set('Authorization', `Bearer ${signJwtToken(adminUser._id)}`)
        .send({ title: 'Dark Chocolate' })
        .expect('Content-Type', /application\/json/)
        .expect(200);

      expect(products[0]).toHaveProperty('title', 'Milky Chocolate');
      expect(response.body).toHaveProperty('product.title', 'Dark Chocolate');
      expect(response.body).toHaveProperty('product.price', 3.45);
    });

    test('it should return error if the user is not admin', async () => {
      const response = await request(app)
        .put(`/v1/products/${products[0]._id}`)
        .set('Authorization', `Bearer ${signJwtToken(regularUser._id)}`)
        .send({ title: 'Dark Chocolate' })
        .expect('Content-Type', /application\/json/)
        .expect(403);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error',
        'User is not authorized to access this route'
      );
    });

    test('it should return error for not existing product id', async () => {
      const response = await request(app)
        .put('/v1/products/21b280ee8cbd2875f54ed9ab')
        .set('Authorization', `Bearer ${signJwtToken(adminUser._id)}`)
        .send({ title: 'Dark Chocolate' })
        .expect('Content-Type', /application\/json/)
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Product not found');
    });
  });

  describe('Delete product controller', () => {
    test('it should delete the product', async () => {
      await request(app)
        .delete(`/v1/products/${products[0]._id}`)
        .set('Authorization', `Bearer ${signJwtToken(adminUser._id)}`)
        .expect(204);
    });
  });
});
