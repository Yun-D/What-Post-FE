import React, { useEffect, useState } from "react";
import { StyledLink } from "Components/etc/StyledLink";
import theme from "Styles/theme";
import styled from "styled-components";

const MovieList = (props) => {
  const [isSubtitleExist, setIsSubtitleExist] = useState(false);

  useEffect(() => {
    if (props.subtitle !== "") {
      setIsSubtitleExist(true);
    }
  }, [props.subtitle]);

  ////// 결과 텍스트 수정
  let temp_title = props.title;
  let temp_poster = props.thumbnail;

  temp_title = temp_title.replace(/!HS | !HE /g, ""); // 타이틀에 HS, HE 붙어있던 것 치환

  const index = temp_poster.indexOf("|") || temp_poster.indexOf("%7C");
  temp_poster = index !== -1 ? temp_poster.substring(0, index) : temp_poster;

  return (
    <ItemCard className="rowDirection">
      <img src={temp_poster} alt={temp_title + " 이미지"} width="9%" />
      <ContentsDiv>
        <StyledLink
          to={props.tolink}
          color={`${theme.colors.peacock}`}
          state={{
            thumbnail: temp_poster,
            title: temp_title,
            subtitle: props.subtitle,
            datetime: props.datetime,
            director: props.director,
            actor: props.actor,
            tolink: props.link,
            detailLink: props.detailLink,
          }}
          decoration_color={`${theme.colors.peacock}`}
          decoration_thckness="2px"
          onClick={props.onClick}
        >
          {isSubtitleExist ? (
            <h3>
              {temp_title} | {props.subtitle}
            </h3>
          ) : (
            <h3>{temp_title}</h3>
          )}
        </StyledLink>

        <H4>
          {props.director} | {props.datetime}
        </H4>
        <br />
        <SmallTxt>{props.actor}</SmallTxt>
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
