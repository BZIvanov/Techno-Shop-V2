import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor, within } from '../../../utils/test-utils';
import ManageCategory from './ManageCategory';

const handlers = [
  rest.get(`${process.env.REACT_APP_API}/categories`, (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        categories: [],
      }),
      ctx.delay(100)
    );
  }),
  rest.post(`${process.env.REACT_APP_API}/categories`, (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        category: { _id: '123', name: 'Jackets', slug: 'jackets' },
      }),
      ctx.delay(100)
    );
  }),
];

const server = setupServer(...handlers);

describe('ManageCategory component', () => {
  describe('Title element', () => {
    test('render the title with correct text and styles', () => {
      render(<ManageCategory />);

      const titleElement = screen.getByRole('heading', {
        name: /manage categories/i,
      });
      expect(titleElement).toHaveStyle({
        'font-family': 'Roboto,Helvetica,sans-serif',
        'font-weight': '400',
      });
    });
  });

  describe('Create category form', () => {
    beforeAll(() => server.listen());

    afterEach(() => server.resetHandlers());

    afterAll(() => server.close());

    test('render the form field and the buttons', () => {
      render(<ManageCategory />);

      screen.getByRole('textbox', { name: /category name/i });
      screen.getByRole('button', { name: /reset/i });
      screen.getByRole('button', { name: /create/i });
    });

    test('should display error message if category name is too short', async () => {
      render(<ManageCategory />);

      const categoryNameField = screen.getByRole('textbox', {
        name: /category name/i,
      });
      await userEvent.type(categoryNameField, 'a');
      const createButton = screen.getByRole('button', { name: /create/i });
      await userEvent.click(createButton);
      await waitFor(() => {
        screen.getByText(/category must be at least 2 characters/i);
      });
    });

    test('should display the created category as a chip and display alert success message', async () => {
      render(<ManageCategory />);

      const categoryNameField = screen.getByRole('textbox', {
        name: /category name/i,
      });
      await userEvent.type(categoryNameField, 'Jackets');
      const createButton = screen.getByRole('button', { name: /create/i });
      await userEvent.click(createButton);

      await waitFor(() => {
        screen.getByRole('button', { name: /Jackets/i });
        const successAlert = screen.getByRole('alert');
        within(successAlert).getByText(/category 'Jackets' created/i);
      });
    });
  });

  describe('Search category', () => {
    test('render the categories search field', () => {
      render(<ManageCategory />);

      screen.getByRole('textbox', { name: /search/i });
    });
  });

  describe('Categories list', () => {
    test('render the categories list', () => {
      render(<ManageCategory />);

      screen.getByRole('list');
    });

    test('should display the loaded categories from the state', () => {
      const preloadedState = {
        category: {
          categories: [
            { _id: '123', name: 'Shoes', slug: 'shoes' },
            { _id: '124', name: 'Laptops', slug: 'laptops' },
          ],
        },
      };

      render(<ManageCategory />, { preloadedState });

      screen.getByRole('button', { name: 'Shoes' });
      screen.getByRole('button', { name: 'Laptops' });
    });
  });
});
