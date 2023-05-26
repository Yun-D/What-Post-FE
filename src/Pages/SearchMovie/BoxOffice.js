import React, { useEffect, useState } from "react";
import { getBoxOffice, getMoviePoster } from "APIs/api";
import keys from "APIs/api_key";
import RowDirecImages from "Components/layout/RowDirecImages";
import styled from "styled-components";

const BoxOffice = (props) => {
  const [boxOffice, setBoxOffice] = useState([]);
  const [moviePosters, setMoviePosters] = useState([]);

  let now = new Date();
  let newDay = new Date(now);
  newDay.setDate(now.getDate() - 7); //에러 방지용으로 일주일 전으로 연산
  let year = newDay.getFullYear();
  let month = ("0" + (newDay.getMonth() + 1)).slice(-2);
  let day = ("0" + newDay.getDate()).slice(-2);

  const today = year + month + day;

  useEffect(() => {
    setBoxOfficeList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.weekGB]);

  useEffect(() => {
    setBoxOfficeList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getResponseMovieData = (response) => {
    try {
      const temp = response.data.Data[0].Result[0].posters;
      const posterData = temp.substring(0, temp.indexOf("|"));
      return posterData;
    } catch (error) {
      console.error(
        "Failed to get movie poster data from the response:",
        error
      );
      return ""; // 오류 발생 시 빈 문자열 반환 또는 다른 적절한 오류 처리 방식 적용
    }
  };

  //박스오피스 데이터를 가지고 오는 핸들러
  const getBoxOfficeHandler = async (weekGB) => {
    try {
      const params = {
        key: `${keys.KOBIS_REST_API_KEY}`,
        targetDt: today,
        weekGb: weekGB, //0: 주간(월~일), 1: 주말(금~일), 2: 주중(월~목)
      };

      const { data } = await getBoxOffice(params); //1. 박스오피스 데이터 가져오기
      const tempBoxOffice = data.boxOfficeResult.weeklyBoxOfficeList;
      setBoxOffice(tempBoxOffice); //2. 주간 박스오피스 리스트를 추출하여 boxOffice state에 저장

      const responseData = boxOffice;
      return responseData.map((data) => ({
        movieCode: data.movieCd,
        title: data.movieNm,
        releaseDate: data.openDt.replace(/-/g, ""),
      }));
    } catch (error) {
      throw new Error("Failed to get box office data");
    }
  };

  //박스오피스 영화 포스터 검색
  const getMoviePosterHandler = async (boxOfficeData) => {
    try {
      const postList = await Promise.all(
        boxOfficeData.map(async (data) => {
          const params = {
            ServiceKey: keys.KMDB_API_KEY,
            collection: "kmdb_new2",
            detail: "Y",
            title: data.title,
            releaseDts: data.releaseDate,
          };

          const resData = await getMoviePoster(params);
          const responseData = getResponseMovieData(resData);

          return responseData;
        })
      );

      setMoviePosters(postList);

      return postList;
    } catch (error) {
      throw new Error("Failed to get movie poster data");
    }
  };

  const setBoxOfficeList = async () => {
    try {
      const returnData = await getBoxOfficeHandler(props.weekGB);
      const finalData = await getMoviePosterHandler(returnData);
      console.log(finalData);
    } catch (error) {
      console.log(error);
    }
  };

  //두가지 배열 쓰기 위해 컴포넌트로 변경
  const componentR = boxOffice.map((movie, idx) => {
    const thumbnailData = moviePosters[idx];

    return (
      <RowDirecImages
        key={idx}
        title={movie.movieNm}
        thumbnail={thumbnailData}
      />
    );
  });

  return <ItemArea className="rowDirection">{componentR}</ItemArea>;
};

const ItemArea = styled.div`
  width: 100%;
  border: 0.5px solid #bbbbbb;
  padding: 20px;
  margin-bottom: 4px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
`;

export default BoxOffice;
