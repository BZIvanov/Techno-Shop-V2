import { NavLink } from 'react-router-dom';
import { MenuItem, ListItemText, ListItemIcon, useTheme } from '@mui/material';
import { orange } from '@mui/material/colors';

const LeftNavLink = ({ toLink, Icon, linkText }) => {
  const theme = useTheme();

  return (
    <NavLink
      style={({ isActive }) => {
        return {
          color: isActive ? orange[200] : theme.palette.secondary.dark,
          textDecoration: 'none',
        };
      }}
      to={toLink}
    >
      <MenuItem>
        <ListItemIcon>
          <Icon fontSize='small' />
        </ListItemIcon>
        <ListItemText>{linkText}</ListItemText>
      </MenuItem>
    </NavLink>
  );
};

export default LeftNavLink;
