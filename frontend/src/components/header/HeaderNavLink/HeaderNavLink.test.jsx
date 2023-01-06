import { render, screen } from '../../../test-utils/test-utils';
import HeaderNavLink from './HeaderNavLink';
import { Home } from '../../mui/Icons';

describe('HeaderNavLink component', () => {
  describe('Renders link element successfully', () => {
    test('renders the link with correct text and icon', () => {
      render(<HeaderNavLink toLink='/' linkText='Home' icon={<Home />} />);

      screen.getByRole('link', { name: /home/i });
      screen.getByTestId('HomeIcon');
    });
  });

  describe('Link route', () => {
    test('renders white text color link if matches the route', () => {
      render(<HeaderNavLink toLink='/' linkText='Home' icon={<Home />} />);

      const homeLinkElement = screen.getByRole('link', { name: /home/i });

      expect(homeLinkElement).toHaveStyle({ color: 'rgb(255, 255, 255)' });
    });

    test('renders black text color link if does not match the route', () => {
      render(
        <HeaderNavLink toLink='/products' linkText='Home' icon={<Home />} />
      );

      const homeLinkElement = screen.getByRole('link', { name: /home/i });

      expect(homeLinkElement).toHaveStyle({ color: 'rgb(0, 0, 0)' });
    });
  });
});
