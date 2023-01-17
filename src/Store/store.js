import { configureStore, createSlice } from "@reduxjs/toolkit";

//책 검색 관련 슬라이스
export const bookSearchSlice = createSlice({
  name: "bookSearch",
  initialState: {
    query: "",
    books: [],
    page: 1, //결과 페이지 번호
    isEnd: true,
  },
  reducers: {
    setQuery: (state, action) => {
      //검색어 저장(검색 쿼리로 들어갈 값)
      state.query = action.payload;
    },
    setBooks: (state, action) => {
      //책 검색 결과 기록 저장
      state.books = action.payload;
    },
    nextPage: (state) => {
      //더보기 버튼 눌러 다음페이지로
      state.page += 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    isEndPage: (state, action) => {
      //검색 결과 현재 페이지가 마지막인지 여부
      state.isEnd = action.payload;
    },
  },
});

export const movieSearchSlice = createSlice({
  name: "movieSearch",
  initialState: {
    query: "",
    items: [], //title, link, image, subtitle, pubDate, director, actor, userRating 포함
    start: 1, //결과 페이지 번호
  },
  reducers: {
    m_setQuery: (state, action) => {
      //검색어 저장(검색 쿼리로 들어갈 값)
      state.query = action.payload;
    },
    m_setItems: (state, action) => {
      //영화 검색 결과 기록 저장
      state.items = action.payload;
    },
    m_nextPage: (state) => {
      //더보기 버튼 눌러 다음페이지로
      state.start += 10;
    },
    m_setPage: (state, action) => {
      state.start = action.payload;
    },
  },
});

export const { setSearch, setQuery, setBooks, nextPage, setPage, isEndPage } =
  bookSearchSlice.actions;

export const { m_setQuery, m_setItems, m_nextPage, m_setPage } =
  movieSearchSlice.actions;

export default configureStore({
  reducer: {
    bookSearch: bookSearchSlice.reducer,
    movieSearch: movieSearchSlice.reducer,
  },
});
