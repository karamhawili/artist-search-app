import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    /*small devices (phones, 600px and down) */
    @media only screen and (max-width: 600px) {
      font-size: 12px;
    }
  }

  #root {
    height: 100%;
  }
`;

export default GlobalStyles;
