import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

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

HeaderNavLink.propTypes = {
  toLink: PropTypes.string,
  icon: PropTypes.element,
  linkText: PropTypes.string,
};

export default HeaderNavLink;
