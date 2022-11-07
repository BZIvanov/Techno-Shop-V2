import { NavLink } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';

const HeaderNavLink = ({ toLink, Icon, linkText }) => {
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
          padding: '8px',
          cursor: 'pointer',
        }}
      >
        <Icon fontSize='small' />
        <Typography>{linkText}</Typography>
      </Box>
    </NavLink>
  );
};

export default HeaderNavLink;
