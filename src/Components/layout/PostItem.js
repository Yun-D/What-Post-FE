import React, { useEffect, useRef, useState } from "react";

import theme from "../../Styles/theme";
import styled from "styled-components";

import ModalFrame from "../../Components/layout/ModalFrame";
import LikedSticker from "./LikedSticker";
import { TextButton } from "Components/etc/Buttons";
import Blank from "Components/etc/Blank";

import NoteIcon from "@material-ui/icons/TextsmsOutlined"; //ModeCommentOutlined

const PostItem = (data) => {
  const [modalState, setModalState] = useState(false); //모달 출력을 위한 state
  const [isShowMore, setIsShowMore] = useState(false); //ellipsis처리되어 더보기 버튼 출력해야하는지 (필요하면 true, 아니면 false)
  const [isLiked, setIsLiked] = useState(false); //좋아요 버튼이 눌렸는지 확인하는 state

  ////////////////////////////////////데이터 Ref
  const postTitleRef = useRef();
  const postContentRef = useRef();
  ////////////////////////////////////////////

  /////////////////////////////////모달용 함수들
  const showMore = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };
  ////////////////////////////////////////////

  useEffect(() => {
    const eleTitle = postTitleRef.current;
    const eleContent = postContentRef.current;

    if (
      eleContent.offsetHeight < eleContent.scrollHeight ||
      eleTitle.offsetWidth < eleTitle.scrollWidth
    ) {
      //요소 원래 높이(길이) > 화면에 보이는 높이(길이)
      setIsShowMore(true);
    }
  }, []);

  return (
    <div>
      <PostBoxArea>
        <Contents>
          <PostTitle notFullSize ref={postTitleRef}>
            {data.title}
          </PostTitle>
          <div>
            <PostContents notFullSize ref={postContentRef}>
              {data.contents}
            </PostContents>
            {isShowMore && (
              <TextButton onClick={showMore} isJustText={true}>
                더보기
              </TextButton>
            )}
          </div>

          <Blank />
          <Div className="rowDirection">
            <Blank />
            <NoteIcon
              style={{
                color: `${theme.colors.peacock}`,
                marginRight: "5px",
              }}
            />
            {data.nickname}
          </Div>
        </Contents>
      </PostBoxArea>

      {/***************** 모달&전체 데이터 출력 부분 ******************/}
      {modalState && (
        <ModalFrame state={modalState} closeModal={closeModal} widthSize="80%">
          <ModalContents>
            <PadDiv marginBottom="80px">
              <PostTitle>{data.title}</PostTitle>
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
                {data.nickname}
              </Div>
            </PadDiv>

            <PostContents>{data.contents}</PostContents>

            <LikedSticker
              isLiked={isLiked}
              setIsLiked={setIsLiked}
              isScrollable={data.contents.length > 400}
            />
          </ModalContents>
        </ModalFrame>
      )}
    </div>
  );
};

const PostBoxArea = styled.div`
  background-color: ${theme.colors.boxColor_light};
  width: 100%;
  height: 180px;
  border-radius: ${theme.size.radius};
  box-shadow: ${theme.size.boxShadow};
  margin-top: 25px;
`;
const Contents = styled.div`
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ModalContents = styled.div`
  flex: 1;
  background-color: white;
  width: 95%;
  height: auto;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 5%;

  align-items: center;
  justify-content: center;
`;

const PostTitle = styled.p`
  font-size: ${theme.textSize.postTitle};
  font-weight: 600;
  height: auto;
  word-break: break-all;

  ${(props) =>
    props.notFullSize
      ? ` //////////////////////ellipsis 처리 위한 코드부분
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 15px;
  `
      : `
    font-size: 1.6rem
  `};
`;
const PostContents = styled.div`
  font-size: ${theme.textSize.postContents};
  height: auto;

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
    margin-bottom: 30px;
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default PostItem;
