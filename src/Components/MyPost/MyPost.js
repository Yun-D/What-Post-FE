import { React, useEffect } from "react";
import "./MyPost.css";
import styled from "styled-components";
import { bookSearch } from "../../APIs/api";

import { Link } from "react-router-dom";

const MyPost = () => {
  useEffect(() => {
    //componentDidMount/Update/WillUnmount 일 경우 실행
    bookSearchHandler();
  }, []);

  //책 검색 (임시 구현)
  const bookSearchHandler = async () => {
    const params = {
      query: "김소월", //검색어
      sort: "accuracy", //accuracy: 정확도, latest: 발간일 순
      size: 10, //1~50. 출력할 검색 결과 수
    };

    const { data } = await bookSearch(params); //책 검색 api 호출
    console.log(data);
  };

  return (
    <Div>
      <div className="contents_div">
        <div className="line_div">
          <p className="p_title">유저 네임의 책장</p>
          <Link to={"/my_post/write_post"}>
            <button>포스트 쓰기</button>
          </Link>
        </div>
        <div>책 사진 넣는 곳</div>
        <ButtonLong>로그아웃</ButtonLong>
        <ButtonLong>회원 탈퇴</ButtonLong>

        <div>** 임시 구역 **</div>
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
