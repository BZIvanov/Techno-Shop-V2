import { Divider, MenuList } from '@mui/material';
import { Dashboard, ListAlt, Password } from '@mui/icons-material';
import { LeftNavLink } from '../left-nav-link';

const links = [
  {
    toLink: 'dashboard',
    Icon: Dashboard,
    linkText: 'Dashboard',
  },
  {
    toLink: 'wishlist',
    Icon: ListAlt,
    linkText: 'Wishlist',
  },
  {
    toLink: 'password',
    Icon: Password,
    linkText: 'Password',
  },
];

const LeftNavMenu = () => {
  return (
    <MenuList sx={{ width: 240, maxWidth: '100%', marginRight: 2 }}>
      {links.map((link) => [
        <LeftNavLink key={link.toLink} {...link} />,
        <Divider sx={{ margin: '8px 0' }} />,
      ])}
    </MenuList>
  );
};

export default LeftNavMenu;
