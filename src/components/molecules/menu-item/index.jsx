import React from 'react';
import styled from 'styled-components';
import { Typography, BackgroundImageBox } from '../../atoms';

const ItemCss = styled.article`
  min-width: 30%;
  height: ${({ size }) => (size === 'large' ? '24rem' : '15rem')};
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 0.5rem 1rem;
  transform: scale(1);
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
  & > *:first-child:hover {
    transform: scale(1.1);
    transition: transform 5s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  }
`;

const ContentCss = styled.div`
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 0.5rem;
  background-color: ${({ theme }) => theme.palette.offWhite};
  position: absolute;
  opacity: 0.7;
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
      <BackgroundImageBox {...props} />
      <ContentCss>
        <Typography variant="h4">{props.title}</Typography>
        <Typography variant="subtitle1">Shop now</Typography>
      </ContentCss>
    </ItemCss>
  );
};

export default MenuItem;
