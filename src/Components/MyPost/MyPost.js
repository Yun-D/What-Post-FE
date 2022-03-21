import { React, useEffect, useState } from "react";
import styled from "styled-components";

import { bookSearch } from "../../APIs/api";
import Item from "../etc/ListItem";
import ModalFrame from "../etc/ModalFrame";

import { Link } from "react-router-dom";

const MyPost = () => {
  //책검색 데이터셋, 검색어, 쿼리 state 생성
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  //모달 state
  const [modalState, setModalState] = useState(false);

  //임시 변수 모음
  const searchPageNum = 0;

  useEffect(() => {
    //componentDidMount/Update/WillUnmount 일 경우 실행
    //(query state가 업데이트되면 api 호출)
    if (query.length > 0) {
      bookSearchHandler(query, true);
    }
  }, [query]); //이부분이 없어지려면 로딩 결과를 보여줘야 할듯

  /////////////////////////////////책 검색용 함수들
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

  //책 검색
  const bookSearchHandler = async (query, reset) => {
    const params = {
      query: query, //검색어
      sort: "accuracy", //accuracy: 정확도, latest: 발간일 순
      page: 1,
      size: 10, //1~50. 출력할 검색 결과 수
    };

    const { data } = await bookSearch(params); //책 검색 api 호출
    if (reset) {
      setBooks(data.documents);
    } else {
      setBooks(books.concat(data.documents));
    }
  };
  /////////////////////////////////책 검색용 함수들 닫음

  /////////////////////////////////모달용 함수들
  const openModal = () => {
    setModalState(true);
  };
  const closeModal = (e) => {
    e.preventDefault();
    setModalState(false);

    //모달창 닫기와 동시에 쿼리 초기화
    setQuery(" ");
    setSearch();
  };
  /////////////////////////////////모달용 함수들 닫음

  return (
    <Div>
      <div className="contents_div">
        <div className="rowDirection">
          <p className="p_title">유저 네임의 책장</p>
          {/* <Link to={"/my_post/write_post"}>
            <button>포스트 쓰기</button>
          </Link> */}
          <button onClick={openModal}>포스트 쓰기</button>
        </div>
        <div>책 사진 넣는 곳</div>
        <ButtonLong>로그아웃</ButtonLong>
        <ButtonLong>회원 탈퇴</ButtonLong>

        {modalState ? (
          <ModalFrame state={modalState} closeModal={closeModal}>
            <Blank /> <Blank /> <Blank />
            <div className="rowDirection">
              <InputSmall
                placeholder="검색어를 입력하세요."
                name="query"
                value={search}
                onKeyDown={onEnter}
                onChange={onTextUpdate}
              />
              <ButtonSmall onClick={onClickSearch}>검색</ButtonSmall>
            </div>
            <Blank />
            {books.map((book, idx) => (
              <Item
                key={idx}
                thumbnail={book.thumbnail}
                title={book.title}
                authors={book.authors}
                datetime={book.datetime.substr(0, 4)}
                publisher={book.publisher}
                meta={book.total_count}
              />
            ))}
          </ModalFrame>
        ) : (
          <></>
        )}
      </div>
    </Div>
  );
};

const Div = styled.div`
  margin: 20px;
`;
const Blank = styled.div`
  height: 10px;
`;

const ButtonSmall = styled.button`
  //[검색] 글로벌 스타일 button 확장
  flex: 1;
  width: 100px;
`;
const ButtonLong = styled.button`
  //글로벌 스타일 button 확장
  width: 100%;
  margin-bottom: 4px;
`;

const InputSmall = styled.input`
  //[검색] 작은 사이즈의 input
  flex: 3;
  margin-right: 8px;
  margin-bottom: 0px;
`;

export default MyPost;
