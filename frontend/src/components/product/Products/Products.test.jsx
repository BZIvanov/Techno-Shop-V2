import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '../../../test-utils/test-utils';
import Products from './Products';

const products = [
  {
    _id: '123',
    title: 'First product',
    price: 123.45,
    description: 'First Description',
    images: [],
    ratings: [{ postedBy: '211', stars: 4 }],
  },
  {
    _id: '124',
    title: 'Second product',
    price: 11,
    description: 'Second description',
    images: [],
    ratings: [],
  },
  {
    _id: '125',
    title: 'Third product',
    price: 10.99,
    description: 'Third description',
    images: [],
    ratings: [{ postedBy: '211', stars: 5 }],
  },
  {
    _id: '126',
    title: 'Fourth product',
    price: 2500.99,
    description: 'Fourth description',
    images: [],
    ratings: [{ postedBy: '212', stars: 3 }],
  },
  {
    _id: '127',
    title: 'Fifth product',
    price: 3999.5,
    description: 'Fifth description',
    images: [],
    ratings: [{ postedBy: '212', stars: 3 }],
  },
  {
    _id: '128',
    title: 'Sixth product',
    price: 78.79,
    description: 'Sixth description',
    images: [],
    ratings: [],
  },
  {
    _id: '129',
    title: 'Seventh product',
    price: 563.9,
    description: 'Seventh description',
    images: [],
    ratings: [],
  },
  {
    _id: '130',
    title: 'Eight product',
    price: 300,
    description: 'Eight description',
    images: [],
    ratings: [],
  },
  {
    _id: '131',
    title: 'Ninth product',
    price: 1200.0,
    description: 'Ninth description',
    images: [],
    ratings: [],
  },
  {
    _id: '132',
    title: 'Ten product',
    price: 2600.0,
    description: 'Ten description',
    images: [],
    ratings: [],
  },
  {
    _id: '133',
    title: 'Eleven product',
    price: 1800,
    description: 'Eleven description',
    images: [],
    ratings: [],
  },
  {
    _id: '134',
    title: 'Twelve product',
    price: 1600,
    description: 'Twelve description',
    images: [],
    ratings: [],
  },
  {
    _id: '135',
    title: 'Thirteen product',
    price: 1530.55,
    description: 'Thirteen description',
    images: [],
    ratings: [],
  },
  {
    _id: '136',
    title: 'Fourteen product',
    price: 3333.33,
    description: 'Fourteen description',
    images: [],
    ratings: [{ postedBy: '214', stars: 1.5 }],
  },
];

const handlers = [
  rest.get(`${process.env.REACT_APP_API}/products`, (req, res, ctx) => {
    return res(
      ctx.json({ success: true, totalCount: 0, products: [] }),
      ctx.delay(100)
    );
  }),
];

const server = setupServer(...handlers);

describe('AdminProducts component', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  describe('Products list title', () => {
    test('renders the title', () => {
      render(<Products />);

      const listTitle = screen.getByRole('heading', {
        name: /products list/i,
      });

      expect(listTitle).toHaveStyle({ 'font-weight': 400 });
    });
  });

  describe('Products list', () => {
    test('renders no products text if the products list is empty', () => {
      render(<Products />);

      screen.getByText('No products found.');
    });

    test('renders product title and description', async () => {
      server.use(
        rest.get(`${process.env.REACT_APP_API}/products`, (req, res, ctx) => {
          return res(
            ctx.json({
              success: true,
              products,
              totalCount: products.length,
            }),
            ctx.delay(100)
          );
        })
      );

      render(<Products />);

      // use findByText to give enough time to load the products data and also for the Transition effects to avoid act rtl warnings
      await screen.findByText(products[0].title, {}, { timeout: 2000 });
      await screen.findByText(products[0].description);
    });

    test('renders 5 products for each product, with edit and delete buttons', async () => {
      const first5Products = products.filter((p, i) => i < 5);

      server.use(
        rest.get(`${process.env.REACT_APP_API}/products`, (req, res, ctx) => {
          return res(
            ctx.json({
              success: true,
              products: first5Products,
              totalCount: first5Products.length,
            }),
            ctx.delay(100)
          );
        })
      );

      const preloadedState = {
        user: { token: '123', user: { name: 'Iva', role: 'admin' } },
      };

      render(<Products />, { preloadedState });

      const editButtons = await screen.findAllByText(
        /edit/i,
        {},
        { timeout: 2000 }
      );
      const deleteButtons = await screen.findAllByText(/delete/i);

      expect(editButtons.length).toBe(5);
      expect(deleteButtons.length).toBe(5);
    });

    test('renders not rated yet once for the only product with no rating', async () => {
      const first5Products = products.filter((p, i) => i < 5);

      server.use(
        rest.get(`${process.env.REACT_APP_API}/products`, (req, res, ctx) => {
          return res(
            ctx.json({
              success: true,
              products: first5Products,
              totalCount: first5Products.length,
            }),
            ctx.delay(100)
          );
        })
      );

      render(<Products />);

      const notRatedProducts = await screen.findAllByText(
        'Not rated yet',
        {},
        { timeout: 2000 }
      );

      expect(notRatedProducts.length).toBe(1);
    });
  });

  describe('Pagination', () => {
    test('should not render pagination if all products fit on one page', async () => {
      const first5Products = products.filter((p, i) => i < 5);

      server.use(
        rest.get(`${process.env.REACT_APP_API}/products`, (req, res, ctx) => {
          return res(
            ctx.json({
              success: true,
              products: first5Products,
              totalCount: first5Products.length,
            }),
            ctx.delay(100)
          );
        })
      );

      render(<Products />);

      // make sure we wait enough to load the products
      await screen.findByText(products[0].title, {}, { timeout: 2000 });

      const paginationPage = screen.queryByRole('button', { name: /page 1/i });
      expect(paginationPage).not.toBeInTheDocument();
    });

    test('should render pagination if products dont fit on 1 page', async () => {
      server.use(
        rest.get(`${process.env.REACT_APP_API}/products`, (req, res, ctx) => {
          return res(
            ctx.json({
              success: true,
              products,
              totalCount: products.length,
            }),
            ctx.delay(100)
          );
        })
      );

      render(<Products />);

      await screen.findByText(products[0].title, {}, { timeout: 2000 });

      screen.getByRole('button', { name: /page 1/i });
      screen.getByRole('button', { name: /page 2/i });
    });

    test('going to second page should display only the remaining 2 products', async () => {
      server.use(
        rest.get(`${process.env.REACT_APP_API}/products`, (req, res, ctx) => {
          const page = req.url.searchParams.get('page');
          const perPage = req.url.searchParams.get('perPage');

          return res(
            ctx.json({
              success: true,
              products: products.filter((p, i) => {
                return i >= (page - 1) * perPage && i < page * perPage;
              }),
              totalCount: products.length,
            }),
            ctx.delay(100)
          );
        })
      );

      render(<Products />);

      // wait for the initial products to be loaded
      await screen.findByText(products[0].title, {}, { timeout: 1000 });

      const page2Button = screen.getByRole('button', { name: /page 2/i });
      await userEvent.click(page2Button);

      // wait for the next page products to be loaded
      await screen.findByText(products[12].title, {}, { timeout: 1000 });

      const detailsButtons = await screen.findAllByText(
        /details/i,
        {},
        { timeout: 1000 }
      );

      expect(detailsButtons.length).toBe(2);
    });
  });
});
