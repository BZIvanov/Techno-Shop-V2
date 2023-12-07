import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';

const BrowserRouterProvider = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

BrowserRouterProvider.propTypes = {
  children: PropTypes.node,
};

export default BrowserRouterProvider;
