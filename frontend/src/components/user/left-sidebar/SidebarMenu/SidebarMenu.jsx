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
import SidebarMenuLink from '../SidebarMenuLink/SidebarMenuLink';

const userLinks = [
  {
    toLink: 'orders',
    icon: <Dashboard fontSize='small' />,
    linkText: 'Orders',
  },
  {
    toLink: 'wishlist',
    icon: <ListAlt fontSize='small' />,
    linkText: 'Wishlist',
  },
  {
    toLink: 'password',
    icon: <Password fontSize='small' />,
    linkText: 'Password',
  },
];

const adminLinks = [
  {
    toLink: 'orders',
    icon: <Dashboard fontSize='small' />,
    linkText: 'Orders',
  },
  {
    toLink: 'category',
    icon: <Category fontSize='small' />,
    linkText: 'Manage categories',
  },
  {
    toLink: 'subcategory',
    icon: <AutoAwesomeMosaic fontSize='small' />,
    linkText: 'Manage subcategories',
  },
  {
    toLink: 'product',
    icon: <Gradient fontSize='small' />,
    linkText: 'Manage products',
  },
  {
    toLink: 'products-list',
    icon: <PhoneAndroid fontSize='small' />,
    linkText: 'Products List',
  },
  {
    toLink: 'coupon',
    icon: <Discount fontSize='small' />,
    linkText: 'Coupon',
  },
  {
    toLink: 'password',
    icon: <Password fontSize='small' />,
    linkText: 'Password',
  },
];

const SidebarMenu = () => {
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

export default SidebarMenu;
