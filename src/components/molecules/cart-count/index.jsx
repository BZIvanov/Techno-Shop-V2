import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ShoppingCartIcon } from '../../atoms';
import { toggleCartView } from '../../../store/actions/cart';

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

const CartCount = ({ toggleCartView }) => {
  return (
    <CartContent onClick={toggleCartView}>
      <ShoppingCartIcon themeColor="primary" size={32} />
      <span>0</span>
    </CartContent>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleCartView: () => dispatch(toggleCartView()),
});

export default connect(null, mapDispatchToProps)(CartCount);
