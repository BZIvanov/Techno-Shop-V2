import styled from 'styled-components';
import { TabletMobileCombo } from '@styled-icons/entypo/TabletMobileCombo';
import { ShoppingCart } from '@styled-icons/fa-solid/ShoppingCart';
import { DeleteForever } from '@styled-icons/material/DeleteForever';
import { Plus } from '@styled-icons/entypo/Plus';
import { Minus } from '@styled-icons/boxicons-regular/Minus';

export const TabletMobileComboIcon = styled(TabletMobileCombo)`
  color: ${({ theme, color }) =>
    color ? theme.palette[color] : theme.palette.primary};
`;

export const ShoppingCartIcon = styled(ShoppingCart)`
  color: ${({ theme, color }) =>
    color ? theme.palette[color] : theme.palette.primary};
`;

export const DeleteForeverIcon = styled(DeleteForever)`
  color: ${({ theme, color }) =>
    color ? theme.palette[color] : theme.palette.primary};
`;

export const PlusIcon = styled(Plus)`
  color: ${({ theme, color }) =>
    color ? theme.palette[color] : theme.palette.primary};
`;

export const MinusIcon = styled(Minus)`
  color: ${({ theme, color }) =>
    color ? theme.palette[color] : theme.palette.primary};
`;
