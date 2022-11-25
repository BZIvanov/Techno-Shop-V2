import React from 'react';
import { render } from '@testing-library/react';
import StoreProvider from '../providers/store/StoreProvider';
import BrowserRouterProvider from '../providers/router/BrowserRouterProvider';
import ThemeProvider from '../providers/theme/ThemeProvider';

// ui is the rendered component
const customRender = (ui, options) => {
  const { preloadedState, renderOptions } = options || {};

  const AllTheProviders = ({ children }) => {
    return (
      <StoreProvider preloadedState={preloadedState}>
        <BrowserRouterProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </BrowserRouterProvider>
      </StoreProvider>
    );
  };

  // return also the methods provided by render
  return render(ui, { wrapper: AllTheProviders, ...renderOptions });
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
