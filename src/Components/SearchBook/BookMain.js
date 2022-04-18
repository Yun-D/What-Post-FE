import { React, useState } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//TODO: 향후 리팩토링 필요, 중복 코드 수정요
const BookMain = () => {
  //책검색 데이터셋, 검색어, 쿼리 state 생성
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(""); //책 검색 쿼리

  const navigate = useNavigate();

  /////////////////////////////////책 검색용 함수들
  const onClickSearch = () => {
    setQuery(search);
    goToSearch();
  };
  const goToSearch = () => {
    navigate("/search_book/search", { state: search });
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

  return (
    <div className="contents_div">
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

      <div> 최신/랜덤 이용자 포스트 </div>
    </div>
  );
};

const Div = styled.div`
  margin: 1rem 0 1rem;
`;

const Input = styled.input`
  margin-bottom: 0;
  margin-right: 1rem;
`;

export default BookMain;
