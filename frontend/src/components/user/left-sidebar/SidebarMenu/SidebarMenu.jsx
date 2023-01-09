import { useSelector } from '../../../../store/hooks';
import { Divider, MenuList } from '@mui/material';
import {
  Dashboard,
  ListAlt,
  Password,
  Category,
  AutoAwesomeMosaic,
  Gradient,
  PhoneAndroid,
  Discount,
} from '../../../mui/Icons';
import { SidebarMenuLink } from '../SidebarMenuLink';

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
    toLink: 'subcategory',
    Icon: AutoAwesomeMosaic,
    linkText: 'Manage subcategories',
  },
  {
    toLink: 'product',
    Icon: Gradient,
    linkText: 'Manage products',
  },
  {
    toLink: 'products-list',
    Icon: PhoneAndroid,
    linkText: 'Products List',
  },
  {
    toLink: 'coupon',
    Icon: Discount,
    linkText: 'Coupon',
  },
  {
    toLink: 'password',
    Icon: Password,
    linkText: 'Password',
  },
];

const NavMenu = () => {
  const user = useSelector((state) => state.user.user);

  const links = user.role === 'admin' ? adminLinks : userLinks;

  return (
    <MenuList sx={{ width: 240, maxWidth: '100%', marginRight: 2 }}>
      {links.map((link) => [
        <SidebarMenuLink key={link.toLink} {...link} />,
        <Divider sx={{ margin: '8px 0' }} />,
      ])}
    </MenuList>
  );
};

export default NavMenu;
