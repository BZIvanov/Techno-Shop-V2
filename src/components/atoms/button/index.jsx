import React from 'react';
import styled from 'styled-components';

const ButtonCss = styled.button`
  color: ${(props) => props.theme.palette.primary};
  background-color: ${(props) => props.theme.palette.secondary};
  cursor: pointer;
  transition: background-color 1s ease;
  font-size: 1.5rem;
  border: none;
  border-radius: 1.5rem;
  padding: 0.4rem 2.2rem;
  outline: none;
  &:hover {
    background-color: ${(props) => props.theme.palette.secondary};
  }
`;

const Button = ({ children, ...rest }) => {
  return <ButtonCss {...rest}>{children}</ButtonCss>;
};

export default Button;
