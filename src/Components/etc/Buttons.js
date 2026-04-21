import styled, { css } from "styled-components";
import theme from "Styles/theme";

//글로벌 스타일 button 확장
export const LongBtn = styled.button`
  width: 70%;
`;

export const FullSizeBtn = styled.button`
  width: 100%;
  margin-bottom: 6px;
`;

export const SmallBtn = styled.button`
  width: 20%;
  margin: 10px;
`;

export const TextButton = styled.button`
  width: auto;
  font-size: ${theme.textSize.postContents};
  font-weight: 700;
  padding: 5px 15px;
  margin: 0 0 0 8px;
  background-color: ${theme.colors.boxColor_light};
  cursor: pointer;
  color: ${theme.colors.peacockGray};

  ${(
    { isJustText } //뒷배경 없이 오직 텍스트만
  ) =>
    isJustText &&
    css`
      max-height: 2rem;
      line-height: 2rem;
      background-color: unset;
      padding: 0px;
      margin: 0px;
    `}
`;
