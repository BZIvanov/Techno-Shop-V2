import { useState } from 'react';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import { ExpandLess, ExpandMore, AttachMoney } from '../../../mui/Icons';

const FilterListItem = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <ListItemButton onClick={() => setOpen((prevValue) => !prevValue)}>
        <ListItemIcon sx={{ minWidth: 0 }}>
          <AttachMoney fontSize='small' />
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse
        in={open}
        timeout='auto'
        unmountOnExit={true}
        sx={{ padding: '0 32px' }}
      >
        {children}
      </Collapse>
    </>
  );
};

export default FilterListItem;
