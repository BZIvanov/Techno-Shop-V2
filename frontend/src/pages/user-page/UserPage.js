import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { LeftNavMenu } from '../../components/left-nav-menu';

const UserPage = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <LeftNavMenu />
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserPage;
