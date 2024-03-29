import keys from "APIs/api_key";

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/v1",
    createProxyMiddleware({
      target: "https://openapi.naver.com",
      // pathRewrite: {
      //   //naver_api로 시작되는 url을 자동 인식 -> 프록시 처리, /naver_api는 ""로 대체됨
      //   "^/naver_api": "",
      // },
      changeOrigin: true,
    })
  );
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://book.interpark.com",
      changeOrigin: true,
    })
  );
  app.use(
    "/searchWeeklyBoxOfficeList.json",
    createProxyMiddleware({
      target: "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice",
      changeOrigin: true,
    })
  );

  // app.use(
  //   "/user",
  //   createProxyMiddleware({
  //     target: `${keys.SERVER_URL}`,
  //     changeOrigin: true,
  //   })
  // );
};
