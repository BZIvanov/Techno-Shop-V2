import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '../../../test-utils/test-utils';
import ManageProduct from './ManageProduct';

const handlers = [
  rest.get(`${process.env.REACT_APP_API}/categories`, (req, res, ctx) => {
    return res(ctx.json({ success: true, categories: [] }), ctx.delay(100));
  }),
];

const server = setupServer(...handlers);

describe('ManageProduct component', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  describe('Product form title', () => {
    test('renders the form title', () => {
      render(<ManageProduct />);

      const productFormTitle = screen.getByRole('heading', {
        name: /product form/i,
      });

      expect(productFormTitle).toHaveStyle({ 'font-weight': 400 });
    });
  });

  describe('Product title field', () => {
    test('renders the product title field', () => {
      render(<ManageProduct />);

      screen.getByRole('textbox', { name: /title/i });
    });

    test('click once submit with empty title will focus the title, clicking submit second time will display an error message', async () => {
      render(<ManageProduct />);

      const user = userEvent.setup();

      const titleField = screen.getByRole('textbox', { name: /title/i });

      const createButton = await screen.findByRole('button', {
        name: /create/i,
      });

      // waitFor the button click, because initially it will be disabled, because of the loading state
      await waitFor(async () => {
        await user.click(createButton);
      });

      expect(titleField).toHaveFocus();

      const noErrorText = screen.queryByText(/title is required/i);
      expect(noErrorText).not.toBeInTheDocument();

      await user.click(createButton);

      const errorText = screen.queryByText(/title is required/i);
      expect(errorText).toBeInTheDocument();
      expect(errorText).toHaveStyle({ color: 'rgb(211, 47, 47)' });
    });
  });
});
