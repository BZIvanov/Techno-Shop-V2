import { BrowserRouter } from 'react-router-dom';

const BrowserRouterProvider = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default BrowserRouterProvider;
