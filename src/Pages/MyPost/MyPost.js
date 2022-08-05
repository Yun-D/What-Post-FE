import { React, useLayoutEffect, useState } from "react";
import styled from "styled-components";

import { bookSearch } from "../../APIs/api";
import Item from "../../Components/layout/ListItem";
//import ModalFrame from "../../Components/layout/ModalFrame";
import { FullSizeBtn, SmallBtn } from "../../Components/etc/Buttons";
import { SearchBar } from "../../Components/etc/SearchBar";

import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  setBooks,
  setPage,
  nextPage,
  isEndPage,
} from "../../Store/store";
import { Link } from "react-router-dom";

const MyPost = () => {
  //저장소에서 책검색 데이터 읽어오기
  const queryData = useSelector((state) => state.bookSearch.query);
  const bookList = useSelector((state) => state.bookSearch.books);
  const pageNum = useSelector((state) => state.bookSearch.page);
  const isEnd = useSelector((state) => state.bookSearch.isEnd);
  const dispatch = useDispatch(); //작업 전달하기

  //state 선언
  const [searchItem, setSearch] = useState("");
  const [modalState, setModalState] = useState(false); //모달

  useLayoutEffect(() => {
    //componentDidMount/Update/WillUnmount 일 경우 실행
    //(query state가 업데이트되면 api 호출)
    if (searchItem.length > 1) {
      bookSearchHandler(queryData, pageNum);
    }

    //초기화 처리
    dispatch(setQuery(""));
    dispatch(setPage(1));
    dispatch(setBooks([]));
    dispatch(isEndPage(true));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData, pageNum]);

  /////////////////////////////////책 검색용 함수들
  const onClickSearch = () => {
    dispatch(setQuery(searchItem));
    dispatch(setPage(1));
    dispatch(setBooks([]));
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

  /////////////////////////////////모달용 함수들
  const openModal = (e) => {
    e.preventDefault();
    setModalState(true);
  };
  const closeModal = (e) => {
    e.preventDefault();
    setModalState(false);

    //모달창 닫기와 동시에 쿼리 초기화
    setSearch("");
    dispatch(setQuery(""));
    dispatch(setPage(1));
    dispatch(setBooks([]));
    dispatch(isEndPage(true));
  };
  /////////////////////////////////모달용 함수들 닫음

  return (
    <div className="contents_div">
      <div className="rowDirection">
        <p className="p_title">유저 네임의 책장</p>
        <Link to="/my_post/write_post">
          <button>포스트 쓰기</button>
        </Link>
      </div>
      <div>책 사진 넣는 곳</div>
      <FullSizeBtn>로그아웃</FullSizeBtn>
      <FullSizeBtn>회원 탈퇴</FullSizeBtn>

      {/* {modalState && (
        <ModalFrame state={modalState} closeModal={closeModal}>
          <SearchBar
            value={searchItem}
            onKeyDown={onEnter}
            onChange={onTextUpdate}
            onClick={onClickSearch}
          />
          <Blank />
          {bookList.map((book, idx) => (
            <Item
              key={idx}
              thumbnail={book.thumbnail}
              title={book.title}
              authors={book.authors}
              datetime={book.datetime.substr(0, 4)}
              publisher={book.publisher}
              contents={book.contents}
              tolink={"/my_post/write_post"}
            />
          ))}
          <Blank />

          {!isEnd && (
            <SmallBtn
              onClick={() => {
                dispatch(nextPage());
              }}
            >
              더보기
            </SmallBtn>
          )}
        </ModalFrame>
      )} */}
    </div>
  );
};

const Blank = styled.div`
  height: 10px;
`;

export default MyPost;
