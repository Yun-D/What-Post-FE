import { React, useState, useLayoutEffect } from "react";
import { bookSearch } from "../../APIs/api";
import Item from "../../Components/layout/ListItem";

import styled from "styled-components";
import { SearchBar } from "../../Components/etc/SearchBar";
import { SmallBtn } from "../../Components/etc/Buttons";

import { useDispatch, useSelector } from "react-redux";
import {
  setSearch,
  setQuery,
  setBooks,
  setPage,
  nextPage,
  isEndPage,
} from "../../Store/store";

const SearchBook = () => {
  //const navigateState = useLocation();

  //저장소에서 책검색 데이터 읽어오기
  const searchItem = useSelector((state) => state.bookSearch.search);
  const queryData = useSelector((state) => state.bookSearch.query);
  const bookList = useSelector((state) => state.bookSearch.books);
  const pageNum = useSelector((state) => state.bookSearch.page);
  const isEnd = useSelector((state) => state.bookSearch.isEnd);
  const dispatch = useDispatch(); //작업 전달하기

  useLayoutEffect(() => {
    //componentDidMount/Update/WillUnmount 일 경우 실행
    //(query state가 업데이트되면 api 호출)
    if (searchItem.length > 1) {
      bookSearchHandler(queryData, pageNum);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData, pageNum]);

  //책 검색

  const onClickSearch = () => {
    dispatch(setQuery(searchItem));
  };

  //엔터를 눌렀을 때 쿼리를 검색어로 교체하는 함수
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      onClickSearch();
    }
  };

  //text 검색어가 바뀔 때 호출되는 함수.
  const onTextUpdate = (e) => {
    dispatch(setSearch(e.target.value));
  };

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
      <Div>
        <SearchBar
          value={searchItem}
          onKeyDown={onEnter}
          onChange={onTextUpdate}
          onClick={onClickSearch}
        />
      </Div>

      {bookList.map((book, idx) => (
        <Item
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
    </div>
  );
};
const FlexZone = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const Div = styled.div`
  margin: 2% 0 2%;
`;

export default SearchBook;
