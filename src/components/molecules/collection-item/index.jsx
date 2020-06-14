import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Typography, BackgroundImageHeight, PrimaryButton } from '../../atoms';
import { addCartProduct } from '../../../store/actions/cart';

const Item = styled.div`
  position: relative;
  width: 22%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  margin: 0.5rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    width: 30%;
    max-width: 350px;
    height: 330px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 100%;
    max-width: 290px;
    height: 300px;
  }
  & button {
    position: absolute;
    opacity: 0.8;
    bottom: 25%;
    display: none;
  }
  &:hover {
    opacity: 0.8;
  }
  &:hover button {
    opacity: 0.9;
    display: flex;
  }
`;

const InfoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  min-height: 4rem;
  margin-top: 0.5rem;
  & p:first-child {
    margin-right: 0.5rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    min-height: 2rem;
  }
`;

const CollectionItem = ({ product, addCartProduct }) => {
  const { name, price, imageUrl } = product;

  return (
    <Item>
      <BackgroundImageHeight imageUrl={imageUrl} />
      <InfoBox>
        <Typography variant="subtitle1">{name}</Typography>
        <Typography variant="subtitle1">{price.toFixed(2)}</Typography>
      </InfoBox>
      <PrimaryButton onClick={() => addCartProduct(product)}>
        Add to Cart
      </PrimaryButton>
    </Item>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addCartProduct: (product) => dispatch(addCartProduct(product)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
