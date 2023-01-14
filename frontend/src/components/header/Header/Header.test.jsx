import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Routes, Route } from 'react-router-dom';
import { render, screen, waitFor } from '../../../test-utils/test-utils';
import Header from './Header';

// handler for mocking the logout request, which will be called if the logout button is clicked
const handlers = [
  rest.put(`${process.env.REACT_APP_API}/users/logout`, (req, res, ctx) => {
    return res(
      ctx.json({ success: true, user: { token: '123' } }),
      ctx.delay(100)
    );
  }),
];

const server = setupServer(...handlers);

const TestRoutes = ({ children }) => {
  return (
    <Routes>
      <Route path='/' element={children} />
      <Route path='/shop' element={children} />
      <Route path='/user/login' element={children} />
    </Routes>
  );
};

describe('Header component', () => {
  describe('Renders elements successfully', () => {
    test('renders nav links with correct colors', () => {
      render(<Header />);

      const homeLinkElement = screen.getByRole('link', { name: /home/i });
      const shopLinkElement = screen.getByRole('link', { name: /shop/i });
      const cartLinkElement = screen.getByRole('link', { name: /cart/i });
      const loginLinkElement = screen.getByRole('link', { name: /login/i });
      const registerLinkElement = screen.getByRole('link', {
        name: /register/i,
      });

      expect(homeLinkElement).toHaveStyle({ color: 'rgb(255, 255, 255)' });
      expect(shopLinkElement).toHaveStyle({ color: 'rgb(0, 0, 0)' });
      expect(cartLinkElement).toHaveStyle({ color: 'rgb(0, 0, 0)' });
      expect(loginLinkElement).toHaveStyle({ color: 'rgb(0, 0, 0)' });
      expect(registerLinkElement).toHaveStyle({ color: 'rgb(0, 0, 0)' });
    });

    test('renders search box', () => {
      render(<Header />);

      const searchField = screen.getByRole('textbox', { name: /search/i });
      expect(searchField).toHaveValue('');
    });
  });

  describe('Navigation links', () => {
    test('shop becomes current active link after clicked', async () => {
      const initialEntries = [`/`];

      render(<Header />, { initialEntries, TestRoutes });

      const homeLinkElement = screen.getByRole('link', { name: /home/i });
      const shopLinkElement = screen.getByRole('link', { name: /shop/i });
      const cartLinkElement = screen.getByRole('link', { name: /cart/i });

      await userEvent.click(shopLinkElement);

      expect(homeLinkElement).toHaveStyle({ color: 'rgb(0, 0, 0)' });
      expect(shopLinkElement).toHaveStyle({ color: 'rgb(255, 255, 255)' });
      expect(cartLinkElement).toHaveStyle({ color: 'rgb(0, 0, 0)' });
    });
  });

  describe('Logged in user navigation links', () => {
    test('render orders and logout links if user in the state', async () => {
      const preloadedState = {
        user: { token: null, user: { name: 'Iva' } },
      };

      render(<Header />, { preloadedState });

      screen.getByRole('link', { name: /orders/i });
      screen.getByRole('link', { name: /logout/i });
    });
  });

  describe('Logout user', () => {
    beforeAll(() => server.listen());

    afterEach(() => server.resetHandlers());

    afterAll(() => server.close());

    test('render non user links after user logs out', async () => {
      const preloadedState = {
        user: { token: null, user: { name: 'Iva' } },
      };

      render(<Header />, { preloadedState });

      const logoutLink = screen.getByRole('link', { name: /logout/i });

      await userEvent.click(logoutLink);

      await waitFor(() => {
        screen.getByRole('link', { name: /login/i });
      });
    });
  });
});
