import { render, screen, within } from '../../../../utils/test-utils';
import SidebarMenuLink from './SidebarMenuLink';
import { Dashboard } from '../../../mui/Icons';

describe('SidebarMenuLink component', () => {
  describe('Renders elements successfully', () => {
    test('renders menu link with correct text and black color for not matching current route', () => {
      render(
        <SidebarMenuLink
          toLink='/wishlist'
          Icon={Dashboard}
          linkText='Dashboard'
        />
      );

      const menuLink = screen.getByRole('link', { name: /dashboard/i });
      expect(menuLink).toHaveStyle({ color: 'rgb(0, 0, 0)' });

      const menuitem = screen.getByRole('menuitem', {
        name: /dashboard/i,
      });
      const menuItemText = within(menuitem).getByText(/^dashboard$/i);
      expect(menuItemText).toHaveStyle({ 'font-weight': 400 });
    });

    test('renders menu link with blue color, when matching current route', () => {
      render(
        <SidebarMenuLink toLink='/' Icon={Dashboard} linkText='Dashboard' />
      );

      const menuLink = screen.getByRole('link', { name: /dashboard/i });
      expect(menuLink).toHaveStyle({ color: 'rgb(25, 118, 210)' });
    });
  });
});
