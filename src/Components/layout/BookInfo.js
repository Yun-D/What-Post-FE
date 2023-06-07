import React from "react";
import styled from "styled-components";
import theme from "../../Styles/theme";

import { useLocation } from "react-router-dom";
import CircleIcon from "@material-ui/icons/RadioButtonUnchecked";

/////////////////////////////// 책 상세정보를 보여주는 컴포넌트. ListItem에서 선택하여 state로 보낸 책 데이터를 받는다
const BookInfo = () => {
  const location = useLocation();

  return (
    <Div className="rowDirection">
      <img
        src={location.state.thumbnail}
        alt={location.state.thumbnail}
        width="20%"
        height="auto"
      />
      <DivBookInfo>
        <H2>{location.state.title}</H2>
        <div className="rowDirection">
          <H3>{location.state.authors}</H3>
          <CircleIcon
            style={{
              color: `${theme.colors.peacockGray}`,
              fontSize: "8px",
              marginRight: "2%",
            }}
          />
          <p className="subText">
            {location.state.publisher} ({location.state.publishDate})
          </p>
        </div>
        <br /> <Hr /> <br />
        <DivBookArticle>
          {location.state.contents && (
            <article>{location.state.contents + " ..."}</article>
          )}
        </DivBookArticle>
      </DivBookInfo>
    </Div>
  );
};

const Div = styled.div`
  width: 100%;
`;
const DivBookInfo = styled.div`
  margin-left: 5%;
  margin-bottom: 20px;
  height: auto;

  @media only screen and (max-width: ${theme.size.tablet}) {
    font-size: 0.9rem;
  }
`;
const DivBookArticle = styled.div`
  height: 100px auto;
  //overflow-y: scroll;
`;

const Hr = styled.hr`
  background-color: ${theme.colors.lightGray};
  border-width: 1px 0px 0px 0px;
  height: 1px;
`;
const H2 = styled.h2`
  color: ${theme.colors.peacock};

  @media only screen and (max-width: ${theme.size.tablet}) {
    font-size: 1.5rem;
  }
`;
const H3 = styled.h3`
  color: ${theme.colors.peacockGray};
  margin-right: 2%;

  @media only screen and (max-width: ${theme.size.tablet}) {
    font-size: 0.9rem;
  }
`;

export default BookInfo;
