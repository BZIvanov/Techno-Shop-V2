import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CartCount } from '../';
import { NavLink } from '../../atoms';

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & a {
    margin: 0 1rem;
  }
  & div {
    margin-left: 1rem;
  }
  & div:hover {
    cursor: pointer;
  }
`;

const NavLinks = ({ isAuthenticated }) => {
  return (
    <Navigation>
      {!isAuthenticated ? (
        <>
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <CartCount />
        </>
      ) : (
        <>
          <NavLink to="/login">login</NavLink>
          <NavLink to="/register">register</NavLink>
        </>
      )}
    </Navigation>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.user,
});

export default connect(mapStateToProps)(NavLinks);
