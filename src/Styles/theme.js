const colors = {
  mainColor: "#6BADB6",
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
  size,
  device,
};

export default theme;

// export const lightTheme = {
//   ...defaultTheme,
// };
