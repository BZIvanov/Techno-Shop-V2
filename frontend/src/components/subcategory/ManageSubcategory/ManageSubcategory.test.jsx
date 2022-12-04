import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, within } from '../../../utils/test-utils';
import ManageSubcategory from './ManageSubcategory';

// set the api calls which will be called after the component renders initially
const handlers = [
  rest.get(`${process.env.REACT_APP_API}/categories`, (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        categories: [
          { _id: '123', name: 'Shoes', slug: 'shoes' },
          { _id: '124', name: 'Laptops', slug: 'laptops' },
        ],
      }),
      ctx.delay(100)
    );
  }),
  rest.get(`${process.env.REACT_APP_API}/subcategories`, (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        subcategories: [],
      }),
      ctx.delay(100)
    );
  }),
];

const server = setupServer(...handlers);

describe('ManageSubcategory component', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  describe('Component elements', () => {
    test('render components elemets successfully', () => {
      render(<ManageSubcategory />);

      const titleElement = screen.getByRole('heading', {
        name: /manage subcategories/i,
      });
      expect(titleElement).toHaveStyle({
        'font-family': 'Roboto,Helvetica,sans-serif',
        'font-weight': '400',
      });

      screen.getByTestId('categoryId');
      screen.getByRole('button', { name: /reset/i });
      screen.getByRole('button', { name: /create/i });

      screen.getByRole('textbox', { name: /search/i });

      const subcategoriesList = screen.getByRole('list');
      within(subcategoriesList).getByText(
        'No subcategories. Use the form above to create some.'
      );
    });
  });
});
