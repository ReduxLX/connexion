import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
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
    font-size: 20px;
  }

  ul {
    list-style-type: none;
  }

  a{
    color: black
  }

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
