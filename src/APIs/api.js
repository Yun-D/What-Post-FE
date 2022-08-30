import axios from "axios";
import keys from "./api_key";

//카카오 책 검색 API
const kakaoBookSearch = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${keys.KAKAO_REST_API_KEY}`,
  },
});

//네이버 영화 검색 API
const naverMovieSearch = axios.create({
  baseURL: "https://openapi.naver.com/v1/search/movie.json",
  headers: {
    "X-Naver-Client-Id": `${keys.NAVER_CLIENT_ID}`,
    "X-Naver-Client-Secret": `${keys.NAVER_CLIENT_SECRET}`,
  },
});

export const bookSearch = (params) => {
  return kakaoBookSearch.get("/v3/search/book", {
    params,
  });
};

export const movieSearch = (params) => {
  return naverMovieSearch.get(params);
};
