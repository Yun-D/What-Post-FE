import { React } from "react";
import { Link } from "react-router-dom";

import { FullSizeBtn } from "Components/etc/Buttons";

const MyPost = () => {
  return (
    <div className="contents_div">
      <div className="rowDirection">
        <p className="p_title">유저 네임의 책장</p>
        <Link to="/my_post/write_post">
          <button>포스트 쓰기</button>
        </Link>
      </div>
      <div>책 사진 넣는 곳</div>
      <FullSizeBtn>로그아웃</FullSizeBtn>
      <FullSizeBtn>회원 탈퇴</FullSizeBtn>
    </div>
  );
};

export default MyPost;
