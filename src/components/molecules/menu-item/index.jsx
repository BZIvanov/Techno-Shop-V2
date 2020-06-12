import React from 'react';
import styled from 'styled-components';
import { Typography } from '../../atoms';

const ItemCss = styled.article`
  background-image: url(${({ imageURL }) => imageURL});
  background-position: center;
  background-size: cover;
  min-width: 30%;
  height: ${({ size }) => (size === 'large' ? '24rem' : '15rem')};
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 0.5rem 1rem;
`;

const ContentCss = styled.div`
  height: 5.5rem;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 0.5rem;
  & *:first-child {
    margin-bottom: 0.5rem;
  }
  & *:nth-child(2) {
    text-transform: uppercase;
  }
`;

const MenuItem = (props) => {
  return (
    <ItemCss {...props}>
      <ContentCss>
        <Typography variant="h4">{props.title}</Typography>
        <Typography variant="subtitle1">Shop now</Typography>
      </ContentCss>
    </ItemCss>
  );
};

export default MenuItem;
