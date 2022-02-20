import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
* {
  /* text-align: center; */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

button {
  //width: ${(props) => (props.longBtn ? "100%" : "200px")};
  width: 200px;
  outline: none;
  font-size: 20px;
  font-weight: 700;
  padding: 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: ${theme.colors.mainColor};
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
