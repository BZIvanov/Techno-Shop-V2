import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import SidebarMenu from '../../left-sidebar/SidebarMenu/SidebarMenu';

const NavigationLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarMenu />

      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default NavigationLayout;
