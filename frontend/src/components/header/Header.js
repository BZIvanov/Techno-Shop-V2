import { AppBar, Box, Toolbar, Grid, Button } from '@mui/material';
import logoImage from '../../assets/images/bookit_logo.png';

const Header = () => {
  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <Grid container={true} justifyContent='space-between'>
            <Grid item={true}>
              <Box
                component='img'
                sx={{
                  width: { xs: '100px', sm: '140px' },
                  cursor: 'pointer',
                }}
                alt='app logo'
                src={logoImage}
              />
            </Grid>
            <Grid item={true}>
              <Button variant='contained'>Login</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
