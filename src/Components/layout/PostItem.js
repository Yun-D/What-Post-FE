import React, { useEffect, useRef, useState } from "react";

import theme from "../../Styles/theme";
import styled from "styled-components";
import ModalFrame from "../../Components/layout/ModalFrame";

import NoteIcon from "@material-ui/icons/TextsmsOutlined"; //ModeCommentOutlined

const PostItem = (data) => {
  const [modalState, setModalState] = useState(false); //모달 출력을 위한 state
  const [isShowMore, setIsShowMore] = useState(false); //ellipsis처리되어 더보기 버튼 출력해야하는지 (필요하면 true, 아니면 false)

  ////////////////////////////////////데이터 Ref
  const postTitleRef = useRef();
  const postContentRef = useRef();
  ////////////////////////////////////////////

  /////////////////////////////////모달용 함수들
  const showMore = (e) => {
    e.preventDefault();
    setModalState(true);
  };
  const closeModal = (e) => {
    e.preventDefault();
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
            {isShowMore && <Button onClick={showMore}>더보기</Button>}
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
            <PostContents>{data.nickname}</PostContents>
          </Div>
        </Contents>
      </PostBoxArea>

      {/***************** 모달&전체 데이터 출력 부분 ******************/}
      {modalState && (
        <ModalFrame state={modalState} closeModal={closeModal}>
          <Div>
            <PostTitle>{data.title}</PostTitle>
          </Div>
          <Blank />
          <Div className="rowDirection">
            <Blank />
            <NoteIcon
              style={{
                color: `${theme.colors.peacock}`,
                marginRight: "5px",
              }}
            />
            <PostContents>{data.nickname}</PostContents>
          </Div>

          <PostContents>{data.contents}</PostContents>
        </ModalFrame>
      )}
    </div>
  );
};

const PostBoxArea = styled.div`
  background-color: ${theme.colors.boxColor_light};
  width: 100%;
  height: 165px;
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

const PostTitle = styled.h2`
  font-size: ${theme.textSize.postTitle};
  height: auto;

  ${(props) =>
    props.notFullSize &&
    ` //////////////////////ellipsis 처리 위한 코드부분
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `};
`;
const PostContents = styled.div`
  font-size: ${theme.textSize.postContents};
  height: auto;

  ${(props) =>
    props.notFullSize &&
    ` //////////////////////ellipsis 처리 위한 코드부분
    text-overflow: ellipsis; // 글자 자르고 생략 표시
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    `}
`;

const Button = styled.button`
  max-height: 2rem;
  line-height: 2rem;
  width: auto;
  font-size: ${theme.textSize.postContents};
  font-weight: 700;
  padding: 0px;
  background-color: unset;
  cursor: pointer;
  color: ${theme.colors.peacockGray};
`;

const Div = styled.div`
  flex: 1;
  width: 100%;
`;
const Blank = styled.div`
  flex: 999;
  width: 100%;
  height: 100%;
`;

export default PostItem;
