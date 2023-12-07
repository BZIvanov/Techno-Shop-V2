import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import HeaderNavLink from '../HeaderNavLink/HeaderNavLink';
import { AddBusinessIcon, HomeIcon } from '../../mui/Icons';

const Header = () => {
  return (
    <>
      <AppBar position='fixed'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters={true}>
            <Grid
              container={true}
              justifyContent='space-between'
              alignItems='center'
            >
              <Grid item={true}>
                <Box sx={{ display: 'flex' }}>
                  <HeaderNavLink
                    toLink='/'
                    linkText='Home'
                    icon={<HomeIcon />}
                  />
                  <HeaderNavLink
                    toLink='/shop'
                    linkText='Shop'
                    icon={<AddBusinessIcon />}
                  />
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Render second toolbar so the page content won't hide behind the first ttolbar  */}
      <Toolbar />
    </>
  );
};

export default Header;
