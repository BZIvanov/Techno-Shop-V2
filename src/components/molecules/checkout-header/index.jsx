import React from 'react';
import styled from 'styled-components';
import { Typography } from '../../atoms';

const Headers = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 1fr;
  grid-column-gap: 1rem;
  margin: 1rem 7rem;
  border-bottom: 2px solid black;
  & > *:not(:last-child) {
    border-right: 1px solid black;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin: 1rem;
    & > * {
      grid-column-gap: 0.2rem;
    }
  }
`;

const HEADERS = ['Product', 'Description', 'Quantity', 'Price', 'Remove'];

const CheckoutHeader = () => {
  const renderHeaders = HEADERS.map((header) => (
    <Typography key={header} variant="h6">
      {header}
    </Typography>
  ));
  return <Headers>{renderHeaders}</Headers>;
};

export default CheckoutHeader;
