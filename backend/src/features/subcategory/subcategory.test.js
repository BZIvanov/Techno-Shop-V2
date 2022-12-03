const request = require('supertest');
const { mongoDbConnect, mongoDbDisconnect } = require('../../db/mongo');
const app = require('../../app/express');
const User = require('../user/user.model');
const Category = require('../category/category.model');
const Subcategory = require('./subcategory.model');
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

  describe('Create subcategory controller', () => {
    test('it should create a subcategory successfully', async () => {
      const response = await request(app)
        .post('/v1/subcategories')
        .set('Authorization', `Bearer ${signJwtToken(adminUser._id)}`)
        .send({ name: 'Sandals', categoryId: categories[0]._id })
        .expect('Content-Type', /application\/json/)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('subcategory.name', 'Sandals');
      expect(response.body).toHaveProperty('subcategory.slug', 'sandals');
      expect(response.body).toHaveProperty(
        'subcategory.categoryId._id',
        categories[0]._id
      );
    });

    test('it should return error if the user is not admin', async () => {
      const response = await request(app)
        .post('/v1/subcategories')
        .set('Authorization', `Bearer ${signJwtToken(regularUser._id)}`)
        .send({ name: 'Dresses', categoryId: categories[0]._id })
        .expect('Content-Type', /application\/json/)
        .expect(403);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error',
        'User is not authorized to access this route'
      );
    });

    test('it should return error for invalid id', async () => {
      const response = await request(app)
        .post('/v1/subcategories')
        .set('Authorization', `Bearer ${signJwtToken(regularUser._id)}`)
        .send({ name: 'Dresses', categoryId: '12345' })
        .expect('Content-Type', /application\/json/)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error',
        '"categoryId" with value "12345" fails to match the Invalid id pattern'
      );
    });
  });
});
