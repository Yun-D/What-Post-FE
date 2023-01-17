import React from "react";
import { SearchBar } from "Components/etc/SearchBar";

const BookSearchFunc = (props) => {
  //책 검색
  const onClickSearch = () => {
    props.dispatch(props.setQuery(props.search));
    props.dispatch(props.setPage(1));
    props.dispatch(props.setBooks([]));
  };

  //엔터를 눌렀을 때 쿼리를 검색어로 교체하는 함수
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      onClickSearch();
    }
  };

  //text 검색어가 바뀔 때 호출되는 함수.
  const onTextUpdate = (e) => {
    props.setSearch(e.target.value);
  };

  return (
    <SearchBar
      value={props.search}
      onKeyDown={onEnter}
      onChange={onTextUpdate}
      onClick={onClickSearch}
    />
  );
};

export default BookSearchFunc;
