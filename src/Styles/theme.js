const colors = {
  mainColor: "#6BADB6",
  boxColor: "#EFF6F6",
  shadowColor: "#467379",

  lightGray: "#bbbbbb",
  peacock: "#1491a1", //mainColor 텍스트 버전
};

const textSize = {
  placeholder: "16px",
  postTitle: "24px", //p태그 등 텍스트 타이틀
  postContents: "16px", //본문 텍스트
  buttonText: "20px", //버튼에 들어가는 텍스트
};

const size = {
  mobile: "600px",
  tablet: "900px",
  laptop: "1200px",
  desktop: "1800px",
};

const device = {
  mobile: `@media only screen and (max-width: ${size.mobile})`,
  tablet: `@media only screen and (max-width: ${size.tablet})`,
  desktop: `@media only screen and (max-width: ${size.desktop})`,
};

const theme = {
  colors,
  textSize,
  size,
  device,
};

export default theme;

// export const lightTheme = {
//   ...defaultTheme,
// };
