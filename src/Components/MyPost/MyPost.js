import React from "react";
import "./MyPost.css";
import styled from "styled-components";

const MyPost = () => {
  return (
    <Div>
      <div className="contents_div">
        <div className="line_div">
          <p_title>유저 네임의 책장</p_title>
          <button>포스트 쓰기</button>
        </div>
        <div>책 사진 넣는 곳</div>
        <Button_long>로그아웃</Button_long>
        <Button_long>회원 탈퇴</Button_long>
      </div>
    </Div>
  );
};

const Div = styled.div`
  margin: 20px;
`;

const Button_long = styled.button`
  //글로벌 스타일 button 확장
  width: 100%;
  margin-bottom: 4px;
`;

export default MyPost;
