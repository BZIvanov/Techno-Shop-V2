import { NavLink } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';

const HeaderNavLink = ({ toLink, icon, linkText }) => {
  const theme = useTheme();

  return (
    <NavLink
      style={({ isActive }) => {
        return {
          color: isActive
            ? theme.palette.common.white
            : theme.palette.common.black,
          textDecoration: 'none',
        };
      }}
      to={toLink}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2px 16px',
          cursor: 'pointer',
        }}
      >
        {icon}
        <Typography variant='caption'>{linkText}</Typography>
      </Box>
    </NavLink>
  );
};

export default HeaderNavLink;
