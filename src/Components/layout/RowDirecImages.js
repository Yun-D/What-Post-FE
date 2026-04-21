import React, { useState } from "react";
import styled from "styled-components";
import theme from "Styles/theme";
import ModalFrame from "./ModalFrame";
import Blank from "Components/etc/Blank";

import VisibilityOff from "@material-ui/icons/VisibilityOffOutlined";
import LikedSticker from "./LikedSticker";
import { onErrorImg } from "Utils/onErrorImg";
import { TextButton } from "Components/etc/Buttons";
import { Link } from "react-router-dom";
//TODO: 비공개인 것만 서클 보이게끔 처리해야함

/////// 포스터, 타이틀을 가지는 아이템들을 가로형으로 보여주는 컴포넌트 ///////
// props로 모달 컨트롤 여부 선택 가능
// 현재 마이 포스트 내 포스트 조회에서 사용중

const RowDirecImages = (props) => {
  const [modalState, setModalState] = useState(false); //모달
  const [isLiked, setIsLiked] = useState(false); //좋아요

  const isViewPost = props.isViewPost; //클릭 시 모달을 띄울지 여부

  /////////////////////////////////모달용 함수들
  const openModal = () => {
    //e.preventDefault();
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };
  /////////////////////////////////모달용 함수들 닫음

  const deletePost = () => {
    alert("정말 삭제하시겠습니까?");
    //TODO: 삭제 코드 추가
  };

  if (isViewPost) {
    return (
      <ContainerDiv>
        <ItemCard onClick={() => openModal()}>
          <Circle>
            <VisibilityOff
              style={{
                color: "gray",
                margin: 5,
              }}
            />
          </Circle>
          <ItemIMG src={props.thumbnail} alt={props.thumbnail} />
          <ItemP>{props.title}</ItemP>
        </ItemCard>

        {modalState && (
          <ModalFrame
            state={modalState}
            closeModal={closeModal}
            widthSize="80%"
          >
            <ModalContents>
              <PadDiv marginBottom="80px">
                <PostTitle notFullSize>{props.title}</PostTitle>
                <StyledLine />
              </PadDiv>

              <PadDiv marginBottom="40px">
                <Div className="rowDirection">
                  <Blank />
                  <Link to="/my_post/write_post">
                    <TextButton> 수정 </TextButton>
                  </Link>
                  <TextButton onClick={deletePost}> 삭제 </TextButton>
                  <PostContents>{props.nickname}</PostContents>
                </Div>
              </PadDiv>

              <PostContents>{props.contents}</PostContents>

              <LikedSticker
                isLiked={isLiked}
                setIsLiked={setIsLiked}
                isScrollable={props.contents.length > 400}
              />
            </ModalContents>
          </ModalFrame>
        )}
      </ContainerDiv>
    );
  } else {
    return (
      <ContainerDiv>
        <ItemCard>
          <ItemIMG
            src={props.thumbnail}
            alt={props.thumbnail}
            onError={onErrorImg}
          />
          <ItemP>{props.title}</ItemP>
        </ItemCard>
      </ContainerDiv>
    );
  }
};

const ContainerDiv = styled.ul`
  display: inline-block;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 3%;
`;
const ItemCard = styled.div`
  flex-direction: column;
  background-color: white;
  width: 170px;
  white-space: pre-line;
  overflow: hidden;
  position: relative;
`;

const ItemIMG = styled.img`
  width: 150px;
  box-shadow: ${theme.size.boxShadow};
  margin-bottom: 5%;
  border-radius: 5px;
`;
const ItemP = styled.p`
  font-size: ${theme.textSize.postContents};
  width: 150px;
  height: 40px;

  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ModalContents = styled.div`
  width: 95%;
  flex: 1;
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  word-break: break-all;
  white-space: pre-line;
`;

const PostTitle = styled.p`
  font-size: ${theme.textSize.postTitle};
  font-weight: 600;
  height: auto;

  ${(props) =>
    props.notFullSize
      ? ` //////////////////////ellipsis 처리 위한 코드부분
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 15px;
  `
      : `
    font-size: 2.5rem
  `};
`;
const PostContents = styled.p`
  font-size: ${theme.textSize.postContents};
  height: auto;
  //overflow: auto;

  ${(props) =>
    props.notFullSize
      ? ` //////////////////////ellipsis 처리 위한 코드부분
    text-overflow: ellipsis; // 글자 자르고 생략 표시
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    `
      : `
    line-height: 27px;
    `}
`;

const StyledLine = styled.hr`
  width: 25%;
  height: 5px;
  background-color: ${theme.colors.peacock};
  margin-top: 10px;
  border: 0;
`;

const PadDiv = styled.div`
  margin-bottom: ${(props) => props.marginBottom};
`;
const Div = styled.div`
  flex: 1;
  width: 100%;
`;

const Circle = styled.div`
  width: 34px;
  height: 34px;
  background-color: white;
  opacity: 0.8;
  box-shadow: ${theme.size.smallThingShadow};
  border-radius: 50%;
  position: absolute;
  top: 2%;
  right: 14.5%;
`;

export default RowDirecImages;
