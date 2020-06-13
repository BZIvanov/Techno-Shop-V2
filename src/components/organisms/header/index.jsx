import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { NavLinks } from '../../molecules';
import { Link, TabletMobileComboIcon } from '../../atoms';

const Navigation = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${({ theme }) => theme.breakpoints.lg}px;
  margin: 0 auto;
  padding: 0.5rem 7rem;
`;

const Header = () => {
  return (
    <Navigation>
      <Link to="/">
        <TabletMobileComboIcon themeColor="primary" size={48} />
      </Link>
      <NavLinks />
    </Navigation>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.user,
});

export default connect(mapStateToProps)(Header);
