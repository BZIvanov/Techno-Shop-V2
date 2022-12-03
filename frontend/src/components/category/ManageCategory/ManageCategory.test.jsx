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
  rest.put(`${process.env.REACT_APP_API}/categories/123`, (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        category: { _id: '123', name: 'Boots', slug: 'boots' },
      }),
      ctx.delay(100)
    );
  }),
  rest.delete(
    `${process.env.REACT_APP_API}/categories/123`,
    (req, res, ctx) => {
      return res(ctx.json(), ctx.delay(100));
    }
  ),
];

const server = setupServer(...handlers);

describe('ManageCategory component', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

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
    test('render the form field and the buttons', () => {
      render(<ManageCategory />);

      screen.getByRole('textbox', { name: /category name/i });
      screen.getByRole('button', { name: /reset/i });
      screen.getByRole('button', { name: /create/i });
    });

    test('should display error message if category name is too short', async () => {
      render(<ManageCategory />);

      const user = userEvent.setup();

      let categoryNameField;
      await waitFor(async () => {
        categoryNameField = screen.getByRole('textbox', {
          name: /category name/i,
        });
      });

      await waitFor(async () => {
        await user.type(categoryNameField, 'a');
      });

      const createButton = screen.getByRole('button', { name: /create/i });
      await user.click(createButton);

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

  describe('Update category', () => {
    test('should display the updated category name', async () => {
      server.use(
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
        })
      );

      server.use(
        rest.put(
          `${process.env.REACT_APP_API}/categories/123`,
          (req, res, ctx) => {
            return res(
              ctx.json({
                success: true,
                category: { _id: '123', name: 'Boots', slug: 'boots' },
              }),
              ctx.delay(100)
            );
          }
        )
      );

      render(<ManageCategory />);

      const user = userEvent.setup();

      let categoryChip;
      await waitFor(() => {
        categoryChip = screen.getByRole('button', { name: 'Shoes' });
      });
      await user.click(categoryChip);

      const categoryNameField = screen.getByRole('textbox', {
        name: /category name/i,
      });
      await userEvent.type(categoryNameField, 'Boots');

      const updateButton = screen.getByRole('button', { name: /update/i });
      await userEvent.click(updateButton);

      await waitFor(() => {
        screen.getByRole('button', { name: 'Boots' });
        const successAlert = screen.getByRole('alert');
        within(successAlert).getByText(/category 'Boots' updated/i);
      });
    });
  });

  describe('Remove category', () => {
    test('remove category dialog is displayed after remove chip button is clicked', async () => {
      const preloadedState = {
        category: {
          categories: [{ _id: '123', name: 'Shoes', slug: 'shoes' }],
        },
      };

      render(<ManageCategory />, { preloadedState });

      const user = userEvent.setup();

      const categoryChip = screen.getByRole('button', { name: 'Shoes' });
      const xButton = within(categoryChip).getByTestId('CancelIcon');
      await user.click(xButton);

      await waitFor(() => {
        screen.getByText(/are you sure you want to delete this category\?/i);
      });
    });

    test('removed category should not be displayed', async () => {
      server.use(
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
        })
      );

      render(<ManageCategory />);

      const user = userEvent.setup();

      let categoryChip;
      await waitFor(() => {
        categoryChip = screen.getByRole('button', { name: 'Shoes' });
      });
      const xButton = within(categoryChip).getByTestId('CancelIcon');
      await user.click(xButton);

      let confirmRemoveButton;
      await waitFor(() => {
        confirmRemoveButton = screen.getByRole('button', { name: /continue/i });
      });
      await user.click(confirmRemoveButton);

      await waitFor(() => {
        screen.getByRole('button', { name: 'Laptops' });
        const removedCategoryChip = screen.queryByRole('button', {
          name: 'Shoes',
        });
        expect(removedCategoryChip).not.toBeInTheDocument();

        const successAlert = screen.getByRole('alert');
        within(successAlert).getByText(/category deleted/i);
      });
    });
  });

  describe('Search category', () => {
    test('render the categories search field', () => {
      render(<ManageCategory />);

      screen.getByRole('textbox', { name: /search/i });
    });

    test('should display only the searched categories', async () => {
      // with use method we can override the above get categories handler, which is returning empty list
      server.use(
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
        })
      );

      render(<ManageCategory />);

      const searchField = screen.getByRole('textbox', { name: /search/i });
      await userEvent.type(searchField, 'sho');

      await waitFor(() => {
        screen.getByRole('button', { name: 'Shoes' });
        const laptopsChip = screen.queryByRole('button', { name: 'Laptops' });
        expect(laptopsChip).not.toBeInTheDocument();
      });
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
