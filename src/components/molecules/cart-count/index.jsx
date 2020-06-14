import React from 'react';
import styled from 'styled-components';
import { ShoppingCartIcon } from '../../atoms';

const CartContent = styled.div`
  position: relative;
  & span {
    color: ${({ theme }) => theme.palette.quaternary};
    position: absolute;
    top: 3px;
    left: 15px;
    font-size: 0.9rem;
  }
`;

const CartCount = (props) => {
  return (
    <CartContent>
      <ShoppingCartIcon themeColor="primary" size={32} />
      <span>0</span>
    </CartContent>
  );
};

export default CartCount;
