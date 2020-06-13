import React from 'react';
import styled from 'styled-components';
import { Typography, BackgroundImageHeight } from '../../atoms';

const Item = styled.div`
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

const CollectionItem = (props) => {
  return (
    <Item>
      <BackgroundImageHeight {...props} />
      <InfoBox>
        <Typography variant="subtitle1">{props.name}</Typography>
        <Typography variant="subtitle1">{props.price.toFixed(2)}</Typography>
      </InfoBox>
    </Item>
  );
};

export default CollectionItem;
