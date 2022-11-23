import { render, screen } from '../../../utils/test-utils';
import HeaderSearch from './HeaderSearch';

describe('HeaderSearch component', () => {
  describe('Renders form elements successfully', () => {
    test('renders the text input and search icon button', () => {
      render(<HeaderSearch />);

      screen.getByRole('textbox', { name: /search/i });
      screen.getByRole('button', { name: /product search/i });
    });
  });

  describe('Search field state', () => {
    test('renders the text input with the initial store value', () => {
      const preloadedState = {
        productsFilter: { text: 'laptop' },
      };

      render(<HeaderSearch />, { preloadedState });

      const searchField = screen.getByRole('textbox', { name: /search/i });
      expect(searchField).toHaveValue('laptop');
    });
  });
});
