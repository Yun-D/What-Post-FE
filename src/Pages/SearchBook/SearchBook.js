import { React, useState, useLayoutEffect } from "react";
import { bookSearch } from "../../APIs/api";
import Item from "../../Components/layout/ListItem";

import styled from "styled-components";
import { useLocation } from "react-router-dom";

const SearchBook = () => {
  const navigateState = useLocation();

  //책검색 데이터셋, 검색어, 쿼리 state 생성
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1); //페이지 수. 기본 값은 1
  const [isEnd, setIsEnd] = useState(true);
  const [search, setSearch] = useState(navigateState.state);
  const [query, setQuery] = useState(navigateState.state); //책 검색 쿼리

  useLayoutEffect(() => {
    //componentDidMount/Update/WillUnmount 일 경우 실행
    //(query state가 업데이트되면 api 호출)
    if (query.length > 1) {
      bookSearchHandler(query, page);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

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
      setBooks(data.documents);
    } else if (page >= 2) {
      setBooks(books.concat(data.documents));
    }

    setIsEnd(data.meta.is_end); //다음 페이지가 있으면 false
  };

  const onClickSearch = () => {
    setQuery(search);
  };

  //엔터를 눌렀을 때 쿼리를 검색어로 교체하는 함수
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      onClickSearch();
    }
  };

  //text 검색어가 바뀔 때 호출되는 함수.
  const onTextUpdate = (e) => {
    setSearch(e.target.value);
  };
  /////////////////////////////////책 검색용 함수들 닫음

  return (
    <Container className="contents_div">
      <Div className="rowDirection">
        <Input
          placeholder="검색어를 입력하세요."
          name="query"
          value={search}
          onKeyDown={onEnter}
          onChange={onTextUpdate}
        />
        <button onClick={onClickSearch}>검색</button>
      </Div>

      {books.map((book, idx) => (
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

      {!isEnd && (
        <ButtonSmall
          onClick={() => {
            setPage(page + 1);
          }}
        >
          더보기
        </ButtonSmall>
      )}
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const Div = styled.div`
  margin: 2% 0 2%;
`;

const Input = styled.input`
  margin-bottom: 0;
  margin-right: 2%;
`;
const ButtonSmall = styled.button`
  //[검색] 글로벌 스타일 button 확장
  flex: 1;
  width: 100px;
  margin: 10px;
`;

export default SearchBook;
