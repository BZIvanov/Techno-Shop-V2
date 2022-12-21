import { BrowserRouter, MemoryRouter } from 'react-router-dom';

const BrowserRouterProvider = ({ children, initialEntries }) => {
  // we will use MemoryRouter for the tests, which will be the case, where initialEntries is provided
  if (initialEntries) {
    return (
      <MemoryRouter initialEntries={initialEntries} initialIndex={0}>
        {children}
      </MemoryRouter>
    );
  }

  return <BrowserRouter>{children}</BrowserRouter>;
};

export default BrowserRouterProvider;
