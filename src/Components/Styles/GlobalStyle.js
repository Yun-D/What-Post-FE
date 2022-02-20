import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  /* text-align: center; */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

size {
  mobile: "600px";
  tablet: "900px";
  laptop: "1200px";
  desktop: "1800px";
}

button {
  width: 200px;
  outline: none;
  font-size: 20px;
  font-weight: 700;
  padding: 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: #6BADB6;
  color: white;
}

p_title {
  font-weight: bold;
  font-size: 24px;
  width: 100%;
  position: flex;
}

`;

export default GlobalStyle;
