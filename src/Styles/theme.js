const colors = {
  mainColor: "#6BADB6",
  boxColor: "#EFF6F6",
  boxColor_light: "#F1F5F5",
  shadowColor: "#467379",

  lightGray: "#bbbbbb",
  peacock: "#1491a1", //mainColor 텍스트 버전
  peacockGray: "#225251",
};

const textSize = {
  placeholder: "1rem",
  postTitle: "1.45rem", //p태그 등 텍스트 타이틀
  postContents: "1rem", //본문 텍스트
  subText: "1.1rem",
  buttonText: "1.15rem", //버튼에 들어가는 텍스트
};

const size = {
  mobile: "575px", //세로모드: max575, 가로모드: max767
  mobile_landscape: "767px",
  tablet: "990px", //max로 사용
  laptop: "1200px",
  desktop: "1800px", //큰 화면 데스크탑: min1200
  radius: "8px",
  boxShadow:
    "0 6px 10px rgba(0, 0, 0, 0.1), 0 3px 5px rgba(226, 235, 238, 0.5)",
  boxLightShadow: "0 3px 3px rgba(0, 0, 0, 0.1)",
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
