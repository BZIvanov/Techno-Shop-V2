import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CheckoutProduct } from '../../molecules';

const ProductsList = styled.div``;

const CheckoutProducts = ({ products }) => {
  return (
    <ProductsList>
      {products.map((product) => (
        <CheckoutProduct key={product.id} product={product} />
      ))}
    </ProductsList>
  );
};

const mapStateToProps = (state) => ({
  products: state.cart.products,
});

export default connect(mapStateToProps)(CheckoutProducts);
