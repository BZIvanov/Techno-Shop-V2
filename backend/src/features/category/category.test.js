const request = require('supertest');
const { mongoDbConnect, mongoDbDisconnect } = require('../../db/mongo');
const app = require('../../app/express');
const User = require('../user/user.model');
const signJwtToken = require('../user/utils/signJwtToken');

describe('Category routes', () => {
  beforeAll(async () => {
    await mongoDbConnect();
  });

  afterAll(async () => {
    await mongoDbDisconnect();
  });

  describe('Create category controller', () => {
    let adminUser;
    let regularUser;
    beforeAll(async () => {
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

    test('it should create a category successfully', async () => {
      const response = await request(app)
        .post('/v1/categories')
        .set('Authorization', `Bearer ${signJwtToken(adminUser._id)}`)
        .send({ name: 'Shoes' })
        .expect('Content-Type', /application\/json/)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('category.name', 'Shoes');
      expect(response.body).toHaveProperty('category.slug', 'shoes');
    });

    test('it should return error if the user is not admin', async () => {
      const response = await request(app)
        .post('/v1/categories')
        .set('Authorization', `Bearer ${signJwtToken(regularUser._id)}`)
        .send({ name: 'Dresses' })
        .expect('Content-Type', /application\/json/)
        .expect(403);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error',
        'User is not authorized to access this route'
      );
    });

    test('it should return error if extra keys are provided', async () => {
      const response = await request(app)
        .post('/v1/categories')
        .set('Authorization', `Bearer ${signJwtToken(adminUser._id)}`)
        .send({ name: 'Laptops', slug: 'laptops' })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', '"slug" is not allowed');
    });
  });
});
