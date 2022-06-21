import React from "react";

import theme from "../../Styles/theme";
import styled from "styled-components";
import NoteIcon from "@material-ui/icons/TextsmsOutlined"; //ModeCommentOutlined

import { postDummy } from "../../Assets/dummy"; //테스트용 임시 데이터

const PostItem = () => {
  return (
    <div>
      {postDummy.map((data) => (
        <PostBoxArea>
          <Contents>
            <PostTitle>{data.title}</PostTitle>
            <PostContents>{data.contents}</PostContents>

            <Blank />
            <Div className="rowDirection">
              <Blank />
              <NoteIcon />
              <PostContents>{data.nickname}</PostContents>
            </Div>
          </Contents>
        </PostBoxArea>
      ))}
    </div>
  );
};

const PostBoxArea = styled.div`
  background-color: beige;
  width: 100%;
  height: 180px;
  border-radius: ${theme.size.radius};
  box-shadow: ${theme.size.boxShadow};
  margin-top: 15px;
  scroll-behavior: smooth;
`;
const Contents = styled.div`
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PostTitle = styled.h2`
  font-size: ${theme.textSize.postTitle};
`;
const PostContents = styled.p`
  font-size: ${theme.textSize.postContents};
`;
const Div = styled.div`
  flex: 1;
`;
const Blank = styled.div`
  flex: 999;
  width: 100%;
`;

export default PostItem;
