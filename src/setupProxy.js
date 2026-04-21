const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/v1",
    createProxyMiddleware({
      target: "https://openapi.naver.com",
      changeOrigin: true,
    })
  );
  app.use(
    "/v3",
    createProxyMiddleware({
      target: "https://dapi.kakao.com",
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
  app.use(
    "/search_json2.jsp",
    createProxyMiddleware({
      target: "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api",
      changeOrigin: true,
    })
  );
};
