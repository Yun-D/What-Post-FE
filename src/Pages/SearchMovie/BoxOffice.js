import React, { useEffect, useState } from "react";
import { getBoxOffice } from "APIs/api";
import keys from "APIs/api_key";
import RowDirecImages from "Components/layout/RowDirecImages";
import styled from "styled-components";

const BoxOffice = (props) => {
  const [boxOffice, setBoxOffice] = useState([]);
  let now = new Date();
  let newDay = new Date(now);
  newDay.setDate(now.getDate() - 7); //에러 방지용으로 일주일 전으로 연산
  let year = newDay.getFullYear();
  let month = ("0" + (newDay.getMonth() + 1)).slice(-2);
  let day = ("0" + newDay.getDate()).slice(-2);

  const today = year + month + day;

  useEffect(() => {
    getBoxOfficeHandler(props.weekGB);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBoxOfficeHandler = async (weekGB) => {
    const params = {
      key: `${keys.KOBIS_REST_API_KEY}`,
      targetDt: today,
      weekGb: weekGB, //0: 주간(월~일), 1: 주말(금~일), 2: 주중(월~목)
    };

    const { data } = await getBoxOffice(params);
    setBoxOffice(data.boxOfficeResult.weeklyBoxOfficeList);
  };

  return (
    <ItemArea className="rowDirection">
      {boxOffice.map((movie, idx) => (
        <RowDirecImages key={idx} title={movie.movieNm} />
      ))}
    </ItemArea>
  );
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
