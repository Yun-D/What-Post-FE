import axios from "axios";
import keys from "./api_key";

//카카오 책 검색 API
const kakaoBookSearch = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${keys.REST_API_KEY}`,
  },
});

export const bookSearch = (params) => {
  return kakaoBookSearch.get("/v3/search/book", {
    params,
  });
};
