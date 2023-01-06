import { Fragment } from 'react';
import { useSelector, useDispatch } from '../../../store/hooks';
import { AppBar, Box, Toolbar, Grid, Typography, Badge } from '@mui/material';
import {
  Home,
  PersonAdd,
  Login,
  ExitToApp,
  Dashboard,
  AddBusiness,
  AddShoppingCart,
} from '../../mui/Icons';
import HeaderNavLink from '../HeaderNavLink/HeaderNavLink';
import { HeaderSearch } from '../HeaderSearch';
import { logoutUserAction } from '../../../store/features/user/userSlice';

const noUserLinks = [
  {
    toLink: '/login',
    icon: <Login />,
    linkText: 'Login',
  },
  {
    toLink: '/register',
    icon: <PersonAdd />,
    linkText: 'Register',
  },
];

const userLinks = [
  {
    toLink: '/user/dashboard',
    icon: <Dashboard />,
    linkText: 'Dashboard',
  },
];

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logoutUserAction());
  };

  return (
    <Fragment>
      <AppBar position='fixed'>
        <Toolbar>
          <Grid
            container={true}
            justifyContent='space-between'
            alignItems='center'
          >
            <Grid item={true}>
              <Box sx={{ display: 'flex' }}>
                <HeaderNavLink toLink='/' linkText='Home' icon={<Home />} />
                <HeaderNavLink
                  toLink='/shop'
                  linkText='Shop'
                  icon={<AddBusiness />}
                />
                <HeaderNavLink
                  toLink='/cart'
                  linkText='Cart'
                  icon={
                    <Badge
                      badgeContent={Object.keys(cart).length}
                      color='secondary'
                    >
                      <AddShoppingCart />
                    </Badge>
                  }
                />
              </Box>
            </Grid>

            <Grid item={true}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HeaderSearch />

                {!user ? (
                  noUserLinks.map((link) => (
                    <HeaderNavLink key={link.toLink} {...link} />
                  ))
                ) : (
                  <>
                    {userLinks.map((link) => {
                      const userLink = { ...link };
                      if (user.role === 'admin') {
                        userLink.toLink = userLink.toLink.replace(
                          'user',
                          'admin'
                        );
                      }

                      return (
                        <HeaderNavLink key={userLink.toLink} {...userLink} />
                      );
                    })}
                    <Box
                      role='link' // used for the tests
                      onClick={logoutUser}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '2px 16px',
                        cursor: 'pointer',
                        color: (theme) => theme.palette.common.black,
                      }}
                    >
                      <ExitToApp />
                      <Typography variant='caption'>Logout</Typography>
                    </Box>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* Render second toolbar so the page content won't hide behind the first ttolbar  */}
      <Toolbar />
    </Fragment>
  );
};

export default Header;
