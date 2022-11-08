const request = require('supertest');
const { mongoDbConnect, mongoDbDisconnect } = require('../../db/mongo');
const app = require('../../app/express');

describe('User routes', () => {
  beforeAll(async () => {
    await mongoDbConnect();
  });

  afterAll(async () => {
    await mongoDbDisconnect();
  });

  describe('Register user controller', () => {
    test('it should register an user successfully', async () => {
      const response = await request(app)
        .post('/v1/users/register')
        .send({ username: 'Ivo', email: 'ivo@mail.com', password: '12345678' })
        .expect('Content-Type', /application\/json/)
        .expect('Authorization', /Bearer [A-Za-z0-9.-]+/)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body).not.toHaveProperty('email');
      expect(response.body).toHaveProperty('user.username', 'Ivo');
      expect(response.body).not.toHaveProperty('user.password');
    });

    test('it should not allow to register with incorrect email', async () => {
      const response = await request(app)
        .post('/v1/users/register')
        .send({ username: 'Iva', email: 'iva@mail', password: '12345678' })
        .expect('Content-Type', /application\/json/)
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        error: '"email" must be a valid email',
      });
    });

    test('it should not allow to register with too long username', async () => {
      const response = await request(app)
        .post('/v1/users/register')
        .send({
          username: 'Ivaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          email: 'iva@mail',
          password: '12345678',
        })
        .expect('Content-Type', /application\/json/)
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        error:
          '"username" length must be less than or equal to 30 characters long',
      });
    });
  });
});
