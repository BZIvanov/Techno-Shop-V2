import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  Typography,
  DeleteForeverIcon,
  PlusIcon,
  MinusIcon,
} from '../../atoms';
import {
  addCartProduct,
  removeCartProduct,
  deleteCartProduct,
} from '../../../store/actions/cart';

const ProductRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr 1fr 2fr 1fr;
  grid-column-gap: 1rem;
  justify-items: start;
  align-items: center;
  margin: 1rem 7rem;
  border-bottom: 1px solid black;
  & img {
    width: 70px;
  }
  & svg:hover {
    cursor: pointer;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin: 1rem;
    & > * {
      grid-column-gap: 0.2rem;
    }
    & img {
      width: 45px;
    }
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  & p {
    margin: 0 0.2rem;
  }
`;

const CheckoutProduct = ({
  product,
  addCartProduct,
  removeCartProduct,
  deleteCartProduct,
}) => {
  const { name, price, imageUrl, quantity } = product;
  return (
    <ProductRow>
      <img src={imageUrl} alt="product" />
      <Typography variant="subtitle1">{name}</Typography>
      <QuantityControls>
        <MinusIcon
          size={20}
          color="secondary"
          onClick={() => removeCartProduct(product)}
        />
        <Typography variant="subtitle1">{quantity}</Typography>
        <PlusIcon
          size={20}
          color="secondary"
          onClick={() => addCartProduct(product)}
        />
      </QuantityControls>
      <Typography variant="subtitle1">{price.toFixed(2)} lv.</Typography>
      <DeleteForeverIcon onClick={() => deleteCartProduct(product)} size={28} />
    </ProductRow>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addCartProduct: (product) => dispatch(addCartProduct(product)),
  removeCartProduct: (product) => dispatch(removeCartProduct(product)),
  deleteCartProduct: (product) => dispatch(deleteCartProduct(product)),
});

export default connect(null, mapDispatchToProps)(CheckoutProduct);
