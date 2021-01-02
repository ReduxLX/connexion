import { createGlobalStyle } from "styled-components";
import Raleway from "./res/fonts/Raleway-Regular.ttf";
// import RalewayLight from "./res/fonts/Raleway-Light.ttf";
import RalewayBold from "./res/fonts/Raleway-Bold.ttf";
import Helvetica from "./res/fonts/Helvetica.ttf";
import HelveticaLight from "./res/fonts/Helvetica-Light.ttf";
// import HelveticaBold from "./res/fonts/Helvetica-Bold.ttf";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Raleway';
    src: local('Raleway'), url(${Raleway}) format('truetype');
  } 
  @font-face {
    font-family: 'Raleway';
    font-weight: 700;
    src: local('Raleway'), url(${RalewayBold}) format('truetype');
  } 
  @font-face {
    font-family: 'Helvetica';
    src: local('Helvetica'), url(${Helvetica}) format('truetype');
  } 
  @font-face {
    font-family: 'Helvetica';
    font-weight: 300;
    src: local('Helvetica'), url(${HelveticaLight}) format('truetype');
  }
  * {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica', sans-serif;
    text-decoration: none;
    box-sizing: border-box;
    font-size: 16px;
  }
  
  h1{
    margin: 0;
    font-size: 24px;
  }

  ul {
    list-style-type: none;
  }

  /* a{
    color: black
  } */

  button{
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }

  input{
    border: none;
    outline: none;
  }
`;

export default GlobalStyle;
