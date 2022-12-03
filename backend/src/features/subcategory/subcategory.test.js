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

  describe('Get subcategories controller', () => {
    test('it should get subcategories with populated category data', async () => {
      const response = await request(app)
        .get('/v1/subcategories')
        .expect('Content-Type', /application\/json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('subcategories');
      expect(response.body.subcategories[0]).toHaveProperty('_id');
      expect(response.body.subcategories[0]).toHaveProperty('name');
      expect(response.body.subcategories[0]).toHaveProperty('slug');
      expect(response.body.subcategories[0]).toHaveProperty('categoryId._id');
      expect(response.body.subcategories[0]).toHaveProperty('categoryId.name');
    });
  });

  describe('Get subcategory controller', () => {
    test('it should get a subcategory successfully', async () => {
      const subcategoryId = subcategories[0]._id;
      const response = await request(app)
        .get(`/v1/subcategories/${subcategoryId}`)
        .expect('Content-Type', /application\/json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('subcategory._id', subcategoryId);
      expect(response.body).toHaveProperty(
        'subcategory.name',
        subcategories[0].name
      );
      expect(response.body).toHaveProperty(
        'subcategory.slug',
        subcategories[0].slug
      );
    });

    test('it should return not found for invalid id', async () => {
      const subcategoryId = '1199473165bcf27b81cae571';
      const response = await request(app)
        .get(`/v1/subcategories/${subcategoryId}`)
        .expect('Content-Type', /application\/json/)
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Subcategory not found');
    });
  });

  describe('Update subcategory controller', () => {
    test('it should update subcategory successfully', async () => {
      const subcategoryId = subcategories[0]._id;
      const response = await request(app)
        .put(`/v1/subcategories/${subcategoryId}`)
        .send({
          name: 'New subcat name',
          categoryId: subcategories[0].categoryId,
        })
        .set('Authorization', `Bearer ${signJwtToken(adminUser._id)}`)
        .expect('Content-Type', /application\/json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('subcategory._id', subcategoryId);
      expect(response.body).toHaveProperty(
        'subcategory.name',
        'New subcat name'
      );
      expect(response.body).toHaveProperty(
        'subcategory.slug',
        'new-subcat-name'
      );
    });
  });

  describe('Delete subcategory controller', () => {
    test('it should delete existing subcategory successfully', async () => {
      const subcategoryId = subcategories[0]._id;
      await request(app)
        .delete(`/v1/subcategories/${subcategoryId}`)
        .set('Authorization', `Bearer ${signJwtToken(adminUser._id)}`)
        .expect(204);
    });
  });
});
