const request = require('supertest');
const { mongoDbConnect, mongoDbDisconnect } = require('../../db/mongo');
const app = require('../../app/express');
const User = require('../user/user.model');
const Category = require('../category/category.model');
const Subcategory = require('../subcategory/subcategory.model');
const signJwtToken = require('../user/utils/signJwtToken');
const categories = require('../../../data-seed/categories.json');
const subcategories = require('../../../data-seed/subcategories.json');

describe('Subcategory routes', () => {
  let adminUser;
  let regularUser;
  beforeAll(async () => {
    await mongoDbConnect();

    await Category.create(categories);
    await Subcategory.create(subcategories);

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
});
