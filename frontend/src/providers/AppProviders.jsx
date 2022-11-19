import StoreProvider from './store/StoreProvider';
import BrowserRouterProvider from './router/BrowserRouterProvider';
import ThemeProvider from './theme/ThemeProvider';

const AppProviders = ({ children }) => {
  return (
    <StoreProvider>
      <BrowserRouterProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </BrowserRouterProvider>
    </StoreProvider>
  );
};

export default AppProviders;
