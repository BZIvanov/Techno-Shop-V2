import styled from 'styled-components';
import { TabletMobileCombo } from '@styled-icons/entypo/TabletMobileCombo';
import { ShoppingCart } from '@styled-icons/fa-solid/ShoppingCart';

export const TabletMobileComboIcon = styled(TabletMobileCombo)`
  color: ${({ theme, themeColor, color }) =>
    themeColor ? theme.palette[themeColor] : color};
`;

export const ShoppingCartIcon = styled(ShoppingCart)`
  color: ${({ theme, themeColor, color }) =>
    themeColor ? theme.palette[themeColor] : color};
`;
