import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  :root {
    --gray-100: #fefefe;
    --gray-200: #ddd;
    --gray-300: #ededed;
    --gray-400: #9e9e9e;

    --progress: #337ea9;
    --complete: #448361;

    --success: #1034a6;
    --error: #d21616;

    --success-bg: #c1e3f5;
    --error-bg: #ffddd9;

    --manager-1: #FFDCFF;
    --manager-2: #FFFF8C;
    --manager-3: #B9FFFF;
    --manager-4: #AECDFF;
    --manager-5: #D9EFB9;
    --manager-6: #FFB9FC;

    --white: #fff;
    --black: #252525;
  }

  * {
    margin: 0;
    padding: 0;
  }

  h1 {
    font-size: 16px;
  }
  ul,
  li {
    list-style: none;
  }
  textarea,
  keygen,
  select,
  button {
    all: unset;
    font-family: inherit;
    font-size: inherit;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  
  //커서 pointer
  & .cursor-pointer {
    cursor: pointer;
  }
  
  input, textarea {
    -webkit-user-select: text;
    -khtml-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
  
`;

export default GlobalStyle;
