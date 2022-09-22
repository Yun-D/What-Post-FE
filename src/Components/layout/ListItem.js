import React from "react";

import theme from "../../Styles/theme";
import styled from "styled-components";

import { StyledLink } from "../etc/StyledLink";

/////////////////////////////// 책 검색 결과를 리스트형태로 보여주는 컴포넌트
const ListItem = (props) => {
  return (
    <ItemCard className="rowDirection">
      <dl>
        <dd>
          <p>{props.is_end}</p>
        </dd>
      </dl>
      <img
        src={props.thumbnail}
        alt={props.thumbnail}
        width="auto"
        height="auto"
      />

      <ContentsDiv>
        <StyledLink
          to={props.tolink}
          state={{
            thumbnail: props.thumbnail,
            title: props.title,
            authors: props.authors,
            publisher: props.publisher,
            publishDate: props.datetime,
            contents: props.contents,
          }}
          color={`${theme.colors.peacock}`}
          decoration_color={`${theme.colors.peacock}`}
          decoration_thckness="2px"
          onClick={props.onClick}
        >
          <h3>{props.title}</h3>
        </StyledLink>

        <H4 className="authors">{props.authors}</H4>
        <br />
        <SmallTxt>
          {props.publisher} | {props.datetime}
        </SmallTxt>
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
  color: rgb(97, 97, 97);
`;
const SmallTxt = styled.p`
  color: gray;
  font-size: 0.75rem;
`;

export default ListItem;
