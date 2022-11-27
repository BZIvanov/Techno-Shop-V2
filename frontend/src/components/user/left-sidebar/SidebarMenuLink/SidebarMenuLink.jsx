import { NavLink } from 'react-router-dom';
import { MenuItem, ListItemText, ListItemIcon, useTheme } from '@mui/material';

const SidebarMenuLink = ({ toLink, Icon, linkText }) => {
  const theme = useTheme();

  return (
    <NavLink
      style={({ isActive }) => {
        return {
          color: isActive
            ? theme.palette.primary.main
            : theme.palette.common.black,
          textDecoration: 'none',
        };
      }}
      to={toLink}
    >
      <MenuItem>
        <ListItemIcon sx={{ color: 'inherit' }}>
          <Icon fontSize='small' />
        </ListItemIcon>
        <ListItemText>{linkText}</ListItemText>
      </MenuItem>
    </NavLink>
  );
};

export default SidebarMenuLink;
