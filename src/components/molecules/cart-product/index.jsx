import React from 'react';
import styled from 'styled-components';
import { Typography } from '../../atoms';

const Product = styled.div`
  display: flex;
  margin: 1rem 0;
  & img {
    width: 50px;
    margin-right: 0.5rem;
  }
`;

const CartProduct = ({ product: { shortName, price, quantity, imageUrl } }) => {
  return (
    <Product>
      <img src={imageUrl} alt="product" />
      <div>
        <Typography variant="subtitle3">{shortName}</Typography>
        <Typography variant="subtitle3">
          {quantity} x {price.toFixed(2)}lv.
        </Typography>
      </div>
    </Product>
  );
};

export default CartProduct;
