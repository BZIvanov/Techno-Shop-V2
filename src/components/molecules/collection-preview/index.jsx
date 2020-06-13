import React from 'react';
import styled from 'styled-components';
import { CollectionItem } from '../../molecules';
import { Typography, ItemsContainer } from '../../atoms';

const CollectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > *:first-child {
    margin-left: 5rem;
    @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
      margin-left: 3rem;
      text-align: center;
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
      margin-left: 1rem;
    }
  }
`;

const CollectionPreview = (props) => {
  return (
    <CollectionContainer>
      <Typography variant="h1">{props.title}</Typography>
      <ItemsContainer>
        {props.items
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <CollectionItem key={product.id} {...product} />
          ))}
      </ItemsContainer>
    </CollectionContainer>
  );
};

export default CollectionPreview;
