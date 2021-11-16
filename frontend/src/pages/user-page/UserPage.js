import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { LeftNavMenu } from '../../components/left-nav-menu';

const UserPage = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <LeftNavMenu />
      <Outlet />
    </Box>
  );
};

export default UserPage;
