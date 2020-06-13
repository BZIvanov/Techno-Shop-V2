import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Typography, BackgroundImageBox } from '../../atoms';

const ItemCss = styled.article`
  min-width: 30%;
  height: ${({ size }) => (size === 'large' ? '24rem' : '15rem')};
  flex: 1 1 auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 0.5rem 1rem;
  transform: scale(1);
  overflow: hidden;
  &:hover {
    cursor: pointer;
    & > *:first-child {
      transform: scale(1.1);
      transition: transform 5s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    min-width: 45%;
    height: 15rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    min-width: 100%;
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
  console.log(props);
  const handleNavigate = () => {
    props.history.push(`${props.match.url}${props.linkURL}`);
  };

  return (
    <ItemCss {...props} onClick={handleNavigate}>
      <BackgroundImageBox {...props} />
      <ContentCss>
        <Typography variant="h4">{props.title}</Typography>
        <Typography variant="subtitle1">Shop now</Typography>
      </ContentCss>
    </ItemCss>
  );
};

export default withRouter(MenuItem);
