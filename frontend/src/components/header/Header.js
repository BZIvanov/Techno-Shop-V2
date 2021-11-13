import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, Grid } from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { HeaderNavLink } from '../header-nav-link';
import logoImage from '../../assets/images/awesome-logo.png';

const links = [
  {
    toLink: 'login',
    Icon: LoginIcon,
    linkText: 'Login',
  },
  {
    toLink: 'register',
    Icon: PersonAddIcon,
    linkText: 'Register',
  },
];

const Header = () => {
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
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
