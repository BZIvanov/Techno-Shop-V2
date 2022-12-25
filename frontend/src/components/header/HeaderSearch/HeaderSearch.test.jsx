import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router-dom';
import { render, screen } from '../../../test-utils/test-utils';
import HeaderSearch from './HeaderSearch';

const TestRoutes = ({ children }) => {
  return (
    <Routes>
      <Route path='/' element={children} />
      <Route
        path='/shop'
        element={
          <div>
            <h1>Shop page</h1>
          </div>
        }
      />
    </Routes>
  );
};

describe('HeaderSearch component', () => {
  test('renders the text input and search icon button', () => {
    render(<HeaderSearch />);

    screen.getByRole('textbox', { name: /search/i });
    screen.getByRole('button', { name: /product search/i });
  });

  test('renders the text input with the initial store value', () => {
    const preloadedState = {
      productsFilter: { text: 'laptop' },
    };

    render(<HeaderSearch />, { preloadedState });

    const searchField = screen.getByRole('textbox', { name: /search/i });
    expect(searchField).toHaveValue('laptop');
  });

  test('should navigate to home page after the search form is submitted', async () => {
    render(<HeaderSearch />, { TestRoutes });

    const user = userEvent.setup();

    const searchField = screen.getByRole('textbox', { name: /search/i });
    await user.type(searchField, 'Hello');
    const searchButton = screen.getByRole('button', {
      name: /product search/i,
    });
    await user.click(searchButton);

    await screen.findByText('Shop page');
  });
});
