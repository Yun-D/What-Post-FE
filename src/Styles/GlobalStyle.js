import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  padding-top: 80px;
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
  border-radius: 8px;
  border: 0.5px solid gray;
}

/* div ::-webkit-scrollbar {
    display: none;
} */

//////////////// 기타 스타일
/////////////// css
.p_title {
  font-weight: bold;
  font-size: ${theme.textSize.postTitle};
  width: 100%;
  position: flex;
}

.contents_div {
  margin: auto 5%;
  padding: 2% 0;
}
.rowDirection {
  //컴포넌트 가로정렬
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
.wrapper {
  height: auto;
  min-height: calc(100vh - 280px);
  //padding-bottom: 100px;
}

.subText {
  font-size: ${theme.textSize.subText};
  color: gray;
}

/* ////////// 반응형 /////////// */
@media only screen and (max-width: ${theme.size.mobile}) {
  .contents_div {
    margin: 0;
  }
}
@media only screen and (min-width: ${theme.size.laptop}) {
  .contents_div {
    margin: auto 10%;
  }
}

`;

export default GlobalStyle;
