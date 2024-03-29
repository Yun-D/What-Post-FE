import React, { useEffect, useState } from "react";
import { StyledLink } from "Components/etc/StyledLink";
import theme from "Styles/theme";
import styled from "styled-components";

import HtmlParser from "react-html-parser";

const MovieList = (props) => {
  const [isSubtitleExist, setIsSubtitleExist] = useState(false);

  useEffect(() => {
    if (props.subtitle !== "") {
      setIsSubtitleExist(true);
    }
  }, [props.subtitle]);

  ////// 결과 텍스트 수정
  let temp_title = props.title;
  let temp_director = props.director;
  let temp_actors = props.actor;
  temp_title = temp_title.replace(/[<b>]|[</b>]/g, ""); // 타이틀에 <b> 처리 되어있는 것들 치환
  temp_director = temp_director.split("|")[0]; // "|" 이후 문자 제거
  temp_actors = temp_actors.replace(/[|]/g, " | "); // "|" 사이 공백 추가

  return (
    <ItemCard className="rowDirection">
      <img src={props.thumbnail} alt={temp_title + " 이미지"} width="9%" />
      <ContentsDiv>
        <StyledLink
          to={props.tolink}
          color={`${theme.colors.peacock}`}
          state={{
            thumbnail: props.thumbnail,
            title: temp_title,
            subtitle: HtmlParser(props.subtitle),
            datetime: props.datetime,
            director: temp_director,
            actor: temp_actors,
            tolink: props.link,
            detailLink: props.detailLink,
          }}
          decoration_color={`${theme.colors.peacock}`}
          decoration_thckness="2px"
          onClick={props.onClick}
        >
          {isSubtitleExist ? (
            <h3>
              {temp_title} | {HtmlParser(props.subtitle)}
            </h3>
          ) : (
            <h3>{temp_title}</h3>
          )}
        </StyledLink>

        <H4>
          {temp_director} | {props.datetime}
        </H4>
        <br />
        <SmallTxt>{temp_actors}</SmallTxt>
      </ContentsDiv>
    </ItemCard>
  );
};

const ItemCard = styled.div`
  width: 100%;
  list-style: none;
  border: 0.5px solid #bbbbbb;
  padding: 20px 30px;
  margin-bottom: 4px;
  background-color: white;
  border-radius: 8px;
`;
const ContentsDiv = styled.div`
  flex: 1;
  margin-left: 30px;
  margin-bottom: 10px;
`;

const H4 = styled.h4`
  color: ${theme.colors.peacockGray};
`;
const SmallTxt = styled.p`
  color: gray;
  font-size: 0.75rem;
`;

export default MovieList;
