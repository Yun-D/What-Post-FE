import React, { useEffect } from "react";
import styled from "styled-components";
import theme from "Styles/theme";

import Blank from "Components/etc/Blank";

import { ReactComponent as BooKIcn } from "Assets/icn_book.svg";
import { ReactComponent as MovieIcn } from "Assets/icn_movie.svg";
import NoteIcon from "@material-ui/icons/TextsmsOutlined";
import VisibilityOff from "@material-ui/icons/VisibilityOffOutlined";
//TODO: 비공개인 것만 서클 보이게끔 처리해야함

const LikedPostList = () => {
  // useEffect = () => {
  //   //TODO: 받은 항목이 영화/책일 경우 state 변경, 아이콘 변경
  // };

  return (
    <div>
      <Container>
        <RowDiv className="rowDirection">
          <ChannelThumb>
            {/* <BooKIcn fill={`${theme.colors.mainColor}`} /> */}
            <MovieIcn fill={`${theme.colors.mainColor}`} />
          </ChannelThumb>

          <div>
            <p className="p_title">포스트 제목</p>
            <p className="subText">책/영화 제목</p>
          </div>
          <Blank />
          <Circle>
            <VisibilityOff
              style={{
                color: "gray",
                margin: 5,
              }}
            />
          </Circle>
        </RowDiv>

        <PreviewContents>글 내용 미리보기 2줄</PreviewContents>

        <Blank />
        <div className="rowDirection">
          <Blank />
          <NoteIcon
            style={{
              color: `${theme.colors.peacock}`,
              marginRight: "5px",
            }}
          />
          유저 네임
        </div>
      </Container>
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  height: 17vh;
  background: white;
  border-radius: 10px;
  padding: 1rem;
  word-break: break-all;
  white-space: pre-line;

  flex-direction: column;
  display: flex;
`;
const RowDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3%;
`;
const PreviewContents = styled.p`
  text-overflow: ellipsis; // 글자 자르고 생략 표시
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ChannelThumb = styled.div`
  width: 45px;
  height: 45px;
  margin-right: 2%;
`;
const Circle = styled.div`
  width: 34px;
  height: 34px;
  background-color: white;
  opacity: 0.8;
  box-shadow: ${theme.size.smallThingShadow};
  border-radius: 50%;
  position: right;
`;

export default LikedPostList;
