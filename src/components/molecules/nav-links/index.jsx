import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from '../../atoms';

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  & a {
    padding: 0 1rem;
  }
`;

const NavLinks = ({ isAuthenticated }) => {
  return (
    <Navigation>
      {isAuthenticated ? (
        <>
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/shop">Shop</NavLink>
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
