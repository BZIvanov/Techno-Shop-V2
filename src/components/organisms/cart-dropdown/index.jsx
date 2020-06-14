import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { CartProduct } from '../../molecules';
import { SmallButton, Typography } from '../../atoms';
import { toggleCartView } from '../../../store/actions/cart';

const EnhancedButton = styled(SmallButton)`
  margin-top: auto;
`;

const CartBox = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: ${({ theme }) => theme.palette.offWhite};
  top: 50px;
  right: 5%;
`;

const CartProducts = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin: 1rem 0 2rem 0;
  min-height: 200px;
  & > p {
    text-align: center;
  }
`;

const CartDropdown = ({ products, toggleCartView, history }) => {
  const handleCheckoutClick = () => {
    toggleCartView();
    history.push('/checkout');
  };

  return ReactDOM.createPortal(
    <CartBox>
      <CartProducts>
        {products.length ? (
          products.map((product) => (
            <CartProduct key={product.id} product={product} />
          ))
        ) : (
          <Typography variant="subtitle2">Your cart is empty</Typography>
        )}
      </CartProducts>
      <EnhancedButton onClick={handleCheckoutClick}>
        Go to Checkout
      </EnhancedButton>
    </CartBox>,
    document.querySelector('#cart')
  );
};

const mapStateToProps = ({ cart: { products } }) => ({
  products,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartView: () => dispatch(toggleCartView()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CartDropdown));
