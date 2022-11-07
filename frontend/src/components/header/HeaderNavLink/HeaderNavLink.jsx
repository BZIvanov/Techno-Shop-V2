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
          margin: '2px 8px',
          padding: '2px 8px',
          cursor: 'pointer',
        }}
      >
        <Icon />
        <Typography variant='caption'>{linkText}</Typography>
      </Box>
    </NavLink>
  );
};

export default HeaderNavLink;
