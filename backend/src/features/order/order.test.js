const request = require('supertest');
const { mongoDbConnect, mongoDbDisconnect } = require('../../db/mongo');
const app = require('../../app/express');
const User = require('../user/user.model');
const Product = require('../product/product.model');
const Coupon = require('../coupon/coupon.model');
const Order = require('./order.model');
const signJwtToken = require('../user/utils/signJwtToken');
const users = require('../../../data-seed/users.json');
const products = require('../../../data-seed/products.json');
const coupons = require('../../../data-seed/coupons.json');
const orders = require('../../../data-seed/orders.json');

describe('Order routes', () => {
  beforeAll(async () => {
    await mongoDbConnect();

    await User.create(users);
    await Product.create(products);
    await Coupon.create(coupons);
    await Order.create(orders);
  });

  afterAll(async () => {
    await mongoDbDisconnect();
  });

  describe('Get orders controller', () => {
    test('it should return user orders successfully', async () => {
      const response = await request(app)
        .get('/v1/orders')
        .set('Authorization', `Bearer ${signJwtToken(users[1]._id)}`)
        .expect('Content-Type', /application\/json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('totalCount', 1);
      expect(response.body).toHaveProperty('orders');
    });
  });
});
