import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CartDropdown } from '../';
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

const Header = ({ hidden }) => {
  return (
    <Navigation>
      <Link to="/">
        <TabletMobileComboIcon themeColor="primary" size={48} />
      </Link>
      <NavLinks />
      {hidden ? null : <CartDropdown />}
    </Navigation>
  );
};

const mapStateToProps = ({ cart: { hidden } }) => ({
  hidden,
});

export default connect(mapStateToProps)(Header);
