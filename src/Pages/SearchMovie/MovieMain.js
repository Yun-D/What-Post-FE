import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { m_setQuery, m_setItems, m_setPage } from "Store/store";
import useIsMount from "Utils/hooks/useIsMount";

import { SearchBar } from "Components/etc/SearchBar";

const MovieMain = () => {
  const isMount = useIsMount(); //useEffect 클린업 시 isMount를 false로 만들어 메모리 누수 방지
  const [searchItem, setSearch] = useState("");
  const dispatch = useDispatch(); //작업 전달하기
  const navigate = useNavigate();

  /////////////////////////////////책 검색용 함수들
  const goToSearch = () => {
    navigate(`/search_movie/search/${searchItem}`);
  };

  const onClickSearch = () => {
    dispatch(m_setQuery(searchItem));
    goToSearch();
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

  useEffect(() => {
    if (isMount.current) {
      dispatch(m_setQuery(""));
      dispatch(m_setPage(1));
      dispatch(m_setItems([]));
    }

    return () => {};
  }, [dispatch, isMount]);

  return (
    <div className="contents_div">
      <SearchBar
        value={searchItem}
        onKeyDown={onEnter}
        onChange={onTextUpdate}
        onClick={onClickSearch}
      />
    </div>
  );
};

export default MovieMain;
