import { React, useEffect } from "react";
import { Link } from "react-router-dom";

import { FullSizeBtn } from "Components/etc/Buttons";
import { bookDummy } from "Assets/dummy";

import { postRead } from "Utils/post";
import RowDirecImages from "Components/layout/RowDirecImages";
import styled from "styled-components";

const MyPost = () => {
  useEffect(() => {
    postRead();
  });

  return (
    <Div>
      <div className="rowDirection">
        <p className="p_title">유저 네임의 책장</p>
        <Link to="/my_post/write_post">
          <button>포스트 쓰기</button>
        </Link>
      </div>
      <MyBookshelfDiv>
        {bookDummy.map((data) => (
          <RowDirecImages
            key={data.id}
            thumbnail={data.thumbnail}
            title={data.title}
            contents={data.contents}
            isViewPost={true}
          />
        ))}
      </MyBookshelfDiv>

      <FullSizeBtn>로그아웃</FullSizeBtn>
      <FullSizeBtn>회원 탈퇴</FullSizeBtn>
    </Div>
  );
};

const Div = styled.div`
  align-items: center;
  justify-content: center;
  margin: 20px 5% 0;
`;

const MyBookshelfDiv = styled.div`
  width: 100%;
  margin: 20px 0;
`;

export default MyPost;
