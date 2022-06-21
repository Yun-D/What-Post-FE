import React from "react";

import theme from "../../Styles/theme";
import styled from "styled-components";

import { postDummy } from "../../Assets/dummy"; //테스트용 임시 데이터

const PostItem = () => {
  return (
    <div>
      {postDummy.map((data) => (
        <PostBoxArea>
          <Contents>
            <PostTitle>{data.title}</PostTitle>
            <PostContents>{data.contents}</PostContents>
          </Contents>
        </PostBoxArea>
      ))}
    </div>
  );
};

const PostBoxArea = styled.div`
  background-color: beige;
  width: 100%;
  height: 20vh;
  border-radius: ${theme.size.radius};
  box-shadow: ${theme.size.boxShadow};
  margin-top: 15px;
`;
const Contents = styled.div`
  padding: 20px;
`;
const PostTitle = styled.h2`
  font-size: ${theme.textSize.postTitle};
`;
const PostContents = styled.p`
  font-size: ${theme.textSize.postContents};
`;

export default PostItem;
