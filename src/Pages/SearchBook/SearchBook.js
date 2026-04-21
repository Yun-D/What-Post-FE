import { React, useLayoutEffect, useState } from "react";
import { bookSearch } from "../../APIs/api";
import BookList from "../../Components/layout/BookList";
import BookSearchFunc from "Utils/BookSearchFunc";

import styled from "styled-components";
import { SmallBtn } from "../../Components/etc/Buttons";
import FloatingButton from "Components/etc/FloatingButton";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  setBooks,
  nextPage,
  isEndPage,
  setPage,
} from "../../Store/store";

const SearchBook = () => {
  const { query } = useParams();
  const [search, setSearch] = useState(query);

  //저장소에서 책검색 데이터 읽어오기
  const queryData = useSelector((state) => state.bookSearch.query);
  const bookList = useSelector((state) => state.bookSearch.books);
  const pageNum = useSelector((state) => state.bookSearch.page);
  const isEnd = useSelector((state) => state.bookSearch.isEnd);
  const dispatch = useDispatch(); //작업 전달하기

  useLayoutEffect(() => {
    //if (search === queryData) {
    bookSearchHandler(search, pageNum);
    //}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData, pageNum]);

  //책 검색
  const bookSearchHandler = async (query, page) => {
    const params = {
      query: query, //검색어
      sort: "accuracy", //accuracy: 정확도, latest: 발간일 순
      page: page,
      size: 10, //1~50. 출력할 검색 결과 수
    };

    const { data } = await bookSearch(params); //책 검색 api 호출
    if (page === 1) {
      dispatch(setBooks(data.documents));
    } else if (page >= 2) {
      dispatch(setBooks(bookList.concat(data.documents)));
    }

    dispatch(isEndPage(data.meta.is_end)); //다음 페이지가 있으면 false
  };
  /////////////////////////////////책 검색용 함수들 닫음

  return (
    <div className="contents_div">
      <BookSearchFunc
        setQuery={setQuery}
        setPage={setPage}
        setBooks={setBooks}
        setSearch={setSearch}
        search={search}
        dispatch={dispatch}
        onChange={(searchQuery) => setSearch(...searchQuery)}
      />

      {bookList.map((book, idx) => (
        <BookList
          key={idx}
          thumbnail={book.thumbnail}
          title={book.title}
          authors={book.authors}
          datetime={book.datetime.substr(0, 4)}
          publisher={book.publisher}
          contents={book.contents}
          tolink={"/search_book/info"}
        />
      ))}
      <br />

      <FlexZone>
        {!isEnd && (
          <SmallBtn
            onClick={() => {
              dispatch(nextPage());
            }}
          >
            더보기
          </SmallBtn>
        )}
      </FlexZone>

      <FloatingButton />
    </div>
  );
};
const FlexZone = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export default SearchBook;
