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
  position: absolute;
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
  position: relative;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.2);
  overflow: auto;
  padding: 30px;
  align-content: center;
`;
const Contents = styled.div`
  flex-direction: column;
  align-items: center;
`;

const Close = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
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
