import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Box, Toolbar, Grid, Typography } from '@mui/material';
import {
  PersonAdd,
  Login,
  ExitToApp,
  Dashboard,
  AddBusiness,
} from '@mui/icons-material';
import { HeaderNavLink } from '../header-nav-link';
import logoImage from '../../assets/images/awesome-logo.png';
import { logoutUserAction } from '../../store/action-creators';

const noUserLinks = [
  {
    toLink: '/login',
    Icon: Login,
    linkText: 'Login',
  },
  {
    toLink: '/register',
    Icon: PersonAdd,
    linkText: 'Register',
  },
];

const userLinks = [
  {
    toLink: '/user/dashboard',
    Icon: Dashboard,
    linkText: 'Dashboard',
  },
];

const Header = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logoutUserAction());
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Grid
          container={true}
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid item={true}>
            <Box sx={{ display: 'flex' }}>
              <Link to='/'>
                <Box
                  component='img'
                  sx={{
                    width: { xs: '80px', sm: '100px', md: '140px' },
                    cursor: 'pointer',
                  }}
                  alt='app logo'
                  src={logoImage}
                />
              </Link>
              <HeaderNavLink
                toLink='/shop'
                linkText='Shop'
                Icon={AddBusiness}
              />
            </Box>
          </Grid>
          <Grid item={true}>
            <Box sx={{ display: 'flex' }}>
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
                    onClick={logoutUser}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '8px',
                      cursor: 'pointer',
                      color: (theme) => theme.palette.secondary.dark,
                    }}
                  >
                    <ExitToApp fontSize='small' />
                    <Typography>Logout</Typography>
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
