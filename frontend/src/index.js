import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import StoreProvider from './providers/store/StoreProvider';
import BrowserRouterProvider from './providers/router/BrowserRouterProvider';
import ThemeProvider from './providers/theme/ThemeProvider';
import App from './App';

ReactDOM.render(
  <StoreProvider>
    <BrowserRouterProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouterProvider>
  </StoreProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
