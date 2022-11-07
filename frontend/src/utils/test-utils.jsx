import React from 'react';
import { render } from '@testing-library/react';
import StoreProvider from '../providers/store/StoreProvider';
import BrowserRouterProvider from '../providers/router/BrowserRouterProvider';
import ThemeProvider from '../providers/theme/ThemeProvider';

const AllTheProviders = ({ children }) => {
  return (
    <StoreProvider>
      <BrowserRouterProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </BrowserRouterProvider>
    </StoreProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
