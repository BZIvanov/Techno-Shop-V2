import React from 'react';
import { connect } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutProducts, CheckoutForm } from '../';
import { CheckoutHeader } from '../../molecules';
import { AppWidth, Typography } from '../../atoms';

const stripePromise = loadStripe(
  'pk_test_51GujnyCZFv8tfDD71yeHESG1gByN4TbsrStYrLmUSwZr4KiO6qe1IdTOUvF96Z667jFn0ameJRbvJIvBcvmabcya00K7BZ0lPN'
);

const CheckoutList = ({ totalPrice }) => {
  return (
    <AppWidth>
      <CheckoutHeader />
      <CheckoutProducts />
      <Typography variant="h3">TOTAL: {totalPrice.toFixed(2)}lv.</Typography>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
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
