import React from 'react';
import { connect } from 'react-redux';
import { CheckoutProducts } from '../';
import { CheckoutHeader } from '../../molecules';
import { AppWidth, Typography } from '../../atoms';

const CheckoutList = ({ totalPrice }) => {
  return (
    <AppWidth>
      <CheckoutHeader />
      <CheckoutProducts />
      <Typography variant="h3">TOTAL: {totalPrice.toFixed(2)}lv.</Typography>
    </AppWidth>
  );
};

const mapStateToProps = ({ cart: { products } }) => ({
  totalPrice: products.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  ),
});

export default connect(mapStateToProps)(CheckoutList);
