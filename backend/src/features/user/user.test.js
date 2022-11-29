const request = require('supertest');
const { mongoDbConnect, mongoDbDisconnect } = require('../../db/mongo');
const app = require('../../app/express');
const signJwtToken = require('./utils/signJwtToken');

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

    test('it should not allow to register with non schema props', async () => {
      const response = await request(app)
        .post('/v1/users/register')
        .send({
          username: 'Iva',
          email: 'iva@mail.com',
          password: '12345678',
          role: 'admin', // joi will reject any key which is not part of the validation schema
        })
        .expect('Content-Type', /application\/json/)
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        error: '"role" is not allowed',
      });
    });
  });

  describe('Login user controller', () => {
    test('it should login an user successfully', async () => {
      const response = await request(app)
        .post('/v1/users/login')
        // we will have this user from the register tests
        .send({ email: 'ivo@mail.com', password: '12345678' })
        .expect('Content-Type', /application\/json/)
        .expect('Authorization', /Bearer [A-Za-z0-9.-]+/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body).not.toHaveProperty('email');
      expect(response.body).toHaveProperty('user.username', 'Ivo');
      expect(response.body).not.toHaveProperty('user.password');
    });

    test('it should send cors headers', async () => {
      await request(app)
        .post('/v1/users/login')
        .send({ email: 'ivo@mail.com', password: '12345678' })
        .expect('access-control-allow-origin', '*');
    });

    test('it should not allow to login with invalid email', async () => {
      const response = await request(app)
        .post('/v1/users/login')
        .send({ email: 'iva21@mail', password: '12345678' })
        .expect('Content-Type', /application\/json/)
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        error: '"email" must be a valid email',
      });
    });

    test('it should not allow to login with not exisiting email', async () => {
      const response = await request(app)
        .post('/v1/users/login')
        .send({ email: 'iva21@mail.com', password: '12345678' })
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        error: 'Invalid credentials',
      });
    });
  });

  describe('Logout user controller', () => {
    let userResponse;
    beforeAll(async () => {
      userResponse = await request(app)
        .post('/v1/users/login')
        .send({ email: 'ivo@mail.com', password: '12345678' });
    });

    test('it should logout an user successfully', async () => {
      const response = await request(app)
        .put('/v1/users/logout')
        .set('Authorization', userResponse.headers.authorization)
        .expect('Content-Type', /application\/json/)
        .expect('Authorization', /Bearer [A-Za-z0-9.-]+/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user', null);
    });

    test('it should return error message if authorization header is not provided', async () => {
      const response = await request(app)
        .put('/v1/users/logout')
        .expect('Content-Type', /application\/json/)
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'You are not logged in');
    });
  });

  describe('Current user controller', () => {
    let userResponse;
    beforeAll(async () => {
      userResponse = await request(app)
        .post('/v1/users/login')
        .send({ email: 'ivo@mail.com', password: '12345678' });
    });

    test('it should get the current user based on the authorization header', async () => {
      const response = await request(app)
        .get('/v1/users/current-user')
        .set('Authorization', userResponse.headers.authorization)
        .expect('Content-Type', /application\/json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty(
        'user._id',
        userResponse.body.user._id
      );
      expect(response.body).toHaveProperty('user.username', 'Ivo');
      expect(response.body).toHaveProperty('user.role', 'user');
    });

    test('it should return error if the token expired', async () => {
      const token = signJwtToken('6171c360168d11250b4e15d9', '1s');

      // wait a second and a half for the token to expire
      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });

      const response = await request(app)
        .get('/v1/users/current-user')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /application\/json/)
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'jwt expired');
    });
  });

  describe('Forgot password controller', () => {
    test('it should return success response for not existing email', async () => {
      const response = await request(app)
        .post('/v1/users/forgot-password')
        .send({ email: 'not-existing@mail.com' })
        .expect('Content-Type', /application\/json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty(
        'message',
        'You will soon receive an email, if the provided email was valid.'
      );
    });

    test('it should return error if email is not provided', async () => {
      const response = await request(app)
        .post('/v1/users/forgot-password')
        .expect('Content-Type', /application\/json/)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', '"email" is required');
    });

    test('it should return error if additional keys are provided', async () => {
      const response = await request(app)
        .post('/v1/users/forgot-password')
        .send({ email: 'ivo@mail.com', text: 'Test text' })
        .expect('Content-Type', /application\/json/)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', '"text" is not allowed');
    });
  });

  describe('Update password controller', () => {
    let userResponse;
    beforeAll(async () => {
      userResponse = await request(app)
        .post('/v1/users/register')
        .send({ username: 'Ema', email: 'ema@mail.com', password: '12345678' });
    });

    test('it should return success for correct request', async () => {
      const response = await request(app)
        .put('/v1/users/update-password')
        .set('Authorization', userResponse.headers.authorization)
        .send({ oldPassword: '12345678', newPassword: '123456789' })
        .expect('Content-Type', /application\/json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
    });

    test('it should return error if the old password is incorrect', async () => {
      const response = await request(app)
        .put('/v1/users/update-password')
        .set('Authorization', userResponse.headers.authorization)
        .send({ oldPassword: 'test1234', newPassword: '123456789' })
        .expect('Content-Type', /application\/json/)
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Incorrect password');
    });

    test('it should return error if one of the passwords is not provided', async () => {
      const response = await request(app)
        .put('/v1/users/update-password')
        .set('Authorization', userResponse.headers.authorization)
        .send({ newPassword: '123456789' })
        .expect('Content-Type', /application\/json/)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error',
        '"oldPassword" is required'
      );
    });

    test('it should return error if authentication header is not provided', async () => {
      const response = await request(app)
        .put('/v1/users/update-password')
        .send({ oldPassword: '123456789', newPassword: '1234567890' })
        .expect('Content-Type', /application\/json/)
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'You are not logged in');
    });
  });
});
