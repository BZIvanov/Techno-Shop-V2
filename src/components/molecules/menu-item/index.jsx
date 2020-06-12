import React from 'react';
import styled from 'styled-components';
import { Typography } from '../../atoms';

const ItemCss = styled.article`
  min-width: 30%;
  height: 240px;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 0.5rem 1rem;
`;

const ContentCss = styled.div`
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 0.5rem;
  & h4 {
    margin-bottom: 0.5rem;
  }
`;

const MenuItem = () => {
  return (
    <ItemCss>
      <ContentCss>
        <Typography variant="h4">Mobile Phones</Typography>
        <Typography variant="subtitle1">Shop now</Typography>
      </ContentCss>
    </ItemCss>
  );
};

export default MenuItem;
