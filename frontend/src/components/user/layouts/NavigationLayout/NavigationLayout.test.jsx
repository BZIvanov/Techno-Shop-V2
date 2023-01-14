import { render, screen, within } from '../../../../test-utils/test-utils';
import NavigationLayout from './NavigationLayout';

describe('NavigationLayout component', () => {
  describe('Renders elements successfully', () => {
    test('renders layout with left navigation for user with role user', () => {
      const preloadedState = {
        user: { token: '123', user: { name: 'Iva', role: 'user' } },
      };

      render(<NavigationLayout />, { preloadedState });

      const menuitem = screen.getByRole('menuitem', {
        name: /orders/i,
      });

      within(menuitem).getByText(/orders/i);
    });
  });
});
