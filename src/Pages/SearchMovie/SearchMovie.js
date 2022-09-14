import { React, useEffect, useState } from "react";
import { movieSearch } from "../../APIs/api";

import MovieList from "Components/layout/MovieList";
import styled from "styled-components";
import { SearchBar } from "Components/etc/SearchBar";
import { SmallBtn } from "Components/etc/Buttons";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { m_setQuery, m_setItems, m_nextPage, m_setPage } from "Store/store";

const SearchMovie = () => {
  const { query } = useParams();
  const [search, setSearch] = useState(query);

  //저장소에서 영화검색 데이터 읽어오기
  const queryData = useSelector((state) => state.movieSearch.query);
  const movies = useSelector((state) => state.movieSearch.items);
  const pageNum = useSelector((state) => state.movieSearch.start);
  const dispatch = useDispatch(); //작업 전달하기

  useEffect(() => {
    movieSearchHandler(search, pageNum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData, pageNum]);

  //영화 검색
  const onClickSearch = () => {
    dispatch(m_setQuery(search));
    dispatch(m_setPage(1));
    dispatch(m_setItems([]));
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
  const movieSearchHandler = async (query, start) => {
    const params = {
      query: query, //검색어
      start: start, //검색 시작 위치 지정
      display: 10, //1~50. 출력할 검색 결과 수
    };

    const { data } = await movieSearch(params); //api 호출
    console.log("데이터 " + data.items);
    if (start === 1) {
      dispatch(m_setItems(data.items));
    } else if (start >= 11) {
      dispatch(m_setItems(movies.concat(data.items)));
    }
  };
  /////////////////////////////////책 검색용 함수들 닫음

  return (
    <div className="contents_div">
      <SearchBar
        value={search}
        onKeyDown={onEnter}
        onChange={onTextUpdate}
        onClick={onClickSearch}
      />

      {movies.map((movie, idx) => (
        <MovieList
          key={idx}
          thumbnail={movie.image}
          title={movie.title}
          subtitle={movie.subtitle}
          datetime={movie.pubDate}
          director={movie.director}
          actor={movie.actor}
          tolink={"movie.idx.link"}
        />
      ))}
      <br />

      {/* <FlexZone>
        {!isEnd && (
          <SmallBtn
            onClick={() => {
              dispatch(nextPage());
            }}
          >
            더보기
          </SmallBtn>
        )}
      </FlexZone> */}
    </div>
  );
};

const FlexZone = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export default SearchMovie;
