import React, { useState } from "react";
import styled from "styled-components";
import theme from "Styles/theme";
import ModalFrame from "./ModalFrame";
import Blank from "Components/etc/Blank";

import NoteIcon from "@material-ui/icons/TextsmsOutlined";
import VisibilityOff from "@material-ui/icons/VisibilityOffOutlined";
//TODO: 비공개인 것만 서클 보이게끔 처리해야함

const RowDirecImages = (props) => {
  const [modalState, setModalState] = useState(false); //모달
  const isViewPost = props.isViewPost;

  /////////////////////////////////모달용 함수들
  const openModal = (props) => {
    //e.preventDefault();
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };
  /////////////////////////////////모달용 함수들 닫음

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
                  <NoteIcon
                    style={{
                      color: `${theme.colors.peacock}`,
                      marginRight: "5px",
                    }}
                  />
                  <PostContents>{props.nickname}</PostContents>
                </Div>
              </PadDiv>

              <PostContents>{props.contents}</PostContents>
            </ModalContents>
          </ModalFrame>
        )}
      </ContainerDiv>
    );
  } else {
    return (
      <ContainerDiv>
        <ItemCard>
          <ItemIMG src={props.thumbnail} alt={props.thumbnail} />
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
