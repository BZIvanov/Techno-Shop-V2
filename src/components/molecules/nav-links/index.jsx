import React from 'react';
import styled from 'styled-components';
import { NavLink } from '../../atoms';

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  & a {
    padding: 0 1rem;
  }
`;

const NavLinks = () => {
  return (
    <Navigation>
      <NavLink to="/" exact>
        Home
      </NavLink>
      <NavLink to="/shop">Shop</NavLink>
    </Navigation>
  );
};

export default NavLinks;
