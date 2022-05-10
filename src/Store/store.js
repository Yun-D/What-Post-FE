import { configureStore, createSlice } from "@reduxjs/toolkit";

//책 검색 관련 슬라이스
export const bookSearchSlice = createSlice({
  name: "bookSearch",
  initialState: {
    search: "",
    query: "",
    books: [],
    page: 1,
    isEnd: true,
  },
  reducers: {
    setSearch: (state, action) => {
      //검색어 저장
      state.search = action.payload;
    },
    setQuery: (state, action) => {
      //검색어 저장
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
    isEndPage: (state, action) => {
      //검색 결과 현재 페이지가 마지막인지 여부
      state.isEnd = action.payload;
    },
  },
});

export const { setSearch, setQuery, setBooks, nextPage, isEndPage } =
  bookSearchSlice.actions;

export default configureStore({
  reducer: {
    bookSearch: bookSearchSlice.reducer,
  },
});
