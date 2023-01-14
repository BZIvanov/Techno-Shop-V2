import { render, screen, within } from '../../../../test-utils/test-utils';
import SidebarMenuLink from './SidebarMenuLink';
import { Dashboard } from '../../../mui/Icons';

describe('SidebarMenuLink component', () => {
  describe('Renders elements successfully', () => {
    test('renders menu link with correct text and black color for not matching current route', () => {
      render(
        <SidebarMenuLink
          toLink='/wishlist'
          icon={<Dashboard />}
          linkText='Orders'
        />
      );

      const menuLink = screen.getByRole('link', { name: 'Orders' });
      expect(menuLink).toHaveStyle({ color: 'rgb(0, 0, 0)' });

      const menuitem = screen.getByRole('menuitem', {
        name: 'Orders',
      });
      const menuItemText = within(menuitem).getByText('Orders');
      expect(menuItemText).toHaveStyle({ 'font-weight': 400 });
    });

    test('renders menu link with blue color, when matching current route', () => {
      render(
        <SidebarMenuLink toLink='/' icon={<Dashboard />} linkText='Orders' />
      );

      const menuLink = screen.getByRole('link', { name: 'Orders' });
      expect(menuLink).toHaveStyle({ color: 'rgb(25, 118, 210)' });
    });
  });
});
