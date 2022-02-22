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
  font-size: ${theme.textSize.buttonText};
  font-weight: 700;
  padding: 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: ${theme.colors.mainColor};
  color: white;
}

input {
  font-size: ${theme.textSize.placeholder};
  width: 100%;
  height: 40px;
  padding: 2%;
  margin-bottom: 10px;
}

//////////////// 기타 스타일
p_title {
  font-weight: bold;
  font-size: ${theme.textSize.postTitle};
  width: 100%;
  position: flex;
}

`;

export default GlobalStyle;
