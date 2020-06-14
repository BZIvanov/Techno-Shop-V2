import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const ProductsList = styled.div``;

const CheckoutProducts = ({ products }) => {
  return <ProductsList>Works</ProductsList>;
};

const mapStateToProps = (state) => ({
  products: state.cart.products,
});

export default connect(mapStateToProps)(CheckoutProducts);
