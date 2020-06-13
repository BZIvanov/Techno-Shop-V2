import React from 'react';
import { NavLink as NL } from 'react-router-dom';
import styled from 'styled-components';

const LinkCss = styled(NL)`
  color: ${({ theme }) => theme.palette.primary};
  border-bottom: 1px solid transparent;
  &.active {
    color: ${({ theme }) => theme.palette.secondary};
    border-bottom: 1px solid ${({ theme }) => theme.palette.secondary};
  }
`;

const NavLink = ({ children, ...rest }) => {
  return <LinkCss {...rest}>{children}</LinkCss>;
};

export default NavLink;
