import axios from "axios";
import keys from "./api_key";

//네이버 영화 검색 API
const naverMovieSearch = axios.create({
  //baseURL: "https://openapi.naver.com",
  headers: {
    "X-Naver-Client-Id": `${keys.NAVER_CLIENT_ID}`,
    "X-Naver-Client-Secret": `${keys.NAVER_CLIENT_SECRET}`,
  },
});

export const movieSearch = (params) => {
  return naverMovieSearch.get("/v1/search/movie.json", { params });
};

//카카오 책 검색 API
export const bookSearch = (params) => {
  return axios.get("/v3/search/book", {
    params,
    headers: { Authorization: `KakaoAK ${keys.KAKAO_REST_API_KEY}` },
  });
};

//인터파크 베스트셀러 API
export const getBestSeller = (params) => {
  return axios.get("/api/bestSeller.api", {
    params,
  });
};

//영화진흥위원회 주간 박스오피스 API
export const getBoxOffice = (params) => {
  return axios.get("/searchWeeklyBoxOfficeList.json", { params });
};

//KMDb 영화 db API (포스터 얻어오는 용도)
export const getMoviePoster = (params) => {
  return axios.get("/search_json2.jsp", { params });
};
