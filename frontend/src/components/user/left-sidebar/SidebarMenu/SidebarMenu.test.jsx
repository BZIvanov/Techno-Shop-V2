import { render, screen, within } from '../../../../utils/test-utils';
import SidebarMenu from './SidebarMenu';

describe('SidebarMenu component', () => {
  describe('Renders elements successfully', () => {
    test('renders correct menu items for user with role user', () => {
      const preloadedState = {
        user: { token: '123', user: { name: 'Iva', role: 'user' } },
      };

      render(<SidebarMenu />, { preloadedState });

      const dashboardMenuitem = screen.getByRole('menuitem', {
        name: /dashboard/i,
      });
      within(dashboardMenuitem).getByText(/^dashboard$/i);

      const wishlistMenuitem = screen.getByRole('menuitem', {
        name: /wishlist/i,
      });
      within(wishlistMenuitem).getByText(/^wishlist$/i);

      const passwordMenuitem = screen.getByRole('menuitem', {
        name: /password/i,
      });
      within(passwordMenuitem).getByText(/^password$/i);
    });

    test('renders correct menu items for user with role admin', () => {
      const preloadedState = {
        user: { token: '123', user: { name: 'Iva', role: 'admin' } },
      };

      render(<SidebarMenu />, { preloadedState });

      const dashboardMenuitem = screen.getByRole('menuitem', {
        name: /dashboard/i,
      });
      within(dashboardMenuitem).getByText(/^dashboard$/i);

      const categoriesMenuitem = screen.getByRole('menuitem', {
        name: /manage categories/i,
      });
      within(categoriesMenuitem).getByText(/^manage categories$/i);

      const subcategoriesMenuitem = screen.getByRole('menuitem', {
        name: /manage subcategories/i,
      });
      within(subcategoriesMenuitem).getByText(/^manage subcategories$/i);

      const productsMenuitem = screen.getByRole('menuitem', {
        name: /manage products/i,
      });
      within(productsMenuitem).getByText(/^manage products$/i);

      const productsListMenuitem = screen.getByRole('menuitem', {
        name: /products list/i,
      });
      within(productsListMenuitem).getByText(/^products list$/i);

      const passwordMenuitem = screen.getByRole('menuitem', {
        name: /password/i,
      });
      within(passwordMenuitem).getByText(/^password$/i);
    });
  });
});
