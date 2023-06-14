import { React, useEffect, useState } from "react";
import { movieSearch } from "../../APIs/api";
import keys from "APIs/api_key";

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
      ServiceKey: keys.KMDB_API_KEY,
      collection: "kmdb_new2",
      query: query, //검색어
      startCount: start, //검색 시작 위치 지정
      listCount: 10, //1~50. 출력할 검색 결과 수
    };

    const { data } = await movieSearch(params); //api 호출

    if (data.Data[0].Result.length < 10) {
      //더이상 더보기로 보여줄 데이터가 없는 경우 더보기 버튼 제거
      setIsEnd(true);
    }
    if (start === 1) {
      dispatch(m_setItems(data.Data[0].Result));
    } else if (start >= 11) {
      dispatch(m_setItems(movies.concat(data.Data[0].Result)));
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
          thumbnail={movie.posters}
          title={movie.title}
          subtitle={movie.titleEng}
          datetime={movie.repRlsDate.substring(0, 4)}
          director={movie.directors.director[0].directorNm}
          actor={movie.actors.actor
            .map((data) => data.actorNm.replace(/!HS | !HE /g, ""))
            .join(" ")}
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
