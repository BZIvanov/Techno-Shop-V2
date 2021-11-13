import { NavLink } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import { orange } from '@mui/material/colors';

const HeaderNavLink = ({ toLink, Icon, linkText }) => {
  const theme = useTheme();

  return (
    <Box
      component={() => (
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? orange[200] : theme.palette.secondary.dark,
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
      )}
    />
  );
};

export default HeaderNavLink;
