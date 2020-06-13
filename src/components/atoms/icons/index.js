import styled from 'styled-components';
import { TabletMobileCombo } from '@styled-icons/entypo/TabletMobileCombo';

export const TabletMobileComboIcon = styled(TabletMobileCombo)`
  color: ${(props) =>
    props.themeColor ? props.theme.palette[props.themeColor] : props.color};
`;
