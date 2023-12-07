import PropTypes from 'prop-types';

import BrowserRouterProvider from './router/BrowserRouterProvider';
import MuiThemeProvider from './theme/MuiThemeProvider';

const AppProviders = ({ children }) => {
  return (
    <BrowserRouterProvider>
      <MuiThemeProvider>{children}</MuiThemeProvider>
    </BrowserRouterProvider>
  );
};

AppProviders.propTypes = {
  children: PropTypes.node,
};

export default AppProviders;
