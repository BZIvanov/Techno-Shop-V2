import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '../../../test-utils/test-utils';
import ProductDetails from './ProductDetails';

const product = {
  _id: '123',
  title: 'My cool product',
  slug: 'my-cool-product',
  description: 'Some very cool product',
  price: 123.45,
  category: { _id: '125', name: 'Clothes', slug: 'clothes' },
  subcategories: [
    { _id: '126', name: 'Shirts', slug: 'shirts', categoryId: '125' },
  ],
  quantity: 21,
  sold: 3,
  images: [{ publicId: '12345', imageUrl: 'https://my-images.com/12345.jpg' }],
  shipping: 'Yes',
  color: 'Blue',
  brand: 'Brandt',
  ratings: [{ stars: 5, postedBy: '145' }],
};

const handlers = [
  rest.get(
    `${process.env.REACT_APP_API}/products/undefined`, // TODO extend the router in test utils to be able to handle url params
    (req, res, ctx) => {
      return res(ctx.json({ success: true, product }), ctx.delay(100));
    }
  ),
  rest.get(
    `${process.env.REACT_APP_API}/products/undefined/similar`,
    (req, res, ctx) => {
      return res(
        ctx.json({ success: true, totalCount: 0, products: [] }),
        ctx.delay(100)
      );
    }
  ),
];

const server = setupServer(...handlers);

describe('ProductDetails component', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  describe('Product info', () => {
    test('renders the product title', async () => {
      render(<ProductDetails />);

      await screen.findByText(product.title, {}, { timeout: 1000 });
    });
  });
});
