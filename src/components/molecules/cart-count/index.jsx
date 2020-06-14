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
    left: 12px;
    font-size: 0.9rem;
  }
`;

const CartCount = ({ count, toggleCartView }) => {
  return (
    <CartContent onClick={toggleCartView}>
      <ShoppingCartIcon themeColor="primary" size={32} />
      <span>{count}</span>
    </CartContent>
  );
};

const mapStateToProps = ({ cart: { products } }) => ({
  count: products.reduce((acc, product) => acc + product.quantity, 0),
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartView: () => dispatch(toggleCartView()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartCount);
