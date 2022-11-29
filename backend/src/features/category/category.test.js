const request = require('supertest');
const { mongoDbConnect, mongoDbDisconnect } = require('../../db/mongo');
const app = require('../../app/express');
const User = require('../user/user.model');
const Category = require('./category.model');
const signJwtToken = require('../user/utils/signJwtToken');
const categories = require('../../../data-seed/categories.json');

describe('Category routes', () => {
  let adminUser;
  let regularUser;
  beforeAll(async () => {
    await mongoDbConnect();

    await Category.create(categories);

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

  describe('Create category controller', () => {
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

    test('it should return error if too long category name is provided', async () => {
      const response = await request(app)
        .post('/v1/categories')
        .set('Authorization', `Bearer ${signJwtToken(adminUser._id)}`)
        .send({ name: 'Summer clothes for the hot summer' })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error',
        '"name" length must be less than or equal to 32 characters long'
      );
    });
  });

  describe('Get categories controller', () => {
    test('it should get categories successfully', async () => {
      const response = await request(app)
        .get('/v1/categories')
        .expect('Content-Type', /application\/json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('categories');
      expect(response.body.categories[0]).toHaveProperty('_id');
      expect(response.body.categories[0]).toHaveProperty('createdAt');
      expect(response.body.categories[0]).toHaveProperty('updatedAt');
      expect(response.body.categories[0]).toHaveProperty('name');
      expect(response.body.categories[0]).toHaveProperty('slug');
    });
  });

  describe('Get category controller', () => {
    test('it should get a category successfully', async () => {
      const categoryId = categories[0]._id;
      const response = await request(app)
        .get(`/v1/categories/${categoryId}`)
        .expect('Content-Type', /application\/json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('category._id', categoryId);
      expect(response.body).toHaveProperty('category.name', categories[0].name);
      expect(response.body).toHaveProperty('category.slug', categories[0].slug);
    });

    test('it should return not found for invalid id', async () => {
      const categoryId = '5199473165bcf27b81cae571';
      const response = await request(app)
        .get(`/v1/categories/${categoryId}`)
        .expect('Content-Type', /application\/json/)
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Category not found');
    });
  });

  describe('Update category controller', () => {
    test('it should update category successfully', async () => {
      const categoryId = categories[0]._id;
      const response = await request(app)
        .put(`/v1/categories/${categoryId}`)
        .send({ name: 'Updated Name' })
        .set('Authorization', `Bearer ${signJwtToken(adminUser._id)}`)
        .expect('Content-Type', /application\/json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('category._id', categoryId);
      expect(response.body).toHaveProperty('category.name', 'Updated Name');
      expect(response.body).toHaveProperty('category.slug', 'updated-name');
    });

    test('it should return not found for invalid id', async () => {
      const categoryId = '5199473165bcf27b81cae571';
      const response = await request(app)
        .put(`/v1/categories/${categoryId}`)
        .set('Authorization', `Bearer ${signJwtToken(adminUser._id)}`)
        .send({ name: 'My new name' })
        .expect('Content-Type', /application\/json/)
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Category not found');
    });

    test('it should return not logged in error if authorization header is not provided', async () => {
      const categoryId = '5199473165bcf27b81cae571';
      const response = await request(app)
        .put(`/v1/categories/${categoryId}`)
        .send({ name: 'My new category' })
        .expect('Content-Type', /application\/json/)
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'You are not logged in');
    });

    test('it should return bad request error if category name is not provided', async () => {
      const categoryId = '5199473165bcf27b81cae571';
      const response = await request(app)
        .put(`/v1/categories/${categoryId}`)
        .set('Authorization', `Bearer ${signJwtToken(adminUser._id)}`)
        .expect('Content-Type', /application\/json/)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', '"name" is required');
    });

    test('it should return error if category name is too short', async () => {
      const categoryId = categories[0]._id;
      const response = await request(app)
        .put(`/v1/categories/${categoryId}`)
        .set('Authorization', `Bearer ${signJwtToken(adminUser._id)}`)
        .expect('Content-Type', /application\/json/)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', '"name" is required');
    });
  });

  describe('Delete category controller', () => {
    test('it should delete existing category successfully', async () => {
      const categoryId = categories[0]._id;
      await request(app)
        .delete(`/v1/categories/${categoryId}`)
        .set('Authorization', `Bearer ${signJwtToken(adminUser._id)}`)
        .expect(204);
    });

    test('it should return not found for invalid id', async () => {
      const categoryId = '5199473165bcf27b81cae571';
      const response = await request(app)
        .delete(`/v1/categories/${categoryId}`)
        .set('Authorization', `Bearer ${signJwtToken(adminUser._id)}`)
        .expect('Content-Type', /application\/json/)
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Category not found');
    });

    test('it should return not logged in error if authorization header is not provided', async () => {
      const categoryId = '5199473165bcf27b81cae571';
      const response = await request(app)
        .delete(`/v1/categories/${categoryId}`)
        .expect('Content-Type', /application\/json/)
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'You are not logged in');
    });

    test('it should return error if the user is not admin', async () => {
      const categoryId = '5199473165bcf27b81cae571';
      const response = await request(app)
        .delete(`/v1/categories/${categoryId}`)
        .set('Authorization', `Bearer ${signJwtToken(regularUser._id)}`)
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