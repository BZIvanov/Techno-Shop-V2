import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 16px;
  }
  *, *:before, *:after {
    box-sizing: border-box;
  }
  body {
    padding: 0;
    margin: 0;
    font-family: 'Nunito', sans-serif;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    font-family: inherit;
  }
  h1, h2, h3, h4, h5, h6, p, ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style-type: none;
  }
`;

export default GlobalStyles;
