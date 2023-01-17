import { React, useEffect, useState } from "react";
import { movieSearch } from "../../APIs/api";

import MovieList from "Components/layout/MovieList";
import styled from "styled-components";
import { SmallBtn } from "Components/etc/Buttons";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { m_setQuery, m_setItems, m_nextPage, m_setPage } from "Store/store";

import MovieSearchFunc from "Utils/MovieSearchFunc";

const SearchMovie = () => {
  const { query } = useParams();
  const [search, setSearch] = useState(query);
  const [isEnd, setIsEnd] = useState(false);

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
  const movieSearchHandler = async (query, start) => {
    const params = {
      query: query, //검색어
      start: start, //검색 시작 위치 지정
      display: 10, //1~50. 출력할 검색 결과 수
    };

    const { data } = await movieSearch(params); //api 호출
    if (data.items.length < 10) {
      //더이상 더보기로 보여줄 데이터가 없는 경우 더보기 버튼 제거
      setIsEnd(true);
    }

    if (start === 1) {
      dispatch(m_setItems(data.items));
    } else if (start >= 11) {
      let beforeData = movies[start - 2].title;

      if (data.items[data.items.length - 1].title === beforeData) {
        //다음에 올 데이터가 기존데이터(beforeData)와 같을 경우(더이상 검색 결과가 없을 경우) 더보기 버튼 제거, 알림창 출력
        setIsEnd(true);
        alert("더이상 결과가 없습니다.");
      } else {
        dispatch(m_setItems(movies.concat(data.items)));
      }
    }
  };
  /////////////////////////////////영화 검색용 함수들 닫음

  return (
    <div className="contents_div">
      <MovieSearchFunc
        m_setQuery={m_setQuery}
        m_setPage={m_setPage}
        m_setItems={m_setItems}
        setSearch={setSearch}
        search={search}
        dispatch={dispatch}
        onChange={(searchQuery) => setSearch(...searchQuery)}
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
          tolink={"/search_movie/info"}
          detailLink={movie.link}
        />
      ))}

      <br />

      <FlexZone>
        {!isEnd && (
          <SmallBtn
            onClick={() => {
              dispatch(m_nextPage());
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

export default SearchMovie;
