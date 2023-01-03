import { useState } from 'react';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '../../../mui/Icons';

const FilterListItem = ({ title, icon, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ width: '100%', marginTop: '5px' }}>
      <ListItemButton onClick={() => setOpen((prevValue) => !prevValue)}>
        <ListItemIcon sx={{ minWidth: 0, marginRight: 1 }}>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout='auto' unmountOnExit={false}>
        {children}
      </Collapse>
    </Box>
  );
};

export default FilterListItem;
