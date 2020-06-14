import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { SmallButton } from '../../atoms';

const EnhancedButton = styled(SmallButton)`
  margin-top: auto;
`;

const CartBox = styled.div`
  position: absolute;
  width: 240px;
  height: 240px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: ${({ theme }) => theme.palette.offWhite};
  top: 50px;
  right: 20px;
`;

const CartDropdown = () => {
  return ReactDOM.createPortal(
    <CartBox>
      <EnhancedButton>Go to Checkout</EnhancedButton>
    </CartBox>,
    document.querySelector('#cart')
  );
};

export default CartDropdown;
