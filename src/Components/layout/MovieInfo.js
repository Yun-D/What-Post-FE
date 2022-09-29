import React from "react";
import styled from "styled-components";
import theme from "../../Styles/theme";

import { useLocation } from "react-router-dom";

const BookInfo = () => {
  const location = useLocation();
  console.log(location.state.detailLink);

  return (
    <Div className="rowDirection">
      <img
        src={location.state.thumbnail}
        alt={location.state.thumbnail}
        width="17%"
        height="auto"
      />
      <DivBookInfo>
        <H1>{location.state.title}</H1>
        <H3>{location.state.subtitle}</H3>
        <br />
        <div className="rowDirection">
          <InfoTitle>감독</InfoTitle>
          <p className="subText">{location.state.director}</p>
        </div>
        <div className="rowDirection">
          <InfoTitle>제작 연도</InfoTitle>
          <p className="subText">{location.state.datetime}</p>
        </div>
        <div>
          <InfoTitle>출연 배우</InfoTitle>
          <p className="subText">{location.state.actor}</p>
        </div>
        <br />
      </DivBookInfo>
    </Div>
  );
};

const Div = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
const DivBookInfo = styled.div`
  width: 100%;
  margin-left: 5%;
  height: auto;

  @media only screen and (max-width: ${theme.size.tablet}) {
    font-size: 0.9rem;
  }
`;

const Hr = styled.hr`
  background-color: ${theme.colors.lightGray};
  border-width: 1px 0px 0px 0px;
  height: 1px;
`;
const H1 = styled.h1`
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
const InfoTitle = styled.h3`
  margin-right: 2%;

  @media only screen and (max-width: ${theme.size.tablet}) {
    font-size: 0.9rem;
  }
`;

export default BookInfo;
