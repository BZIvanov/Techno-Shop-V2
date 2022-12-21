import React from 'react';
import { render } from '@testing-library/react';
import StoreProvider from '../providers/store/StoreProvider';
import BrowserRouterProvider from '../providers/router/BrowserRouterProvider';
import ThemeProvider from '../providers/theme/ThemeProvider';
import AppTestRoutes from '../providers/router/AppTestRoutes';

// ui is the rendered component
const customRender = (ui, options) => {
  const {
    preloadedState,
    initialEntries = ['/'],
    TestRoutes = AppTestRoutes,
    renderOptions,
  } = options || {};

  const AllTheProviders = ({ children }) => {
    return (
      <StoreProvider preloadedState={preloadedState}>
        <BrowserRouterProvider initialEntries={initialEntries}>
          <ThemeProvider>
            <TestRoutes>
              {/* children is the rendered component, provide it to the test routes so it can used as route component */}
              {children}
            </TestRoutes>
          </ThemeProvider>
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
