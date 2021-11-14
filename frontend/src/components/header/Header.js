import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppBar, Box, Toolbar, Grid, Typography } from '@mui/material';
import { PersonAdd, Login, ExitToApp } from '@mui/icons-material';
import { HeaderNavLink } from '../header-nav-link';
import logoImage from '../../assets/images/awesome-logo.png';
import { logoutUserAction } from '../../store/action-creators';

const links = [
  {
    toLink: 'login',
    Icon: Login,
    linkText: 'Login',
  },
  {
    toLink: 'register',
    Icon: PersonAdd,
    linkText: 'Register',
  },
];

const Header = () => {
  const dispatch = useDispatch();

  const logoutUser = (e) => {
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
          </Grid>
          <Grid item={true}>
            <Box sx={{ display: 'flex' }}>
              {links.map((link) => (
                <HeaderNavLink key={link.toLink} {...link} />
              ))}

              <Box
                component={() => (
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
                )}
              />
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
