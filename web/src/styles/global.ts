import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  *{
    margin:0;
    padding:0;
    box-sizing: border-box;
    outline:0;
    text-decoration:none;
  }

  body{
    background:#312E38;
    color:#fff;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button{
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1,h2,h3,h4,h5,h6, strong{
    font-weight: 500;
  }

  button{
    cursor: pointer;
  }
  input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px inset;
}
`;
