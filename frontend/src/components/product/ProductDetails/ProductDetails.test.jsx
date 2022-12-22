import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Routes, Route } from 'react-router-dom';
import {
  render,
  screen,
  within,
  waitFor,
} from '../../../test-utils/test-utils';
import ProductDetails from './ProductDetails';

const products = [
  {
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
    images: [
      { publicId: '12345', imageUrl: 'https://my-images.com/12345.jpg' },
    ],
    shipping: 'Yes',
    color: 'Blue',
    brand: 'Brandt',
    ratings: [],
  },
  {
    _id: '201',
    title: 'The second product',
    slug: 'the-second-product',
    description: 'One more nice product',
    price: 18.55,
    category: { _id: '125', name: 'Clothes', slug: 'clothes' },
    subcategories: [
      { _id: '126', name: 'Shirts', slug: 'shirts', categoryId: '125' },
    ],
    quantity: 235,
    sold: 11,
    images: [],
    shipping: 'No',
    color: 'Red',
    brand: 'Amazyinc',
    ratings: [{ stars: 5, postedBy: '145' }],
  },
];

const handlers = [
  rest.get(
    `${process.env.REACT_APP_API}/products/:productId`,
    (req, res, ctx) => {
      const { productId } = req.params;
      const product = products.find((product) => product._id === productId);
      return res(ctx.json({ success: true, product }), ctx.delay(100));
    }
  ),
  rest.get(
    `${process.env.REACT_APP_API}/products/:productId/similar`,
    (req, res, ctx) => {
      return res(
        ctx.json({ success: true, totalCount: 0, products: [] }),
        ctx.delay(100)
      );
    }
  ),
];

const server = setupServer(...handlers);

const TestRoutes = ({ children }) => {
  return (
    <Routes>
      <Route path='/product/:productId' element={children} />
    </Routes>
  );
};

describe('ProductDetails component', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  describe('Product info', () => {
    test('renders the product title', async () => {
      const initialEntries = [`/product/${products[0]._id}`];

      render(<ProductDetails />, { initialEntries, TestRoutes });

      await screen.findByText('My cool product', {}, { timeout: 1000 });
    });

    test('renders the product details', async () => {
      const initialEntries = [`/product/${products[0]._id}`];

      render(<ProductDetails />, { initialEntries, TestRoutes });

      // await the first query to make sure the data was loaded
      await screen.findByText('$ 123.45', {}, { timeout: 1000 });
      screen.getByText('Not rated yet');
      screen.getByRole('button', { name: 'Clothes' });
      screen.getByRole('button', { name: 'Shirts' });
      screen.getByText('Yes');
      screen.getByText('Blue');
      screen.getByText('Brandt');
    });

    test('for product with rating should not render not rated text', async () => {
      const initialEntries = [`/product/${products[1]._id}`];
      render(<ProductDetails />, { initialEntries, TestRoutes });

      // await the first query to make sure the data was loaded
      await screen.findByText('The second product', {}, { timeout: 1000 });
      const productNotRatedText = screen.queryByText('Not rated yet');
      expect(productNotRatedText).not.toBeInTheDocument();
    });
  });

  describe('Product info buttons', () => {
    test('renders correct buttons for not logged in user', async () => {
      const initialEntries = [`/product/${products[0]._id}`];

      render(<ProductDetails />, { initialEntries, TestRoutes });

      await screen.findByText(/add to cart/i, {}, { timeout: 1000 });
      screen.getByText(/add to wishlist/i);
      screen.getByText(/^login to leave rating$/i);
    });

    test('renders correct buttons for logged in user', async () => {
      const initialEntries = [`/product/${products[0]._id}`];
      const preloadedState = {
        user: { token: '123', user: { _id: '300', name: 'Iva', role: 'user' } },
      };

      render(<ProductDetails />, {
        initialEntries,
        TestRoutes,
        preloadedState,
      });

      await screen.findByText(/add to cart/i, {}, { timeout: 1000 });
      screen.getByText(/add to wishlist/i);
      screen.getByText(/^leave rating$/i);
    });

    test('should render filled star icon if the user already rated the product', async () => {
      const initialEntries = [`/product/${products[1]._id}`];
      const preloadedState = {
        user: { token: '123', user: { _id: '145', name: 'Iva', role: 'user' } },
      };

      render(<ProductDetails />, {
        initialEntries,
        TestRoutes,
        preloadedState,
      });

      const rateButton = await screen.findByRole('button', {
        name: /^leave rating$/i,
      });
      await waitFor(() => {
        within(rateButton).getByTestId('StarIcon');
      });
    });

    test('should render outline star icon if the user did not rate the product', async () => {
      const initialEntries = [`/product/${products[1]._id}`];
      const preloadedState = {
        user: { token: '123', user: { _id: '148', name: 'Iva', role: 'user' } },
      };

      render(<ProductDetails />, {
        initialEntries,
        TestRoutes,
        preloadedState,
      });

      const rateButton = await screen.findByRole('button', {
        name: /^leave rating$/i,
      });
      await waitFor(() => {
        within(rateButton).getByTestId('StarBorderOutlinedIcon');
      });
    });
  });
});
