import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../utils/test-utils';
import Header from './Header';

describe('Header component', () => {
  describe('Renders elements successfully', () => {
    test('renders nav links with correct colors', () => {
      render(<Header />);

      const homeLinkElement = screen.getByRole('link', { name: /home/i });
      const shopLinkElement = screen.getByRole('link', { name: /shop/i });
      const loginLinkElement = screen.getByRole('link', { name: /login/i });
      const registerLinkElement = screen.getByRole('link', {
        name: /register/i,
      });

      expect(homeLinkElement).toHaveStyle({ color: 'rgb(255, 255, 255)' });
      expect(shopLinkElement).toHaveStyle({ color: 'rgb(0, 0, 0)' });
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
      render(<Header />);

      const homeLinkElement = screen.getByRole('link', { name: /home/i });
      const shopLinkElement = screen.getByRole('link', { name: /shop/i });

      await userEvent.click(shopLinkElement);

      expect(homeLinkElement).toHaveStyle({ color: 'rgb(0, 0, 0)' });
      expect(shopLinkElement).toHaveStyle({ color: 'rgb(255, 255, 255)' });
    });
  });
});
