import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { FullSizeBtn, SmallBtn } from "Components/etc/Buttons";
import { bookDummy } from "Assets/dummy";
import { postRead } from "Utils/post";
import { onLogout } from "Utils/auth";

import ModalFrame from "Components/layout/ModalFrame";
import LikedPostList from "Pages/MyPost/LikedPostList";
import RowDirecImages from "Components/layout/RowDirecImages";

const MyPost = () => {
  const [modalState, setModalState] = useState(false); //모달

  const openModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };

  useEffect(() => {
    postRead();
  });

  return (
    <Div>
      <div className="rowDirection">
        <p className="p_title">{localStorage.getItem("userID")}의 책장</p>

        <SmallBtn className="whiteButton shadow" onClick={() => openModal()}>
          좋아요한 포스트
        </SmallBtn>
        <Link to="/my_post/write_post">
          <button className="shadow">포스트 쓰기</button>
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

      <FullSizeBtn className="whiteButton" onClick={onLogout}>
        로그아웃
      </FullSizeBtn>
      <FullSizeBtn className="whiteButton">회원 탈퇴</FullSizeBtn>

      {modalState && (
        <ModalFrame state={modalState} closeModal={closeModal} widthSize="50%">
          <ModalContents>
            <LikedPostList />
          </ModalContents>
        </ModalFrame>
      )}
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

const ModalContents = styled.div`
  width: 95%;
  flex: 1;
`;

export default MyPost;
