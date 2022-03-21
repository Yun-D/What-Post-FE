import React from "react";
import styled from "styled-components";
import theme from "../../Styles/theme";

import CloseIcon from "@material-ui/icons/Close";

const Container = styled.div`
  position: fixed; //기존 부모 컴포넌트를 뚫고 전체 화면을 감싸기 위함
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 1;
  justify-content: center;
  align-items: center;
  top: 0; //이부분을 통해 전체 화면에 적용
  left: 0;
  right: 0;
  bottom: 0;
`;
const Overlay = styled.div`
  //Container를 덮는 블러
  //position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  animation: modal-bg-show 1s;
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalBlock = styled.div`
  //Contents가 담길 상자
  width: 80%;
  height: 75vh;
  position: absolute; //static이 아닌 가까운 요소의 위치 기준으로 상대적 속성주기
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${theme.colors.boxColor};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.3);
  padding: 30px;
  align-content: center;
`;

const Contents = styled.div`
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  margin-top: 5%;
  scrollbar-width: none;
  scroll-behavior: smooth;
`;

const Close = styled.div`
  position: absolute;
  right: 30px;
  top: 4%;
  color: gray;

  &:hover {
    cursor: pointer;
  }
`;

const ModalFrame = ({ state, closeModal, children }) => {
  return (
    <Container>
      <Overlay onClick={(e) => closeModal(e)} />
      <ModalBlock>
        <Close onClick={(e) => closeModal(e)}>
          <CloseIcon />
        </Close>
        <Contents>{children}</Contents>
      </ModalBlock>
    </Container>
  );
};

export default ModalFrame;
