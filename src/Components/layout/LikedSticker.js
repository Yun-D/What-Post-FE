import React from "react";
import styled, { css } from "styled-components";
import theme from "Styles/theme";

import HeartIcon from "@material-ui/icons/FavoriteBorder";
import HeartIconFull from "@material-ui/icons/Favorite";

const LikedSticker = ({ isLiked, setIsLiked, isScrollable }) => {
  const clickedLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <StickyWraper isScrollable={isScrollable}>
      <StickyButton onClick={clickedLike}>
        <Div className="rowDirction">
          {isLiked ? (
            <HeartIconFull
              style={{
                color: `${theme.colors.peacock}`,
                marginRight: "5px",
              }}
            />
          ) : (
            <HeartIcon
              style={{
                color: `${theme.colors.peacock}`,
                marginRight: "5px",
              }}
            />
          )}
          좋아요 ({"갯수"})
        </Div>
      </StickyButton>
    </StickyWraper>
  );
};

const StickyWraper = styled.div`
  height: 50px;
  width: 150px;

  position: absolute;
  bottom: 8vh;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 999;

  display: flex;

  ${({ isScrollable }) =>
    isScrollable &&
    css`
      position: -webkit-sticky;
      position: sticky; /* 스크롤이 생기면 sticky로 변경됩니다. */
      bottom: 2vh;
    `}
`;
const StickyButton = styled.button`
  background-color: #ddeeee;
  border-radius: 25%;
  box-shadow: ${theme.size.boxShadow};
  color: ${theme.colors.textColor};
  font-weight: 400;
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default LikedSticker;
