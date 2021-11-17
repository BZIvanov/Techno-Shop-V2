import { useSelector } from 'react-redux';
import { Divider, MenuList } from '@mui/material';
import { Dashboard, ListAlt, Password, Category } from '@mui/icons-material';
import { LeftNavLink } from '../left-nav-link';

const userLinks = [
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

const adminLinks = [
  {
    toLink: 'dashboard',
    Icon: Dashboard,
    linkText: 'Dashboard',
  },
  {
    toLink: 'category',
    Icon: Category,
    linkText: 'Manage categories',
  },
  {
    toLink: 'password',
    Icon: Password,
    linkText: 'Password',
  },
];

const LeftNavMenu = () => {
  const { user } = useSelector((state) => state.user);

  const links = user.role === 'admin' ? adminLinks : userLinks;

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
