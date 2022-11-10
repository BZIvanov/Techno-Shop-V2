import { render, screen } from '../../../utils/test-utils';
import Header from './Header';

describe('Header component', () => {
  test('renders the home nav link successfully', () => {
    render(<Header />);

    const homeLinkElement = screen.getByText(/home/i);
    expect(homeLinkElement).toBeInTheDocument();
  });
});
