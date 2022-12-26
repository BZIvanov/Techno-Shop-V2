import { useState } from 'react';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from '@mui/material';
import { ExpandLess, ExpandMore, AttachMoney } from '../../../mui/Icons';

const FilterListItem = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ width: '100%' }}>
      <ListItemButton onClick={() => setOpen((prevValue) => !prevValue)}>
        <ListItemIcon sx={{ minWidth: 0 }}>
          <AttachMoney fontSize='small' />
        </ListItemIcon>
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
