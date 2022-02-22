import React from "react";
import "./MyPost.css";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MyPost = () => {
  return (
    <Div>
      <div className="contents_div">
        <div className="line_div">
          <p_title>유저 네임의 책장</p_title>
          <Link to={"/my_post/write_post"}>
            <button>포스트 쓰기</button>
          </Link>
        </div>
        <div>책 사진 넣는 곳</div>
        <ButtonLong>로그아웃</ButtonLong>
        <ButtonLong>회원 탈퇴</ButtonLong>
      </div>
    </Div>
  );
};

const Div = styled.div`
  margin: 20px;
`;

const ButtonLong = styled.button`
  //글로벌 스타일 button 확장
  width: 100%;
  margin-bottom: 4px;
`;

export default MyPost;
