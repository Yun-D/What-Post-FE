import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ArrowIcon from "@material-ui/icons/ArrowUpwardRounded";

const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 unmount될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    // 스크롤 위치를 확인하여 isVisible 상태 업데이트
    const scrollY = window.scrollY;
    if (scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    // 버튼을 클릭하면 페이지 맨 위로 스크롤
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ButtonArea isVisible={isVisible}>
      <FButton onClick={scrollToTop}>
        <ArrowIcon />
      </FButton>
    </ButtonArea>
  );
};

const ButtonArea = styled.div`
  position: fixed;
  bottom: 5%;
  right: 3%;
  z-index: 999;

  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0s linear 0.3s;

  ${({ isVisible }) =>
    isVisible &&
    `
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
  `}
`;

const FButton = styled.button`
  height: 56px;
  width: 56px;
  border-radius: 50px;
  background-color: #6badb6cc;
`;

export default FloatingButton;
